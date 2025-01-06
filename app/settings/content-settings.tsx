'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomSection } from "@/types/settings"
import { Plus, Trash2 } from 'lucide-react'
import { DragHandleDots2Icon } from "@radix-ui/react-icons"

const customSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  enabled: z.boolean(),
  order: z.number(),
  content: z.string().optional(),
})

const formSchema = z.object({
  customSections: z.array(customSectionSchema),
})

export function ContentSettings() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customSections: [],
    },
  })

  const { fields, append, remove } = form.useFieldArray({
    name: "customSections",
  })

  const addSection = () => {
    append({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      enabled: true,
      order: fields.length,
      content: "",
    })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Save content settings
      toast({
        title: "Settings updated",
        description: "Your content settings have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Settings</CardTitle>
        <CardDescription>
          Manage your portfolio content and custom sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Custom Sections</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSection}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border p-4 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 space-y-4">
                      <FormField
                        control={form.control}
                        name={`customSections.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`customSections.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`customSections.${index}.content`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="min-h-[200px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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

