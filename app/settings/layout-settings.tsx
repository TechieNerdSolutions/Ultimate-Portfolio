'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { updateLayoutSettings } from "./actions"
import { useToast } from "@/components/ui/use-toast"
import { LayoutPreview } from "./layout-preview"
import { LayoutSettings as LayoutSettingsType } from "@/types/settings"

const formSchema = z.object({
  type: z.enum(["default", "minimal", "custom"]),
  header: z.object({
    sticky: z.boolean(),
    transparent: z.boolean(),
    height: z.number().min(50).max(200),
  }),
  footer: z.object({
    enabled: z.boolean(),
    showSocialLinks: z.boolean(),
    showNavigation: z.boolean(),
    copyright: z.string().optional(),
  }),
  sidebar: z.object({
    enabled: z.boolean(),
    position: z.enum(["left", "right"]),
    width: z.number().min(200).max(400),
  }).optional(),
})

export function LayoutSettings() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "default",
      header: {
        sticky: true,
        transparent: false,
        height: 64,
      },
      footer: {
        enabled: true,
        showSocialLinks: true,
        showNavigation: true,
        copyright: "© 2024 Your Name. All rights reserved.",
      },
      sidebar: {
        enabled: false,
        position: "left",
        width: 280,
      },
    },
  })

  const layoutType = form.watch("type")
  const currentValues = form.watch()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateLayoutSettings(values as LayoutSettingsType)
      toast({
        title: "Settings updated",
        description: "Your layout settings have been saved successfully.",
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
    <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
      <Card>
        <CardHeader>
          <CardTitle>Layout Settings</CardTitle>
          <CardDescription>
            Customize your portfolio layout and structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layout Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the base layout for your portfolio
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Header</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="header.sticky"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Sticky Header</FormLabel>
                          <FormDescription>
                            Keep the header fixed at the top
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="header.transparent"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Transparent Header</FormLabel>
                          <FormDescription>
                            Make header background transparent
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="header.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Header Height: {field.value}px</FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          min={50}
                          max={200}
                          step={2}
                        />
                      </FormControl>
                      <FormDescription>
                        Adjust the header height in pixels
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Footer</h3>
                <FormField
                  control={form.control}
                  name="footer.enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Footer</FormLabel>
                        <FormDescription>
                          Show footer section on all pages
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("footer.enabled") && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="footer.showSocialLinks"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Social Links</FormLabel>
                            <FormDescription>
                              Show social media links
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="footer.showNavigation"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Navigation</FormLabel>
                            <FormDescription>
                              Show navigation links
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="footer.copyright"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copyright Text</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Add your copyright notice
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {layoutType === "custom" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sidebar</h3>
                  <FormField
                    control={form.control}
                    name="sidebar.enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Sidebar</FormLabel>
                          <FormDescription>
                            Add a sidebar to your layout
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("sidebar.enabled") && (
                    <>
                      <FormField
                        control={form.control}
                        name="sidebar.position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sidebar Position</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the sidebar position
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sidebar.width"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sidebar Width: {field.value}px</FormLabel>
                            <FormControl>
                              <Slider
                                value={[field.value]}
                                onValueChange={([value]) => field.onChange(value)}
                                min={200}
                                max={400}
                                step={10}
                              />
                            </FormControl>
                            <FormDescription>
                              Adjust the sidebar width in pixels
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              )}

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:sticky lg:top-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Layout Preview</CardTitle>
            <CardDescription>
              Preview your layout changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LayoutPreview settings={currentValues} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

