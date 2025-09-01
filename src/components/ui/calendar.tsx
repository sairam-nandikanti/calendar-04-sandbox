"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { TimeSelector, type TimeValue, type TimeSelectorProps } from "./time-selector"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  showTimeSelector?: boolean
  timeValue?: TimeValue
  onTimeChange?: (time: TimeValue) => void
  timeSelectorProps?: Omit<TimeSelectorProps, 'value' | 'onChange'>
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showTimeSelector = false,
  timeValue,
  onTimeChange,
  timeSelectorProps,
  ...props
}: CalendarProps) {
  // Validate that time selector is only used with single mode
  const isRangeMode = props.mode === "range"
  const shouldShowTimeSelector = showTimeSelector && !isRangeMode

  // Show warning in development if time selector is used with range mode
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && showTimeSelector && isRangeMode) {
      console.warn('TimeSelector can only be used with single date selection mode. Set mode="single" or remove mode prop to use time selector.')
    }
  }, [showTimeSelector, isRangeMode])

  return (
    <div className={cn("calendar-with-time", shouldShowTimeSelector && "flex gap-4 items-start")}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={className}
        classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-bold text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "calendar-nav-button",
          "opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex ",
        head_cell: "calendar-weekday w-[45px] h-[45px] flex items-center justify-center",
        row: "flex w-full ",
        cell: cn(
          "calendar-cell relative",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "calendar-cell calendar-cell-default",
          "aria-selected:opacity-100"
        ),
        day_range_start: "calendar-cell-range-start",
        day_range_end: "calendar-cell-range-end",
        day_selected: "calendar-cell-selected",
        day_today: "calendar-cell-current",
        day_outside: "calendar-cell-inactive",
        day_disabled: "calendar-cell-inactive",
        day_range_middle: "calendar-cell-range-middle", // New class for range middle dates
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
    {shouldShowTimeSelector && (
      <TimeSelector
        value={timeValue}
        onChange={onTimeChange}
        {...timeSelectorProps}
      />
    )}
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
