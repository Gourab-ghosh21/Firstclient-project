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
│   ├── package.json              # Independent frontend dependencies & scripts
│   ├── package-lock.json         # Frontend lockfile
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.js        # Brand color system & tokens
│   ├── next.config.mjs           # Next.js image & build configuration
│   └── .env.example              # Frontend environment template
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
│   ├── package.json              # Independent backend dependencies & scripts
│   ├── package-lock.json         # Backend lockfile
│   ├── tsconfig.json             # Backend TypeScript configuration
│   └── .env.example              # Backend environment template
│
├── scripts/
│   └── dev.js                    # Cross-platform runner for concurrent local dev
├── package.json                  # Root monorepo workspace configuration
├── B2B_garment_wholesale_website_plan_20261008111145.jpg # Approved Design Reference
├── LICENSE                       # Apache 2.0 License
└── README.md                     # Platform documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.17.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 1. Unified Start (Recommended — One Command)

From the project root directory:

```bash
npm run dev
```

This concurrently launches both services:
- 🌐 **Frontend (Next.js)**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Backend (Express API)**: [http://localhost:5001](http://localhost:5001)
- 🩺 **Health Check**: [http://localhost:5001/api/health](http://localhost:5001/api/health)

### 2. Run Applications Individually

#### Option A: From Root
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

#### Option B: From Subdirectories
```bash
# Backend (Port 5001)
cd backend
npm install
npm run dev

# Frontend (Port 3000)
cd frontend
npm install
npm run dev
```

---

## 🌐 URLs & Ports

| Application | Port | Local URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Website** | `3000` | [http://localhost:3000](http://localhost:3000) | Customer-facing wholesale portal |
| **Catalog** | `3000` | [http://localhost:3000/products](http://localhost:3000/products) | Wholesale product catalog & filter |
| **Admin Desk** | `3000` | [http://localhost:3000/admin](http://localhost:3000/admin) | Internal lead & order management (*Passcode: `jyoti2026`*) |
| **Backend REST API** | `5001` | [http://localhost:5001](http://localhost:5001) | Express REST API |
| **Backend Health** | `5001` | [http://localhost:5001/api/health](http://localhost:5001/api/health) | Live system status & database state |

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

### Frontend (`frontend/.env.local` or Vercel Environment)

| Variable | Default (Local) | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | `https://api.jyotienterprise.com` | Public base URL of backend API |
| `NEXT_PUBLIC_BRAND_NAME` | `JYOTI ENTERPRISE` | `JYOTI ENTERPRISE` | Brand name displayed throughout UI |

> **Security Note:** Never expose backend server secrets or Supabase service-role keys in frontend variables prefixed with `NEXT_PUBLIC_`.

### Backend (`backend/.env` or Hosting Environment)

| Variable | Default (Local) | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `5001` | `5001` (or assigned by host) | Express listening port |
| `NODE_ENV` | `development` | `production` | Node runtime environment |
| `CORS_ORIGIN` | `http://localhost:3000` | `https://jyoti-enterprise.vercel.app` | Allowed CORS origins (comma-separated) |
| `ADMIN_SECRET_PASSCODE` | `jyoti2026` | `your-secure-passcode` | Admin portal authentication secret |
| `SUPABASE_URL` | *(optional)* | `https://xyz.supabase.co` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | *(optional)* | `eyJhbGciOi...` | Supabase service-role key (server-side only) |

---

## ☁️ Deployment Guide

### Deploying the Frontend on Vercel

The `frontend/` directory is an independent Next.js application ready for Vercel deployment:

1. Import the repository `https://github.com/Gourab-ghosh21/Firstclient-project` in [Vercel](https://vercel.com).
2. Under **Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click *Edit* and select **`frontend`**
   - **Build Command**: `npm run build` *(default)*
   - **Output Directory**: `.next` *(default)*
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: The deployed URL of your backend (e.g. `https://your-backend.onrender.com` or `https://api.jyotienterprise.com`).
   - `NEXT_PUBLIC_BRAND_NAME`: `JYOTI ENTERPRISE`
4. Click **Deploy**.

### Deploying the Backend (Render, Railway, or VPS)

The `backend/` directory is a standalone Node/Express application:

#### Deploying on Render (Web Service):
1. Create a new **Web Service** connected to `Firstclient-project`.
2. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` *(runs `node dist/server.js`)*
3. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5001` *(Render automatically handles port mapping)*
   - `CORS_ORIGIN`: Your Vercel frontend URL (e.g. `https://your-frontend.vercel.app`)
   - `ADMIN_SECRET_PASSCODE`: Your secure passcode
   - `SUPABASE_URL`: *(Optional)* Your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY`: *(Optional)* Your Supabase service role key
4. Once deployed, copy your backend service URL and set it as `NEXT_PUBLIC_API_URL` in your Vercel frontend settings.

---

## 🗄️ Database & Supabase Setup

The backend includes a state persistence layer with pre-loaded wholesale catalog items and lead submissions. It can optionally be backed by PostgreSQL / Supabase:

1. Open your Supabase project dashboard.
2. Go to **SQL Editor** and execute the migration script located at:
   [`backend/supabase/schema.sql`](backend/supabase/schema.sql)
3. Copy your project URL and service role key into `backend/.env`:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. Restart the backend server. The backend will automatically detect Supabase credentials and sync all enquiries, products, and starter leads to PostgreSQL.

---

## 🛠️ Verification & Build Commands

```bash
# Build Frontend
cd frontend
npm run build

# Build Backend
cd backend
npm run build
```

Both frontend and backend builds compile cleanly with TypeScript validation enabled.
