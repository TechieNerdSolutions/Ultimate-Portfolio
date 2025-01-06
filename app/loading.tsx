import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="container flex min-h-[400px] items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}

