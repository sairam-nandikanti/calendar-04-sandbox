"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { type TimeValue } from "@/components/ui/time-selector"

export function Calendar04() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 4, 11), // May 11, 2025
    to: new Date(2025, 4, 14),   // May 14, 2025
  })
  
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(
    new Date(2025, 4, 15) // May 15, 2025
  )
  
  const [timeValue, setTimeValue] = React.useState<TimeValue>({
    hour: 10,
    minute: 15
  })

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Calendar with range selection only */}
      <div className="w-[349px] bg-card border border-border rounded-[6px] p-4">
        <h3 className="mb-4 text-sm font-semibold">Range Selection</h3>
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          className="w-full"
          showOutsideDays={true}
        />
      </div>

      {/* Calendar with single date selection and time selector */}
      <div className="bg-card border border-border rounded-[6px] p-4">
        <h3 className="mb-4 text-sm font-semibold">Single Date + Time</h3>
        <Calendar
          mode="single"
          defaultMonth={singleDate}
          selected={singleDate}
          onSelect={setSingleDate}
          className="w-full"
          showOutsideDays={true}
          showTimeSelector={true}
          timeValue={timeValue}
          onTimeChange={setTimeValue}
          timeSelectorProps={{
            format: '24',
            minuteStep: 1,
            disabledBefore: { hour: 9, minute: 45 },
            disabledAfter: { hour: 18, minute: 45 }
          }}
        />
      </div>

      {/* Calendar with 12-hour format time selector */}
      <div className="bg-card border border-border rounded-[6px] p-4">
        <h3 className="mb-4 text-sm font-semibold">12-Hour Format</h3>
        <Calendar
          mode="single"
          defaultMonth={singleDate}
          selected={singleDate}
          onSelect={setSingleDate}
          className="w-full"
          showOutsideDays={true}
          showTimeSelector={true}
          timeValue={timeValue}
          onTimeChange={setTimeValue}
          timeSelectorProps={{
            format: '12',
            minuteStep: 30,
            disabledBefore: { hour: 8, minute: 0 },
            disabledAfter: { hour: 12, minute: 0 }
          }}
        />
      </div>
    </div>
  )
}
