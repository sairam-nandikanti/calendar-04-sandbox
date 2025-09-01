"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { TimeSelector, type TimeValue, type TimeSelectorProps } from "./time-selector"
import { MonthYearSelector } from "./month-year-selector"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  showTimeSelector?: boolean
  timeValue?: TimeValue
  onTimeChange?: (time: TimeValue) => void
  timeSelectorProps?: Omit<TimeSelectorProps, 'value' | 'onChange'>
  enableMonthYearSelection?: boolean
  onMonthYearChange?: (month: number, year: number) => void
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showTimeSelector = false,
  timeValue,
  onTimeChange,
  timeSelectorProps,
  enableMonthYearSelection = true,
  onMonthYearChange,
  ...props
}: CalendarProps) {
  // Validate that time selector is only used with single mode
  const isRangeMode = props.mode === "range"
  const shouldShowTimeSelector = showTimeSelector && !isRangeMode

  // Month/Year selection state
  const [showMonthYearSelector, setShowMonthYearSelector] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const today = new Date()
    return props.defaultMonth || today
  })

  // Handle month/year selection
  const handleMonthYearSelect = React.useCallback((month: number, year: number) => {
    const newDate = new Date(year, month, 1)
    setCurrentMonth(newDate)
    onMonthYearChange?.(month, year)
    setShowMonthYearSelector(false)
  }, [onMonthYearChange])

  // Custom caption component
  const CustomCaption = React.useCallback((props: any) => {
    const { displayMonth } = props
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    
    const month = monthNames[displayMonth.getMonth()]
    const year = displayMonth.getFullYear()

    const goToPreviousMonth = () => {
      const previousMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1)
      setCurrentMonth(previousMonth)
    }

    const goToNextMonth = () => {
      const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1)
      setCurrentMonth(nextMonth)
    }

    if (!enableMonthYearSelection) {
      return (
        <div className="flex justify-center pt-1 relative items-center">
          <button
            onClick={goToPreviousMonth}
            className={cn(
              "calendar-nav-button absolute left-1 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-bold text-foreground">
            {month} {year}
          </div>
          <button
            onClick={goToNextMonth}
            className={cn(
              "calendar-nav-button absolute right-1 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )
    }

    return (
      <div className="flex justify-center pt-1 relative items-center">
        <button
          onClick={goToPreviousMonth}
          className={cn(
            "calendar-nav-button absolute left-1 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-4">
          <button
            className="text-sm font-bold text-[#3455DF] hover:bg-[#EAEDFC] px-2 py-1 rounded-[6px] transition-colors"
            onClick={() => setShowMonthYearSelector(true)}
          >
            {month}
          </button>
          <button
            className="text-sm font-bold text-[#3455DF] hover:bg-[#EAEDFC] px-2 py-1 rounded-[6px] transition-colors"
            onClick={() => setShowMonthYearSelector(true)}
          >
            {year}
          </button>
        </div>
        <button
          onClick={goToNextMonth}
          className={cn(
            "calendar-nav-button absolute right-1 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    )
  }, [enableMonthYearSelection, setShowMonthYearSelector, setCurrentMonth])

  // Show warning in development if time selector is used with range mode
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && showTimeSelector && isRangeMode) {
      console.warn('TimeSelector can only be used with single date selection mode. Set mode="single" or remove mode prop to use time selector.')
    }
  }, [showTimeSelector, isRangeMode])

  return (
    <div className={cn("calendar-with-time", (shouldShowTimeSelector || enableMonthYearSelection) && "flex gap-4 items-start")}>
      <div className="relative">
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={className}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
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
        Caption: CustomCaption,
      }}
      {...props}
    />
      </div>
      
      {/* Show TimeSelector or MonthYearSelector but not both */}
      {shouldShowTimeSelector && !showMonthYearSelector && (
        <TimeSelector
          value={timeValue}
          onChange={onTimeChange}
          {...timeSelectorProps}
        />
      )}
      
      {showMonthYearSelector && (
        <MonthYearSelector
          currentMonth={currentMonth}
          onSelect={handleMonthYearSelect}
          onClose={() => setShowMonthYearSelector(false)}
        />
      )}
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
