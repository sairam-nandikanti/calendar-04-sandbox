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
