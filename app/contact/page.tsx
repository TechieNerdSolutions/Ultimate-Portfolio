import { Metadata } from "next"
import { Mail, MapPin, Phone } from 'lucide-react'

import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me",
}

export default function ContactPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Contact</h1>
        <p className="text-lg text-muted-foreground">
          Have a project in mind? Let's talk about it.
        </p>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:hello@example.com"
                className="text-muted-foreground hover:text-primary"
              >
                hello@example.com
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="tel:+1234567890"
                className="text-muted-foreground hover:text-primary"
              >
                +1 (234) 567-890
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">San Francisco, CA</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

