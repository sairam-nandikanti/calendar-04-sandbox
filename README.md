# Calendar-04 Sandbox

A Next.js sandbox environment to test the shadcn/ui calendar-04 component with range selection functionality.

## Features

- **Range Selection**: Select a date range by clicking start and end dates
- **Default Range**: Pre-selected range from June 9, 2025 to June 26, 2025
- **Modern UI**: Clean, accessible design with Tailwind CSS
- **Responsive**: Works on desktop and mobile devices
- **TypeScript**: Fully typed with TypeScript

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Component Details

The calendar-04 component is based on the [shadcn/ui calendar blocks](https://ui.shadcn.com/blocks/calendar#calendar-04) and includes:

- Single month view with range selection
- Pre-selected date range
- Rounded borders and shadow styling
- Built with react-day-picker

## Dependencies

- Next.js 14
- React 18
- Tailwind CSS
- react-day-picker
- lucide-react (for icons)
- Radix UI components

## Usage

```tsx
import { Calendar04 } from "@/components/calendar-04"

export default function MyPage() {
  return <Calendar04 />
}
```

## Customization

You can customize the calendar by modifying the props in `src/components/calendar-04.tsx`:

- Change the default date range
- Modify styling classes
- Add additional functionality like disabled dates
- Customize the number of months displayed

## Project Structure

```
calendar-04-sandbox/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   └── calendar.tsx
│   │   └── calendar-04.tsx
│   └── lib/
│       └── utils.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Deployment

This project can be easily deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## License

MIT
