'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { updatePagesSettings } from "./actions"
import { useToast } from "@/components/ui/use-toast"
import { DragHandleDots2Icon } from "@radix-ui/react-icons"

const formSchema = z.object({
  pages: z.object({
    home: z.boolean(),
    about: z.boolean(),
    projects: z.boolean(),
    blog: z.boolean(),
    contact: z.boolean(),
    resume: z.boolean(),
    utilities: z.boolean(),
    guestbook: z.boolean(),
    dashboard: z.boolean(),
  }),
})

export function PagesSettings() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pages: {
        home: true,
        about: true,
        projects: true,
        blog: false,
        contact: true,
        resume: false,
        utilities: false,
        guestbook: false,
        dashboard: false,
      },
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updatePagesSettings(values)
      toast({
        title: "Settings updated",
        description: "Your page settings have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  const pages = [
    {
      id: "home",
      title: "Home",
      description: "Landing page with hero section and featured content",
    },
    {
      id: "about",
      title: "About",
      description: "Personal information and background",
    },
    {
      id: "projects",
      title: "Projects",
      description: "Showcase of your work and projects",
    },
    {
      id: "blog",
      title: "Blog",
      description: "Articles and technical writing",
    },
    {
      id: "contact",
      title: "Contact",
      description: "Contact form and social links",
    },
    {
      id: "resume",
      title: "Resume",
      description: "Professional experience and skills",
    },
    {
      id: "utilities",
      title: "Utilities",
      description: "Collection of useful tools and utilities",
    },
    {
      id: "guestbook",
      title: "Guestbook",
      description: "Allow visitors to leave messages",
    },
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Analytics and statistics dashboard",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pages Settings</CardTitle>
        <CardDescription>
          Choose which pages to include in your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {page.description}
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name={`pages.${page.id}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

