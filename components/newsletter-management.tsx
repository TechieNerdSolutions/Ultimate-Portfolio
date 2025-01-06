"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle2, Loader2, Mail, Send, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

type Subscriber = {
  id: string
  email: string
  status: "active" | "pending" | "unsubscribed"
  joinedAt: string
}

type Campaign = {
  id: string
  subject: string
  content: string
  sentAt: string
  status: "draft" | "sent"
  opens: number
  clicks: number
}

export function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: "1",
      email: "john@example.com",
      status: "active",
      joinedAt: "2024-01-01",
    },
    {
      id: "2",
      email: "jane@example.com",
      status: "pending",
      joinedAt: "2024-01-02",
    },
  ])

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      subject: "Welcome to our Newsletter",
      content: "Thank you for subscribing!",
      sentAt: "2024-01-01",
      status: "sent",
      opens: 150,
      clicks: 75,
    },
  ])

  const [newCampaign, setNewCampaign] = useState({
    subject: "",
    content: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubscriberStatusChange = async (id: string, status: string) => {
    setSubscribers((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, status: status as "active" | "pending" | "unsubscribed" }
          : sub
      )
    )

    toast({
      title: "Status updated",
      description: "Subscriber status has been updated successfully.",
    })
  }

  const handleSendCampaign = async () => {
    if (!newCampaign.subject || !newCampaign.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const campaign: Campaign = {
        id: Date.now().toString(),
        ...newCampaign,
        sentAt: new Date().toISOString(),
        status: "sent",
        opens: 0,
        clicks: 0,
      }

      setCampaigns((prev) => [...prev, campaign])
      setNewCampaign({ subject: "", content: "" })

      toast({
        title: "Campaign sent!",
        description: "Your newsletter campaign has been sent successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send campaign. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">
              {subscribers.filter((s) => s.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Campaigns Sent
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              Last sent{" "}
              {new Date(
                campaigns[campaigns.length - 1]?.sentAt || Date.now()
              ).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Open Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (campaigns.reduce((acc, camp) => acc + camp.opens, 0) /
                  (campaigns.length * subscribers.length)) *
                  100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {campaigns.reduce((acc, camp) => acc + camp.opens, 0)} total opens
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
            <CardDescription>Manage your newsletter subscribers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="flex items-center justify-between space-x-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{subscriber.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Joined {new Date(subscriber.joinedAt).toLocaleDateString()}
                  </p>
                </div>
                <Select
                  value={subscriber.status}
                  onValueChange={(value) =>
                    handleSubscriberStatusChange(subscriber.id, value)
                  }
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Campaign</CardTitle>
            <CardDescription>Create and send a new newsletter campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newCampaign.subject}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                placeholder="Enter campaign subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newCampaign.content}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="Enter campaign content"
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSendCampaign}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Campaign
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign History</CardTitle>
          <CardDescription>View past newsletter campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="space-y-2 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{campaign.subject}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(campaign.sentAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {campaign.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{campaign.opens} opens</span>
                  <span>•</span>
                  <span>{campaign.clicks} clicks</span>
                  <span>•</span>
                  <span>
                    {Math.round((campaign.opens / subscribers.length) * 100)}% open
                    rate
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

