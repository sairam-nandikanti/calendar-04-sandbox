import { Calendar04 } from "@/components/calendar-04"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-16">
      <div className="mx-auto max-w-4xl">
        {/* Header matching Figma design */}
        <div className="bg-gradient-to-br from-[#3455DF] to-[#4DA8FC] text-white p-10 mb-16 rounded-t-lg">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-[100.8px] h-[18px] bg-white rounded"></div>
          </div>
          <h1 className="text-5xl font-light leading-tight">Calendar</h1>
        </div>
        
        {/* Color test section */}
        <div className="mb-8 p-4 border border-border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">Color Test (Figma Design System)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#3455DF] rounded mb-2"></div>
              <span className="text-xs">Primary #3455DF</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#4DA8FC] rounded mb-2"></div>
              <span className="text-xs">Secondary #4DA8FC</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#F8F8F9] border border-border rounded mb-2"></div>
              <span className="text-xs">Background #F8F8F9</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#001141] rounded mb-2"></div>
              <span className="text-xs text-white">Foreground #001141</span>
            </div>
          </div>
        </div>
        
        {/* Calendar component */}
        <div className="flex justify-center">
          <Calendar04 />
        </div>
        
        {/* Component details */}
        <div className="mt-16 p-4 border border-border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Component Details</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Mode: Range selection</li>
            <li>• Default range: May 11, 2025 to May 14, 2025</li>
            <li>• Styled with Figma Design System colors</li>
            <li>• Built with react-day-picker</li>
            <li>• Matches Figma design specifications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
