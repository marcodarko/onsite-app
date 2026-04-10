# Onsite Events App

A mobile-friendly SPA for browsing events during the Scripps Research Institute onsite. Shows live session status, moderator info, and a general info page — all driven by external JSON and Markdown files.

## Features

- **Live event status** — badges update in real time: Happening Now!, X Hours Away, Tomorrow, Ended
- **Grouped schedule** — events organized by day with time and room details
- **Happening Now highlight** — active sessions get a colored border, tinted background, and an animated pulsing badge
- **Info page** — renders a Markdown file with venue details, schedule overview, and logistics
- **Theme colors** — sourced from `events.json`; swap them once and the whole UI updates
- **Async data loading** — both `events.json` and `info.md` are fetched at runtime via axios; point the URLs at any external host
- **Mobile friendly** — responsive layout across all screen sizes

## Stack

| Layer | Library |
|-------|---------|
| Framework | React 19 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Dates | moment.js |
| HTTP | axios |
| Markdown | react-markdown + remark-gfm |

## Project Structure

```
onsite-app/
├── public/
│   ├── events.json     # Schedule data + theme colors
│   ├── info.md         # Info page content (Markdown)
│   ├── logo.png        # Hero + nav logo
│   └── pattern.svg     # Decorative background (Info page)
├── src/
│   ├── components/
│   │   ├── EventCard.jsx   # Individual event card
│   │   └── NavBar.jsx      # Sticky navigation bar
│   ├── pages/
│   │   ├── EventsPage.jsx  # Schedule view (/)
│   │   └── InfoPage.jsx    # Markdown info view (/info)
│   ├── App.jsx         # Router, data fetch, theme CSS vars
│   ├── config.js       # Data source URLs
│   └── index.css       # Tailwind + animations + markdown styles
└── events.json         # Source copy (public/ is what gets served)
```

## Getting Started

Requires **Node 20+**. If using nvm:

```bash
nvm use 20
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Data Sources

Both files are fetched at runtime. URLs are configured in [`src/config.js`](src/config.js):

```js
export const EVENTS_URL = '/events.json'
export const INFO_URL   = '/info.md'
```

Replace either value with an absolute URL to load data from an external host — no other changes needed.

### events.json shape

```json
{
  "onsite": {
    "Monday": {
      "date": "YYYY-MM-DD",
      "events": [
        {
          "title": "Session Title",
          "description": "...",
          "moderators": [{ "name": "...", "image": "url" }],
          "start_time": "9:00AM",
          "end_time": "10:00AM",
          "room": "SR-403",
          "difficulty": "beginner | intermediate | advanced",
          "tags": ["tag1", "tag2"],
          "tools-needed": ["laptop"],
          "zoom-link": "https://..."
        }
      ]
    }
  },
  "colors": {
    "main": "#E34894",
    "secondary": "#4FCE8E",
    "accent": "#FEEFF1"
  }
}
```

## Build

```bash
npm run build
```

Output is written to `dist/`.
