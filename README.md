<div align="center">

<img src="https://trailnest-client.vercel.app/hero01.jpg" alt="TrailNest — Explore Beyond Limits" width="100%" />

<br />

<h1>
  <span style="color:#155e75">Trail</span><span style="color:#0d9488">Nest</span>
</h1>

<p><strong>Explore Beyond Limits</strong></p>
<p>Discover, book, and manage campsites and outdoor gear rentals — all in one place.</p>

<p>
  <a href="https://trailnest-client.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-visit%20site-0d9488?style=for-the-badge" alt="Live Demo" /></a>
  <a href="https://github.com/tirthosarkar/trailnest-client.git"><img src="https://img.shields.io/badge/Frontend-repo-155e75?style=for-the-badge&logo=github" alt="Frontend Repo" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/BetterAuth-1.6-orange?style=flat-square" alt="BetterAuth" />
  <img src="https://img.shields.io/badge/MongoDB-native%20driver-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

</div>

<br />

## About

TrailNest is a full-stack outdoor gear and campsite booking platform. Users can browse campsites and rentable gear on an interactive map, book them for a date range with live conflict-free availability, manage their own listings with image uploads, and track their booking history from a personal dashboard with visual analytics.

It was built as a MERN-stack side project to practice a fully typed (TypeScript) Next.js App Router codebase, session-based auth with JWT, and real-world CRUD ownership patterns — while pushing further into interactive maps and data visualization than earlier projects in this series.

**🔗 Live site:** [trailnest-client.vercel.app](https://trailnest-client.vercel.app/)

---

## Table of Contents

- [About](#about)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Features

- 🏕️ **Browse & Search** — Explore campsites and gear listings with search, type filters, and price range, in both grid view and an interactive Leaflet map view showing every result as a pin.
- 📍 **Location-Aware Listings** — Add a listing by dropping a pin on an interactive map; view exact coordinates on the details page.
- 📅 **Date-Range Booking** — Book any listing for a custom date range with a calendar picker (`react-datepicker`) and live, auto-calculated total cost.
- 🔐 **Secure Authentication** — Email/password auth via **BetterAuth** with MongoDB-backed sessions; protected routes redirect unauthenticated users automatically, and previously-logged-in users skip the login screen on reload.
- 🖼️ **Image Uploads** — Listing photos are uploaded directly to ImgBB from the add/edit listing form — no manual URL pasting.
- ✏️ **Full Listing Ownership** — Owners can edit or delete only their own listings, enforced end-to-end; delete is guarded behind a confirmation modal.
- 📊 **Personal Dashboard** — A profile page with booking analytics (pie and bar charts via `recharts`) summarizing booking activity over time.
- 🔔 **Toast Notifications** — Every success/error state surfaces through `sonner` toasts — no jarring native `alert()` anywhere in the app.
- 📱 **Fully Responsive** — Grid layouts, navbar, and booking modals adapt across mobile, tablet, and desktop, including a dedicated mobile drawer nav.
- 📄 **Complete Info Architecture** — About, How It Works, Safety Tips, FAQs, Help Center, Contact, Privacy Policy, Terms of Service, and Cookie Policy pages, not just the core booking flow.
- ⚡ **Skeleton Loading States** — Listing cards render skeleton placeholders while data is in flight, instead of a blank screen or spinner-only wait.

---

## Tech Stack

| Layer             | Technology                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Framework**     | [Next.js 16](https://nextjs.org/) (App Router, Server Components)                   |
| **Language**      | TypeScript                                                                          |
| **Styling**       | [Tailwind CSS 4](https://tailwindcss.com/)                                          |
| **Auth**          | [BetterAuth](https://www.better-auth.com/) + MongoDB adapter                        |
| **Database**      | MongoDB (native driver)                                                             |
| **Maps**          | [Leaflet](https://leafletjs.com/) — custom single-pin picker & multi-pin browse map |
| **Date Picking**  | react-datepicker                                                                    |
| **Charts**        | [Recharts](https://recharts.org/) (dashboard analytics)                             |
| **Animations**    | Framer Motion                                                                       |
| **Carousels**     | Swiper, react-fast-marquee                                                          |
| **Notifications** | Sonner                                                                              |
| **Icons**         | Lucide React, React Icons                                                           |
| **Image Hosting** | ImgBB API                                                                           |
| **Deployment**    | Vercel                                                                              |

---

## Project Structure

```
src/
├── app/
│   ├── (informational)/     # About, How It Works, Safety Tips, Sitemap, Contact
│   ├── (support)/           # FAQs, Help, Privacy, Terms, Cookies
│   ├── api/auth/             # BetterAuth route handler
│   ├── explore/[id]/         # Listing details page
│   ├── add-listing/          # Create listing (protected)
│   ├── my-listings/          # Owner's listings dashboard (protected)
│   ├── my-bookings/          # User's bookings (protected)
│   ├── profile/               # Analytics dashboard (protected)
│   ├── settings/              # Account settings (protected)
│   ├── login/ · register/     # Auth screens
│   └── forbidden/ · unauthorized/  # Access-control pages
├── components/
│   ├── Home/                 # Hero, Services, Testimonials, FAQ, Newsletter, CTA
│   ├── Listing/               # Cards, both map components, Booking/Delete modals, forms
│   ├── Shared/                # Navbar (+ mobile drawer, user dropdown), Footer
│   └── Ui/                   # Button, Input, Container, ImageUpload, SectionTitle
└── lib/                      # auth.ts, session helpers, API utilities
```

---

## Getting Started

### Prerequisites

- Node.js 18.18+
- A MongoDB connection string (Atlas or local)
- An [ImgBB API key](https://api.imgbb.com/) (free) for image uploads
- The TrailNest backend API running (see the server repo)

### Installation

```bash
git clone https://github.com/tirthosarkar/trailnest-client.git
cd trailnest-client
npm install
```

Copy the environment variables below into a `.env.local` file, then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB (used by BetterAuth for session storage)
MONGO_DB_URI=your_mongodb_connection_string
AUTH_DB_NAME=your_auth_database_name

# BetterAuth
BETTER_AUTH_URL=http://localhost:3000

# TrailNest backend API
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Image uploads
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

> Never commit `.env.local` — it's already covered by `.gitignore`.

---

## Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the local development server |
| `npm run build` | Create a production build          |
| `npm run start` | Serve the production build         |
| `npm run lint`  | Run ESLint                         |

---

## Roadmap

- [ ] Google OAuth sign-in
- [ ] Real-time booking-conflict prevention on the calendar (disable already-booked dates visually)
- [ ] Owner-side payout/earnings summary in the dashboard
- [ ] Reviews and star ratings on listings

---

## Author

**Shahadat Hossain**
Frontend-focused developer building toward full-stack (MERN)

- GitHub: [@tirtho-sarkar](https://github.com/tirthosarkar)
