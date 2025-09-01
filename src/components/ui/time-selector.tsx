"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimeValue {
  hour: number
  minute: number
}

export interface TimeSelectorProps {
  value?: TimeValue
  onChange?: (time: TimeValue) => void
  className?: string
  format?: '12' | '24'
  minuteStep?: number
  disabledBefore?: TimeValue
  disabledAfter?: TimeValue
}

const TimeSelector = React.forwardRef<HTMLDivElement, TimeSelectorProps>(
  (
    {
      value = { hour: 10, minute: 15 },
      onChange,
      className,
      format = '24',
      minuteStep = 15,
      disabledBefore,
      disabledAfter,
      ...props
    },
    ref
  ) => {
    const [selectedTime, setSelectedTime] = React.useState<TimeValue>(value)
    const hoursColumnRef = React.useRef<HTMLDivElement>(null)
    const minutesColumnRef = React.useRef<HTMLDivElement>(null)

    // Generate hour options based on format
    const hours = React.useMemo(() => {
      const hourList = []
      const maxHour = format === '12' ? 12 : 23
      const startHour = format === '12' ? 1 : 0
      
      for (let i = startHour; i <= maxHour; i++) {
        hourList.push(i)
      }
      return hourList
    }, [format])

    // Generate minute options based on step
    const minutes = React.useMemo(() => {
      const minuteList = []
      for (let i = 0; i < 60; i += minuteStep) {
        minuteList.push(i)
      }
      return minuteList
    }, [minuteStep])

    // Check if a time is disabled
    const isTimeDisabled = (hour: number, minute: number) => {
      if (disabledBefore) {
        if (hour < disabledBefore.hour || 
            (hour === disabledBefore.hour && minute < disabledBefore.minute)) {
          return true
        }
      }
      
      if (disabledAfter) {
        if (hour > disabledAfter.hour || 
            (hour === disabledAfter.hour && minute > disabledAfter.minute)) {
          return true
        }
      }
      
      return false
    }

    const handleTimeSelect = (type: 'hour' | 'minute', value: number) => {
      const newTime = {
        ...selectedTime,
        [type]: value,
      }
      
      // Don't update if the new time would be disabled
      if (!isTimeDisabled(newTime.hour, newTime.minute)) {
        setSelectedTime(newTime)
        onChange?.(newTime)
      }
    }

    const formatTime = (value: number) => value.toString().padStart(2, '0')

    // Auto-scroll to selected time
    const scrollToSelectedTime = React.useCallback(() => {
      if (hoursColumnRef.current && minutesColumnRef.current) {
        const hourIndex = hours.findIndex(h => h === selectedTime.hour)
        const minuteIndex = minutes.findIndex(m => m === selectedTime.minute)
        
        if (hourIndex >= 0) {
          const cellHeight = 46 // 45px height + 1px gap
          const scrollTop = hourIndex * cellHeight - (280 / 2) + (cellHeight / 2) // Center in 280px container
          hoursColumnRef.current.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
        
        if (minuteIndex >= 0) {
          const cellHeight = 46 // 45px height + 1px gap
          const scrollTop = minuteIndex * cellHeight - (280 / 2) + (cellHeight / 2) // Center in 280px container
          minutesColumnRef.current.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      }
    }, [selectedTime, hours, minutes])

    // Auto-scroll when component mounts or selected time changes
    React.useEffect(() => {
      const timer = setTimeout(() => {
        scrollToSelectedTime()
      }, 100) // Small delay to ensure elements are rendered
      
      return () => clearTimeout(timer)
    }, [scrollToSelectedTime])

    return (
      <div
        ref={ref}
        className={cn(
          "time-selector bg-white border border-[#E5E7F2] rounded-[6px] px-4 pt-[2px] pb-4",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="time-selector-header flex justify-center mb-2 mt-2">
          <div className="text-sm font-bold text-[#001141] text-center w-[45px]">
            {format === '12' ? 'H' : 'HH'}
          </div>
          <div className="text-sm font-bold text-[#001141] text-center w-[45px]">
            MM
          </div>
        </div>

        {/* Scrollable Time Grid */}
        <div className="time-selector-grid flex gap-[1px] h-[280px]">
          {/* Hours Column */}
          <div ref={hoursColumnRef} className="time-column w-[45px] overflow-y-auto scrollbar-hide scroll-smooth snap-y snap-mandatory">
            <div className="space-y-[1px]">
              {hours.map((hour) => {
                const isSelected = selectedTime.hour === hour
                const isDisabled = isTimeDisabled(hour, selectedTime.minute)
                
                return (
                  <div
                    key={hour}
                    className={cn(
                      "time-cell w-[45px] h-[45px] flex items-center justify-center text-xs font-medium rounded-[6px] cursor-pointer transition-all duration-200 snap-start",
                      isSelected && !isDisabled
                        ? "time-cell-selected"
                        : isDisabled
                        ? "time-cell-disabled"
                        : "time-cell-default"
                    )}
                    onClick={() => {
                      if (!isDisabled) {
                        handleTimeSelect('hour', hour)
                      }
                    }}
                  >
                    {formatTime(hour)}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Minutes Column */}
          <div ref={minutesColumnRef} className="time-column w-[45px] overflow-y-auto scrollbar-hide scroll-smooth snap-y snap-mandatory">
            <div className="space-y-[1px]">
              {minutes.map((minute) => {
                const isSelected = selectedTime.minute === minute
                const isDisabled = isTimeDisabled(selectedTime.hour, minute)
                
                return (
                  <div
                    key={minute}
                    className={cn(
                      "time-cell w-[45px] h-[45px] flex items-center justify-center text-xs font-medium rounded-[6px] cursor-pointer transition-all duration-200 snap-start",
                      isSelected && !isDisabled
                        ? "time-cell-selected"
                        : isDisabled
                        ? "time-cell-disabled"
                        : "time-cell-default"
                    )}
                    onClick={() => {
                      if (!isDisabled) {
                        handleTimeSelect('minute', minute)
                      }
                    }}
                  >
                    {formatTime(minute)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

TimeSelector.displayName = "TimeSelector"

export { TimeSelector }