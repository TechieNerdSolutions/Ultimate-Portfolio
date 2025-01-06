export default function OfflinePage() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">You're Offline</h1>
        <p className="mt-4 text-muted-foreground">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-md bg-primary px-6 py-3 text-white"
        >
          Retry
        </button>
      </div>
    )
  }
