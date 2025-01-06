import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UrlShortener } from "./url-shortener"
import { QrGenerator } from "./qr-generator"
import { FileSharing } from "./file-sharing"
import { ColorPicker } from "./color-picker"
import { JsonFormatter } from "./json-formatter"
import { Base64Converter } from "./base64-converter"
import { PasswordGenerator } from "./password-generator"
import { ImageConverter } from "./image-converter"
import { MarkdownPreview } from "./markdown-preview"
import { UnitConverter } from "./unit-converter"
import { CodeBeautifier } from "./code-beautifier"
import { DownloadButton } from "./download-button"

export default function UtilitiesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Free Utilities</h1>
        <DownloadButton />
      </div>
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-11">
          <TabsTrigger value="url">URL Shortener</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="files">File Sharing</TabsTrigger>
          <TabsTrigger value="color">Color Picker</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="url">
          <UrlShortener />
        </TabsContent>
        <TabsContent value="qr">
          <QrGenerator />
        </TabsContent>
        <TabsContent value="files">
          <FileSharing />
        </TabsContent>
        <TabsContent value="color">
          <ColorPicker />
        </TabsContent>
        <TabsContent value="json">
          <JsonFormatter />
        </TabsContent>
        <TabsContent value="base64">
          <Base64Converter />
        </TabsContent>
        <TabsContent value="password">
          <PasswordGenerator />
        </TabsContent>
        <TabsContent value="image">
          <ImageConverter />
        </TabsContent>
        <TabsContent value="markdown">
          <MarkdownPreview />
        </TabsContent>
        <TabsContent value="units">
          <UnitConverter />
        </TabsContent>
        <TabsContent value="code">
          <CodeBeautifier />
        </TabsContent>
      </Tabs>
    </div>
  )
}

