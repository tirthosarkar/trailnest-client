<div align="center">

<img src="public/img/homepage.jpg" alt="TrailNest — Explore Beyond Limits" width="100%" />

<br />

<h1>
  <span style="color:#155e75">Trail</span><span style="color:#0d9488">Nest</span>
</h1>

<p><strong>Explore Beyond Limits</strong></p>
<p>Discover, book, and manage campsites and outdoor gear rentals — all in one place.</p>

<p>
  <a href="https://trailnest-client.vercel.app/"><img src="https://img.shields.io/badge/Live%20Site-visit-0d9488?style=for-the-badge" alt="Live Site" /></a>
  <a href="https://trailnest-backend-alpha.vercel.app/"><img src="https://img.shields.io/badge/Live%20API-visit-155e75?style=for-the-badge" alt="Live API" /></a>
  <a href="https://github.com/tirthosarkar/trailnest-client"><img src="https://img.shields.io/badge/Frontend-repo-181717?style=for-the-badge&logo=github" alt="Frontend Repo" /></a>
  <a href="https://github.com/tirthosarkar/trailnest-backend"><img src="https://img.shields.io/badge/Backend-repo-181717?style=for-the-badge&logo=github" alt="Backend Repo" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Express-5-black?style=flat-square&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-native%20driver-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/BetterAuth-1.6-orange?style=flat-square" alt="BetterAuth" />
</p>

</div>

<br />

## About

TrailNest is a full-stack outdoor gear and campsite booking platform. Users can browse campsites and rentable gear on an interactive map, book them for a date range with conflict-checked availability, manage their own listings with image uploads, and track their booking history from a personal dashboard with visual analytics.

It's a two-repo MERN project: this repo is the **Next.js frontend**; the API lives in a separate **Express + TypeScript backend** (linked below).

