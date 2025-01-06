import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GeneralSettings } from "./general-settings"
import { PagesSettings } from "./pages-settings"
import { ThemeSettings } from "./theme-settings"
import { IntegrationSettings } from "./integration-settings"
import { BackupSettings } from "./backup-settings"
import { SettingsHistory } from "./history"
import { ResetSettings } from "./reset"
import { ContentSettings } from "./content-settings"
import { LayoutSettings } from "./layout-settings"
import { getSettings } from "@/lib/settings"
import { SettingsPreview } from "@/components/settings-preview"

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your portfolio settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="layout">
            <LayoutSettings />
          </TabsContent>
          <TabsContent value="content">
            <ContentSettings />
          </TabsContent>
          <TabsContent value="pages">
            <PagesSettings />
          </TabsContent>
          <TabsContent value="theme">
            <ThemeSettings />
          </TabsContent>
          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
          <TabsContent value="backup">
            <div className="grid gap-6">
              <BackupSettings />
              <SettingsHistory />
              <ResetSettings />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SettingsPreview 
        settings={settings} 
        defaultSettings={settings} 
      />
    </div>
  )
}

