"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock, Loader2 } from 'lucide-react'
import { addDays, format, parse, setHours, setMinutes } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
]

export function MeetingScheduler() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!date || !time) {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const [hours, minutes] = time.split(":").map(Number)
      const datetime = setMinutes(setHours(date, hours), minutes)

      toast({
        title: "Meeting scheduled!",
        description: `Your meeting is scheduled for ${format(
          datetime,
          "MMMM d, yyyy 'at' h:mm a"
        )}`,
      })

      setDate(undefined)
      setTime(undefined)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Schedule a Meeting
        </CardTitle>
        <CardDescription>
          Book a time slot for a video call or consultation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              date < new Date() || date > addDays(new Date(), 30)
            }
            className="rounded-md border"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Select Time</h3>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot">
                {time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {format(parse(time, "HH:mm", new Date()), "h:mm a")}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {format(parse(slot, "HH:mm", new Date()), "h:mm a")}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!date || !time || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            "Schedule Meeting"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

