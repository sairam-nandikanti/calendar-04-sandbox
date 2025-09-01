"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MonthYearSelectorProps {
  currentMonth: Date
  onSelect: (month: number, year: number) => void
  onClose: () => void
  className?: string
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const MonthYearSelector = React.forwardRef<HTMLDivElement, MonthYearSelectorProps>(
  ({ currentMonth, onSelect, onClose, className }, ref) => {
    const currentYear = currentMonth.getFullYear()
    const currentMonthIndex = currentMonth.getMonth()
    const monthsColumnRef = React.useRef<HTMLDivElement>(null)
    const yearsColumnRef = React.useRef<HTMLDivElement>(null)
    
    // Generate years (current year ± 5 years for a reasonable range)
    const years = React.useMemo(() => {
      return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)
    }, [currentYear])

    const handleMonthSelect = (monthIndex: number) => {
      onSelect(monthIndex, currentYear)
      onClose()
    }

    const handleYearSelect = (year: number) => {
      onSelect(currentMonthIndex, year)
      onClose()
    }

    // Auto-scroll to selected month/year
    const scrollToSelected = React.useCallback(() => {
      if (monthsColumnRef.current && yearsColumnRef.current) {
        const monthIndex = currentMonthIndex
        const yearIndex = years.findIndex(y => y === currentYear)
        
        if (monthIndex >= 0) {
          const cellHeight = 46 // 45px height + 1px gap
          const scrollTop = monthIndex * cellHeight - (280 / 2) + (cellHeight / 2)
          monthsColumnRef.current.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
        
        if (yearIndex >= 0) {
          const cellHeight = 46 // 45px height + 1px gap
          const scrollTop = yearIndex * cellHeight - (280 / 2) + (cellHeight / 2)
          yearsColumnRef.current.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      }
    }, [currentMonthIndex, currentYear, years])

    // Auto-scroll when component mounts
    React.useEffect(() => {
      const timer = setTimeout(() => {
        scrollToSelected()
      }, 100) // Small delay to ensure elements are rendered
      
      return () => clearTimeout(timer)
    }, [scrollToSelected])

    return (
      <div
        ref={ref}
        className={cn(
          "time-selector bg-white border border-[#E5E7F2] rounded-[6px] px-4 pt-[2px] pb-4",
          className
        )}
      >
        {/* Header */}
        <div className="time-selector-header flex justify-center mb-2 mt-2">
          <div className="text-sm font-bold text-[#001141] text-center w-[45px]">MM</div>
          <div className="text-sm font-bold text-[#001141] text-center w-[45px]">YY</div>
        </div>

        {/* Scrollable Grid */}
        <div className="time-selector-grid flex gap-[1px] h-[280px]">
          {/* Months Column */}
          <div 
            ref={monthsColumnRef} 
            className="time-column w-[45px] overflow-y-auto scrollbar-hide scroll-smooth snap-y snap-mandatory"
          >
            <div className="space-y-[1px]">
              {MONTHS.map((month, index) => (
                <div
                  key={month}
                  className={cn(
                    "time-cell w-[45px] h-[45px] flex items-center justify-center text-xs font-medium rounded-[6px] cursor-pointer transition-all duration-200 snap-start",
                    currentMonthIndex === index
                      ? "time-cell-selected"
                      : "time-cell-default"
                  )}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>

          {/* Years Column */}
          <div 
            ref={yearsColumnRef} 
            className="time-column w-[45px] overflow-y-auto scrollbar-hide scroll-smooth snap-y snap-mandatory"
          >
            <div className="space-y-[1px]">
              {years.map((year) => (
                <div
                  key={year}
                  className={cn(
                    "time-cell w-[45px] h-[45px] flex items-center justify-center text-xs font-medium rounded-[6px] cursor-pointer transition-all duration-200 snap-start",
                    currentYear === year
                      ? "time-cell-selected"
                      : "time-cell-default"
                  )}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

MonthYearSelector.displayName = "MonthYearSelector"

export { MonthYearSelector }