|                          | Live                                                                              | Repository                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Frontend** (this repo) | [trailnest-client.vercel.app](https://trailnest-client.vercel.app/)               | [https://github.com/tirthosarkar/trailnest-client](https://github.com/tirthosarkar/trailnest-client)   |
| **Backend**              | [trailnest-backend-alpha.vercel.app](https://trailnest-backend-alpha.vercel.app/) | [https://github.com/tirthosarkar/trailnest-backend](https://github.com/tirthosarkar/trailnest-backend) |

---

## Table of Contents

- [About](#about)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
  - [Frontend (this repo)](#frontend-this-repo)
  - [Backend (trailnest-backend)](#backend-trailnest-backend)
- [API Reference](#api-reference)
- [📂 Project Structure](#-project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Features

- 🏕️ **Browse & Search** — Explore campsites and gear listings with search, type filters, and price range, in both a paginated grid view and an interactive Leaflet map view showing every result as a pin.
- 📍 **Location-Aware Listings** — Add a listing by dropping a pin on an interactive map; view exact coordinates on the details page.
- 📅 **Date-Range Booking with Conflict Checks** — Book any listing for a custom date range with a calendar picker (`react-datepicker`); the backend cross-references existing confirmed bookings for that listing before confirming.
- 🔐 **Secure Authentication** — Email/password auth via **BetterAuth**, with the Express API verifying every protected request against BetterAuth's own session collection via a Bearer token — no separate auth system to keep in sync.
- 🖼️ **Image Uploads** — Listing photos are uploaded directly to ImgBB from the add/edit listing form — no manual URL pasting.
- ✏️ **Full Listing Ownership** — Owners can edit or delete only their own listings, enforced on the server by comparing the authenticated user's email against the listing's `ownerEmail`; delete is guarded behind a confirmation modal.
- 📊 **Personal Dashboard** — A profile page with booking analytics (pie and bar charts via `recharts`) summarizing booking activity over time.
- 🔔 **Toast Notifications** — Every success/error state surfaces through `sonner` toasts — no native `alert()` anywhere in the app.
- 📱 **Fully Responsive** — Grid layouts, navbar, and booking modals adapt across mobile, tablet, and desktop, including a dedicated mobile drawer nav.
- 📄 **Complete Info Architecture** — About, How It Works, Safety Tips, FAQs, Help Center, Contact, Privacy Policy, Terms of Service, and Cookie Policy pages, not just the core booking flow.
- ⚡ **Skeleton Loading States** — Listing cards render skeleton placeholders while data is in flight, instead of a blank screen or spinner-only wait.

---

## Screenshots

<div align="center">
<table>
<tr>
<td><img src="public/img/homepage.jpg" alt="Homepage" width="100%" /><br/><sub>Homepage</sub></td>
<td><img src="public/img/explore.jpg" alt="Explore & Map View" width="100%" /><br/><sub>Explore — grid & map view</sub></td>
</tr>
<tr>
<td colspan="2"><img src="public/img/featured.jpg" alt="Featured Listings" width="100%" /><br/><sub>Featured listings</sub></td>
</tr>
</table>
</div>

---

## Tech Stack

### Frontend (this repo)

| Layer             | Technology                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Framework**     | [Next.js 16](https://nextjs.org/) (App Router, Server Components)                   |
| **Language**      | TypeScript                                                                          |
| **Styling**       | [Tailwind CSS 4](https://tailwindcss.com/)                                          |
| **Auth**          | [BetterAuth](https://www.better-auth.com/) + MongoDB adapter                        |
| **Maps**          | [Leaflet](https://leafletjs.com/) — custom single-pin picker & multi-pin browse map |
| **Date Picking**  | react-datepicker                                                                    |
| **Charts**        | [Recharts](https://recharts.org/) (dashboard analytics)                             |
| **Animations**    | Framer Motion                                                                       |
| **Carousels**     | Swiper, react-fast-marquee                                                          |
| **Notifications** | Sonner                                                                              |
| **Icons**         | Lucide React, React Icons                                                           |
| **Image Hosting** | ImgBB API                                                                           |
| **Deployment**    | Vercel                                                                              |

### Backend ([trailnest-backend](https://github.com/tirthosarkar/trailnest-backend))

| Layer          | Technology                                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| **Runtime**    | Node.js, Express 5                                                            |
| **Language**   | TypeScript                                                                    |
| **Database**   | MongoDB (native driver)                                                       |
| **Auth**       | Bearer-token session lookup against BetterAuth's `session`/`user` collections |
| **Deployment** | Vercel                                                                        |

---

## API Reference

Base URL: `https://trailnest-backend-alpha.vercel.app`

| Method | Endpoint                       | Auth         | Description                                                               |
| ------ | ------------------------------ | ------------ | ------------------------------------------------------------------------- |
| GET    | `/`                            | Public       | Health check                                                              |
| GET    | `/listing`                     | Public       | Paginated listings with search/type/price filters                         |
| GET    | `/featured`                    | Public       | Latest listings for the homepage                                          |
| GET    | `/listing/:id`                 | Public       | Single listing by ID                                                      |
| POST   | `/listing`                     | 🔒 Protected | Create a listing                                                          |
| PUT    | `/listing/:id`                 | 🔒 Protected | Update a listing (owner only)                                             |
| DELETE | `/listing/:id`                 | 🔒 Protected | Delete a listing (owner only)                                             |
| GET    | `/my-listings`                 | 🔒 Protected | Listings owned by the current user                                        |
| GET    | `/bookings/listing/:listingId` | Public       | Confirmed booking date ranges for a listing (conflict check)              |
| POST   | `/bookings`                    | 🔒 Protected | Create a booking, rejected if dates overlap an existing confirmed booking |
| GET    | `/my-bookings`                 | 🔒 Protected | Current user's bookings, joined with listing details                      |
| DELETE | `/bookings/:id`                | 🔒 Protected | Cancel a booking (owner of the booking only)                              |
| GET    | `/me`                          | 🔒 Protected | Current authenticated user                                                |

🔒 Protected routes require an `Authorization: Bearer <session-token>` header, obtained from `authClient.token()` on the frontend.

---

## 📂 Project Structure

````text
trailnest-client/
├── public/                     # Static assets (icons, images, illustrations)
└── src/
    ├── app/                    # Next.js App Router folders & route handlers
    │   ├── (informational)/    # Marketing & static views (About, Safety Tips, etc.)
    │   ├── (support)/          # Help desk & legal pages (FAQs, Terms, Privacy)
    │   ├── add-listing/        # Multi-step creation form for owners (Protected)
    │   ├── api/                # API route configurations (e.g., BetterAuth handlers)
    │   ├── explore/            # Dynamic campsite grid, maps, and details ([id])
    │   ├── forbidden/          # 403 Access control error view
    │   ├── login/              # User sign-in screen
    │   ├── my-bookings/        # Traveler reservation itinerary panel (Protected)
    │   ├── my-listings/        # Owner property management workspace (Protected)
    │   ├── profile/            # Analytics dashboard and public overview (Protected)
    │   ├── register/           # User sign-up screen
    │   ├── settings/           # Security, account preferences panel (Protected)
    │   ├── unauthorized/       # 401 Access control error view
    │   ├── error.tsx           # Global error boundary fallbacks
    │   ├── layout.tsx          # Main root layout layout configurations
    │   ├── loading.tsx         # Root suspense fallback indicators
    │   ├── not-found.tsx       # Custom 404 page layout
    │   └── page.tsx            # Application core Landing page index entry point
    ├── assets/                 # Component-specific styles or bundled image assets
    ├── components/             # Reusable modular UI components
    │   ├── Home/               # Hero sections, Feature grids, Testimonials, Newsletters
    │   ├── Listing/            # Booking forms, Leaflet/Mapbox maps, management modals
    │   ├── Shared/             # Responsive Navigation bar, drop-menus, Footers
    │   └── Ui/                 # Atomic design tokens (Buttons, Inputs, Containers)
    ├── hooks/                  # Custom state management and performance primitives
    │   ├── useDebounce.ts      # Optimizes high-frequency state updates (search filters)
    │   └── useImageUpload.ts   # Handles binary payload preparation & cloud staging
    ├── lib/                    # SDK initializations & functional utilities
    │   ├── core/               # Low-level network configurations & API base instances
    │   ├── auth-client.ts      # BetterAuth Client-side reactive hook states
    │   └── auth.ts             # BetterAuth Server-side runtime integrations
    └── types/                  # Global TypeScript structural schema declarations
        ├── explore.ts          # Typing definitions for query parameters and routing
        └── listing.ts          # Schema models for campsites, reviews, and bookings

---

## Getting Started

### Prerequisites

- Node.js 18.18+
- A MongoDB connection string (Atlas or local) — shared with the [backend](https://github.com/tirthosarkar/trailnest-backend)
- An [ImgBB API key](https://api.imgbb.com/) (free) for image uploads
- The [TrailNest backend](https://github.com/tirthosarkar/trailnest-backend) running locally or the live API URL above

### Installation

```bash
git clone https://github.com/tirthosarkar/trailnest-client.git
cd trailnest-client
npm install
````

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
- [ ] Disable already-booked dates directly in the date picker, instead of only rejecting on submit
- [ ] Owner-side payout/earnings summary in the dashboard
- [ ] Reviews and star ratings on listings

---

## Author

**Tirtho Sarkar**
Frontend-focused developer building toward full-stack (MERN)

- GitHub: [@tirtho-sarkar](https://github.com/tirthosarkar)