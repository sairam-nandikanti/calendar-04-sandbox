"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

export function Calendar04() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 4, 11), // May 11, 2025
    to: new Date(2025, 4, 14),   // May 14, 2025
  })

  return (
    <div className="w-[349px] bg-card border border-border rounded-[6px] p-4">
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        className="w-full"
        showOutsideDays={true}
      />
    </div>
  )
}
