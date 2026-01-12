# LEADGEAR SEO Dashboard

A modern, internal agency platform for managing clients, monitoring SEO health, and tracking analytics.

## Features

- **Role-Based Access**: Admin and Account Manager roles with different permissions
- **Client Management**: Full CRUD operations for clients
- **SEO Audit**: Comprehensive SEO health analysis including:
  - Technical SEO (crawlability, indexability, performance, security)
  - On-Page SEO (title tags, content quality, URL structure, images)
  - Off-Page SEO (backlinks, authority, trust)
  - Local SEO (Google Business Profile, NAP consistency)
- **Analytics Integration**: View traffic, conversions, and user behavior (when connected)
- **Ads Performance**: Track campaign performance, spend, and ROI (when connected)
- **Search Console**: Monitor search performance, clicks, and rankings (when connected)
- **Team Management**: Assign clients to account managers
- **Modern UI**: Beautiful, responsive design with LEADGEAR branding

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Demo Credentials

**Admin:**
- Email: `admin@leadgear.com`
- Password: `password`

**Manager:**
- Email: `manager@leadgear.com`
- Password: `password`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ClientHeader.jsx
│   ├── ClientSidebar.jsx
│   ├── ClientModal.jsx
│   ├── ManagerModal.jsx
│   ├── MainLayout.jsx
│   ├── ProtectedRoute.jsx
│   ├── Sidebar.jsx
│   └── TopBar.jsx
├── contexts/            # React contexts for state management
│   ├── AuthContext.jsx
│   └── DataContext.jsx
├── pages/
│   ├── admin/          # Admin-only pages
│   │   ├── AdminDashboard.jsx
│   │   ├── ClientList.jsx
│   │   └── AccountManagers.jsx
│   ├── manager/        # Manager pages
│   │   ├── ManagerDashboard.jsx
│   │   └── ManagerClientList.jsx
│   ├── client/         # Client dashboard pages
│   │   ├── ClientDashboard.jsx
│   │   ├── Overview.jsx
│   │   ├── SEOAudit.jsx
│   │   ├── Analytics.jsx
│   │   ├── Ads.jsx
│   │   └── SearchConsole.jsx
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   └── InviteAccept.jsx
│   ├── public/         # Public pages
│   │   └── ToolOverview.jsx
│   └── Settings.jsx
└── main.jsx            # Entry point
```

## Features Overview

### Authentication
- Login with email and password
- Forgot password flow
- Password reset
- Invite-based account creation for managers

### Admin Dashboard
- Agency-wide overview
- Total clients and active clients
- Average SEO score
- Clients with critical issues
- Data source coverage
- Account manager performance
- Clients needing attention

### Client Management
- View all clients (Admin) or assigned clients (Manager)
- Add, edit, and delete clients
- Assign clients to managers
- View client details and metrics

### Client Dashboard
- **Overview**: SEO score, critical issues, connected sources, key metrics
- **SEO Audit**: Comprehensive SEO analysis with actionable insights
- **Analytics**: Traffic trends, top pages, conversions (when connected)
- **Ads**: Campaign performance, spend, ROI (when connected)
- **Search Console**: Search performance, rankings, top queries (when connected)

### SEO Audit Details

#### Technical SEO
- Crawlability (robots.txt, XML sitemap, crawl budget, LLM.txt)
- Indexability (noindex tags, meta robots, canonical tags)
- Server responses (200/301/404/500, redirect chains)
- Site speed & performance (TTFB, LCP, CLS, FID/INP)
- HTTPS / security (valid TLS, mixed content)
- Mobile friendliness (responsive design, viewport)
- Structured data / schema errors

#### On-Page SEO
- Title tags, meta descriptions, H1s (uniqueness, length, quality)
- Content quality & keyword targeting (duplicate content, thin pages)
- URL structure (clean, readable, consistent)
- Image alt text and filename optimization
- Internal linking (useful anchors, orphan pages)
- Schema on key pages

#### Off-Page SEO
- Backlink profile health (toxic links, diversity, anchor text)
- Authority, trust, relevance
- Referring domains quality & topical relevance
- Disavow / cleanup if negative SEO detected
- Link velocity

#### Local SEO
- Google Business Profile optimization
- Local keyword tracking (city/area-based)
- NAP consistency review (Name, Address, Phone)
- Local ranking visibility report

## Frontend-Only Mode

Currently, the application works entirely on the frontend with localStorage for data persistence. All CRUD operations are functional. Backend integration can be added later by:

1. Replacing localStorage calls with API calls
2. Adding authentication API endpoints
3. Implementing real data source connections (Analytics, Ads, Search Console)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

Internal use only - LEADGEAR Agency Tool

