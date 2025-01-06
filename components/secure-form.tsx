'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { sanitizeHtml } from '@/lib/sanitize'

const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

type FormData = z.infer<typeof formSchema>

export function SecureForm() {
  const [csrfToken, setCsrfToken] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          name: sanitizeHtml(data.name),
          email: data.email,
          message: sanitizeHtml(data.message),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" name="csrf" value={csrfToken} />
      
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  )
}
