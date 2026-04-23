# QR Gen Digital - Premium QR SaaS Platform (v2.0)

QR Gen Digital is a comprehensive, feature-rich QR code management and marketing platform. Built with a modern dark-mode aesthetic and glassmorphism design, it allows users to create, manage, and track advanced QR codes.

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Supabase](https://img.shields.io/badge/Backend-Supabase-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Key Features

### 1. Advanced QR Generation
- **Dynamic QRs**: Edit destination URLs after printing.
- **Lead Capture**: Collect names and emails before redirecting users.
- **PDF & Menu Hosting**: Upload and host restaurant menus or documents directly.
- **Bulk Generation**: Generate thousands of QR codes instantly from CSV files.

### 2. Marketing & Engagement
- **Social Media QR Hub**: Create a Linktree-style landing page for all your social profiles.
- **Templates Marketplace**: Industry-specific SEO landing pages for Restaurants, Weddings, and more.
- **Inspiration Gallery**: A Pinterest-style feed of high-end QR designs.

### 3. Design & Customization
- **Style Studio**: Customize dot styles, corner shapes, and foreground/background colors.
- **Logo Integration**: Add your brand logo with automated background masking.
- **Quick Templates**: One-click professional themes (Midnight, Neon, Luxury Gold).
- **Scannability Meter**: Real-time feedback on your QR design's scannability.

### 4. Analytics & Management
- **Scan Tracking**: Real-time data on devices, browsers, and geographic locations.
- **User Dashboard**: Manage your library of dynamic and static QR codes.
- **Secure Access**: Password-protected QR redirects.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Icons**: Lucide React
- **QR Engine**: react-qr-code, html-to-image
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Styling**: Vanilla CSS with custom glassmorphism components

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase Account

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### Database Setup
Apply the migrations in the `supabase/migrations` folder to your Supabase project to set up the following tables:
- `dynamic_qrs`: Core tracking and configuration
- `qr_scan_events`: Analytics data
- `lead_submissions`: Captured user data
- `social_hubs`: Mini-landing page data
- `site_visits`: Global traffic tracking

## 📦 Deployment

### Supabase Edge Functions
To enable site visit tracking:
```bash
supabase functions deploy track-site-visit
```

### Static Hosting
Build the production bundle:
```bash
npm run build
```
The output will be in the `dist/` directory, ready for deployment to Vercel, Netlify, or AWS.

## 📄 License
This project is licensed under the MIT License.
