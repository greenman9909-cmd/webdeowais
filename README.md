# SteamPulse — Live Steam Deals Dashboard

A neon-glassmorphism dashboard for tracking Steam specials in real time. Built with Next.js App Router, Tailwind CSS, Framer Motion, and Recharts.

## Features
- 🔥 **Live Deals Feed** sourced from Steam featured categories with discount filters
- ⭐ **Wishlist sync** stored in `localStorage`
- 📊 **Interactive price history chart** powered by Recharts
- 🏆 **Top deals ranking** refreshed weekly
- 🤖 **AI insights** via optional GPT summaries (requires `OPENAI_API_KEY`)
- 🧭 Comparison table to evaluate up to three deals
- 💻 Fully responsive layout with a dark neon aesthetic

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the dashboard.

### Environment Variables

| Name | Description |
| --- | --- |
| `OPENAI_API_KEY` | Optional. Enables GPT-powered review summaries in `/api/insights`. |

### Scripts

- `npm run dev` — start the local development server
- `npm run build` — compile the production build
- `npm run start` — serve the production build

## Tech Stack
- Next.js 14 (App Router)
- React 18 with SWR for data fetching
- Tailwind CSS & Framer Motion for the neon glass UI
- Recharts for data visualization
- Axios for API requests
