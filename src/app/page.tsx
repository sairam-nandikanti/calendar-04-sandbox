import { Calendar04 } from "@/components/calendar-04"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Calendar-04 Component Test</h1>
        <p className="mb-8 text-muted-foreground">
          This is a test of the shadcn/ui calendar-04 component with range selection.
        </p>
        
        <div className="flex justify-center">
          <Calendar04 />
        </div>
        
        <div className="mt-8 rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">Component Details</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Mode: Range selection</li>
            <li>• Default range: June 9, 2025 to June 26, 2025</li>
            <li>• Styled with Tailwind CSS</li>
            <li>• Built with react-day-picker</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
