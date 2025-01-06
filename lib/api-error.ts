export class APIError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return {
      error: error.message,
      status: error.status,
      code: error.code,
    }
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      status: 500,
    }
  }

  return {
    error: 'An unexpected error occurred',
    status: 500,
  }
}
