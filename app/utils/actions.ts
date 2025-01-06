'use server'

import { nanoid } from 'nanoid'
import QRCode from 'qrcode'
import { put } from '@vercel/blob'
import JSZip from 'jszip'
import { join } from 'path'

// URL Shortening
export async function shortenUrl(url: string) {
  const id = nanoid(8)
  // In a real app, you would store this in a database
  // For demo purposes, we'll just return a fake shortened URL
  return `https://short.url/${id}`
}

// QR Code Generation
export async function generateQR(text: string, size: number) {
  try {
    const url = await QRCode.toDataURL(text, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
    return url
  } catch (error) {
    throw new Error('Failed to generate QR code')
  }
}

// File Upload
export async function uploadFile(formData: FormData, onProgress?: (progress: number) => void) {
  try {
    const file = formData.get('file') as File
    if (!file) throw new Error('No file provided')

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    })

    return { url: blob.url }
  } catch (error) {
    throw new Error('Failed to upload file')
  }
}

export async function downloadSourceCode() {
  const zip = new JSZip()

  // Add all utility components
  const components = {
    'url-shortener.tsx': await import('./url-shortener'),
    'qr-generator.tsx': await import('./qr-generator'),
    'file-sharing.tsx': await import('./file-sharing'),
    'color-picker.tsx': await import('./color-picker'),
    'json-formatter.tsx': await import('./json-formatter'),
    'base64-converter.tsx': await import('./base64-converter'),
    'password-generator.tsx': await import('./password-generator'),
    'image-converter.tsx': await import('./image-converter'),
    'markdown-preview.tsx': await import('./markdown-preview'),
    'unit-converter.tsx': await import('./unit-converter'),
    'code-beautifier.tsx': await import('./code-beautifier'),
    'page.tsx': await import('./page'),
    'actions.ts': await import('./actions'),
  }

  // Create utilities folder
  const utils = zip.folder('utils')
  if (!utils) throw new Error('Failed to create utils folder')

  // Add each component to the zip
  for (const [filename, component] of Object.entries(components)) {
    utils.file(filename, component.default.toString())
  }

  // Generate zip file
  const content = await zip.generateAsync({ type: 'uint8array' })
  
  // Convert to base64
  const base64 = Buffer.from(content).toString('base64')
  
  return base64
}

