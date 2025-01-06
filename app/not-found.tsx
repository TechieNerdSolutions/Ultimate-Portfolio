import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-xl text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
      >
        Return Home
      </Link>
    </div>
  )
}
