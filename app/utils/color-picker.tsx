'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function ColorPicker() {
  const [color, setColor] = useState('#000000')
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Color value copied to clipboard"
    })
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgb = hexToRgb(color)
  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : ''
  const hslString = rgb ? `hsl(${rgbToHsl(rgb.r, rgb.g, rgb.b).join(', ')})` : ''

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }

      h /= 6
    }

    return [
      Math.round(h * 360),
      Math.round(s * 100) + '%',
      Math.round(l * 100) + '%'
    ]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Picker</CardTitle>
        <CardDescription>
          Pick a color and get its values in different formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-32 w-32 cursor-pointer"
            />
            <div className="flex-1 space-y-2">
              <div className="h-32 rounded-md" style={{ backgroundColor: color }} />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="font-mono">HEX: {color}</span>
              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(color)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="font-mono">RGB: {rgbString}</span>
              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(rgbString)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="font-mono">HSL: {hslString}</span>
              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(hslString)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

