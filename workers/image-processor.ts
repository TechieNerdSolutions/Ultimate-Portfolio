/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope

self.addEventListener('message', async (event) => {
  const { imageData, operation } = event.data

  try {
    switch (operation) {
      case 'resize': {
        const resizedData = await resizeImage(imageData)
        self.postMessage({ type: 'success', data: resizedData })
        break
      }
      case 'compress': {
        const compressedData = await compressImage(imageData)
        self.postMessage({ type: 'success', data: compressedData })
        break
      }
      default:
        throw new Error(`Unknown operation: ${operation}`)
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

async function resizeImage(imageData: ImageData): Promise<ImageData> {
  // Image resizing logic
  return imageData
}

async function compressImage(imageData: ImageData): Promise<Blob> {
  // Image compression logic
  return new Blob()
}
