# 🏛️ G3 Architects Studio - Modern Sustainable Architecture & Computational Space Planning Platform

A high-performance, full-stack **Next.js 15** architectural studio platform designed for luxury residential estates, mass-timber commercial workplaces, and eco-district urban masterplans. Built with a Nordic-Brutalist & Minimalist light editorial UI, this platform features real-time WebSocket collaboration, Groq AI spatial feasibility computations, Stripe subscription billing, Cloudinary asset lockers, and automated Resend transactional bookings.

---

## 🚀 Live Links & Repository

* **Production Application (Netlify):** [https://g3-architects-studio.netlify.app/](https://g3-architects-studio.netlify.app/)
* **GitHub Repository:** [https://github.com/islamrakibul9274/g3-architects-studio](https://github.com/islamrakibul9274/g3-architects-studio)

---

## ✨ Key Features

### 📐 Architectural Client & Public Experience
* **Curated Portfolio & Blueprint Inspector:** Interactive showcase filterable across Residential, Commercial, Sustainable, Urban Masterplans, and Interior & Cultural typologies with high-resolution vector CAD blueprint inspection modals.
* **Interactive Before & After Renovation Studio:** Smooth touch & mouse drag comparison canvas highlighting raw site transformations into biophilic landmarks.
* **Passivhaus & Carbon Specs:** Detailed engineering spec sheets, embodied carbon ratings, thermal envelope data, and acoustic reverberation metrics.
* **Client Moodboards:** One-click project saving to personal account collections with real-time persistence.

### 🧠 AI Architectural Space Planner (Groq AI)
* **High-Throughput Spatial Feasibility:** Powered by Groq LLaMA 3.3 70B to analyze plot dimensions, terrain topography, and building programs in seconds.
* **Automated Zoning Breakdown:** Computes total built area, floor efficiency ratios, room distribution matrices, and construction budget projections.
* **Sustainable Material & Structural Recommender:** Audits mass timber (CLT/Glulam), Roman travertine rainscreens, and geothermal heat pump configurations.

### ⚡ Real-Time Collaboration Studio (Pusher WebSockets)
* **Live Studio Consultation Room:** Sub-second bidirectional WebSocket stream connecting prospective clients directly with lead design principals.
* **Presence & Role Badges:** Real-time online user presence, architect verification badges, and instant chat broadcasting.

### 💳 Pricing & Subscriptions (Stripe)
* **Tiered Architectural Plans:**
  * **Starter Blueprint ($49/mo or $470/yr):** 2D CAD floorplans (.DWG/.PDF) and unlimited AI Space Planner simulations.
  * **Studio Pro ($199/mo or $1,900/yr):** Full 3D BIM Revit (.RVT) & IFC models, Passivhaus calculations, and priority live consultation queue.
  * **Enterprise Developer ($799/mo or $7,600/yr):** Dedicated senior partner assignment, custom masterplan zoning, and 4-hour response SLA.
* **Stripe Checkout Integration:** Instant checkout session generation with monthly and annual billing options.

### 📅 Consultation Inquiries & Asset Vault (Resend & Cloudinary)
* **Automated Email Dispatch:** Direct calendar booking and briefing confirmation emails powered by the Resend API.
* **Site Survey Asset Locker:** Secure Cloudinary upload pipeline for topographical surveys, CAD drawings, and site drone photography.

---

## 💻 Tech Stack

**Frontend & Design:**
* **Next.js 15** (App Router & Server Components)
* **React 19** & **TypeScript**
* **Tailwind CSS** (Architectural Light Mode & Precision Gridlines)
* **Lucide React** (Modern iconography)

**Backend, Database & Security:**
* **Next.js API Route Handlers**
* **MongoDB Atlas** & **Mongoose** (Resilient dual-layer persistence)
* **JWT & BcryptJS** (Secure password hashing and HTTP-only cookie sessions)

**Third-Party Cloud & AI Integrations:**
* **Groq SDK** (LLaMA 3.3 70B Versatile for Spatial Feasibility)
* **Pusher Channels** (Real-Time WebSockets on `mt1` cluster)
* **Stripe SDK** (Subscription Billing & Checkout Sessions)
* **Resend** (Transactional Email Engine)
* **Cloudinary** (Digital Asset & Drawing Storage)

---

## 🛠 Local Setup Instructions

### 1. Prerequisites
* Node.js (v18.0.0 or higher)
* npm (v9.0.0 or higher)
* Git

### 2. Clone the Repository
```bash
git clone https://github.com/islamrakibul9274/g3-architects-studio.git
cd g3-architects-studio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Configuration
Create a `.env.local` file in the root directory and configure your API credentials:

```env
# Database & Authentication
MONGODB_URI="your_mongodb_connection_string"
AUTH_SECRET="your_generated_jwt_secret"
AUTH_URL="http://localhost:3000"

# Groq AI Space Planner
GROQ_API_KEY="your_groq_api_key"

# Pusher Real-Time WebSockets
PUSHER_APP_ID="your_pusher_app_id"
NEXT_PUBLIC_PUSHER_KEY="your_pusher_public_key"
PUSHER_SECRET="your_pusher_secret"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"

# Stripe Payments & Subscriptions
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

# Resend Transactional Email
RESEND_API_KEY="your_resend_api_key"

# Cloudinary Asset Management
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### 5. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

---

## ⚙️ Production Deployment

This application is deployed and optimized for edge delivery on **Netlify** with `@netlify/plugin-nextjs`:

```bash
# Build for production
npm run build

# Deploy directly via Netlify CLI
npx netlify deploy --build --prod
```

---

## 👤 Author

**Rakibul Islam Rumel**
* GitHub: [@islamrakibul9274](https://github.com/islamrakibul9274)
* Live Portfolio: [https://g3-architects-studio.netlify.app](https://g3-architects-studio.netlify.app)
