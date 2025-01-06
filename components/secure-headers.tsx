import { headers } from 'next/headers'

export function SecureHeaders() {
  const nonce = headers().get('x-nonce')

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `
          window.__webpack_nonce__ = '${nonce}';
          window.__NEXT_DATA__.nonce = '${nonce}';
        `,
      }}
    />
  )
}
