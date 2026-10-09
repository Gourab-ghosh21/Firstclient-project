# Jyoti Enterprise — Premium B2B Wholesale Platform

Wholesale Garment Website & Lead Generation Engine built for **Jyoti Enterprise** by **RAGOX**.

---

## 📁 Project Structure

```text
client/
│
├── frontend/                     # Next.js 14 Production Frontend (Port 3000)
│   ├── app/                      # App Router pages & layouts
│   ├── components/               # Editorial & conversion components
│   ├── public/                   # Images, icons & static assets
│   ├── lib/                      # Centralized API client, store & data
│   ├── package.json              # Frontend scripts & dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.js        # Brand color system & tokens
│   ├── next.config.mjs           # Next.js image & build configuration
│   └── .env.local                # Local frontend environment
│
├── backend/                      # Express TypeScript REST API (Port 5001)
│   ├── src/
│   │   ├── config/               # Environment & port configuration
│   │   ├── controllers/          # Business logic handlers
│   │   ├── middleware/           # CORS, rate limiting, error & auth handlers
│   │   ├── routes/               # Clean REST endpoints
│   │   ├── services/             # Storage & Supabase database service
│   │   ├── types/                # TypeScript interfaces
│   │   └── server.ts             # Express server entry point
│   ├── supabase/
│   │   └── schema.sql            # PostgreSQL / Supabase migration schema
│   ├── package.json              # Backend scripts & dependencies
│   ├── tsconfig.json             # Backend TypeScript configuration
│   └── .env                      # Local backend environment
│
├── B2B_garment_wholesale_website_plan_20261008111145.jpg # Approved Design Reference
└── README.md                     # Architecture documentation
```

---

## 🚀 Quick Start Guide

### 1. Unified Start (Recommended — One Command)

From the project root directory:

```bash
npm run dev
```

This concurrently launches both services:
- 🌐 **Frontend (Next.js)**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Backend (Express API)**: [http://localhost:5001](http://localhost:5001)
- 🩺 **Health Check**: [http://localhost:5001/api/health](http://localhost:5001/api/health)

### 2. Or Run Individually

```bash
# Frontend only (from root)
npm run dev:frontend

# Backend only (from root)
npm run dev:backend
```

Or by navigating to subdirectories:

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

- **Frontend URL**: `http://localhost:3000`
- **Catalog**: `http://localhost:3000/products`
- **Admin Desk**: `http://localhost:3000/admin` *(Passcode: `jyoti2026`)*


---

## 🌐 URLs & Ports

| Application | Port | URL |
| :--- | :--- | :--- |
| **Frontend Website** | `3000` | [http://localhost:3000](http://localhost:3000) |
| **Backend REST API** | `5001` | [http://localhost:5001](http://localhost:5001) |
| **Backend Health** | `5001` | [http://localhost:5001/api/health](http://localhost:5001/api/health) |

---

## 🔌 API Endpoints

### Public Wholesale Endpoints
- `GET  /api/health` — System status, timestamp & environment
- `GET  /api/products` — Wholesale product catalog with category filter
- `GET  /api/products/:id` — Single product details by id or slug
- `GET  /api/categories` — Product categories
- `POST /api/wholesale-quote` — Submit wholesale quotation enquiry (Rate-limited, validated)
- `POST /api/contact` — Direct message to wholesale desk
- `POST /api/start-business` — Entrepreneur starter questionnaire submission
- `GET  /api/settings` — Public business profile details

### Protected Admin Endpoints *(Header: `x-admin-key: jyoti2026`)*
- `POST   /api/admin/login` — Authenticate admin passcode
- `GET    /api/admin/leads` — Retrieve pipeline leads & questionnaire inquiries
- `PATCH  /api/admin/leads/:id` — Update lead status (`New`, `Contacted`, `Quotation Sent`, `Negotiation`, `Converted`, `Lost`) and append follow-up notes
- `POST   /api/admin/products` — Create new garment SKU
- `PATCH  /api/admin/products/:id` — Toggle price visibility, edit MOQ, update availability
- `DELETE /api/admin/products/:id` — Remove garment from catalog
- `PUT    /api/settings` — Update configurable WhatsApp numbers, phone, email & address

---

## 🔑 Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_BRAND_NAME="JYOTI ENTERPRISE"
```

### Backend (`backend/.env`)
```env
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
ADMIN_SECRET_PASSCODE=jyoti2026

# Optional: Supabase PostgreSQL (Falls back to active local store if unconfigured)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 🛠️ Production Build & Verification

```bash
# Build Frontend
cd frontend
npm run build

# Build Backend
cd backend
npm run build
```

Both builds compile cleanly with TypeScript validation enabled.
