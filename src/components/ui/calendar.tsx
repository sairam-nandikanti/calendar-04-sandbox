"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
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
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "calendar-weekday w-[45px] h-[45px] flex items-center justify-center",
        row: "flex w-full mt-2",
        cell: cn(
          "calendar-cell relative",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "calendar-cell calendar-cell-default",
          "aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "calendar-cell-selected",
        day_today: "calendar-cell-current",
        day_outside: "calendar-cell-inactive",
        day_disabled: "calendar-cell-inactive",
        day_range_middle: "calendar-cell-selected", // Changed: all range dates use same styling
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
