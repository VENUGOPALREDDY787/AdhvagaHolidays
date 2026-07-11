# Adhvaga Holidays

A premium, full-stack travel and holiday booking application. Adhvaga Holidays offers a sleek, modern user interface for clients to browse holiday packages, visa information, and contact support, backed by a robust and secure admin panel for content management.

## Features

### Frontend (Client UI)
- **Premium Design:** Dark mode aesthetics with gold accents and glassmorphism UI elements.
- **Dynamic Flyers:** Custom sequential flyer splash screen configured via the admin panel.
- **Packages & Visas:** Browse detailed travel packages and visa requirements with high-quality imagery.
- **Responsive:** Fully responsive design built with modern React.
- **SEO Optimized:** Dynamic meta tags and JSON-LD structured data for superior search engine rankings.

### Backend & Admin (Content Management)
- **Secure Authentication:** Helmet security headers, rate limiting, and robust JWT Role-Based Access Control (RBAC).
- **Package Management:** Create, edit, and categorize travel packages.
- **Visa Management:** Detailed visa configurations including pricing, descriptions, and dynamic document checklists.
- **Settings & Flyers:** Upload and manage promotional flyers displayed on the client frontend.

## Tech Stack

- **Frontend:** React.js, Vite, Framer Motion, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** Helmet, Express-Rate-Limit, crypto-safe password comparison
- **Media Storage:** Cloudinary

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Cloudinary account for image hosting

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VENUGOPALREDDY787/AdhvagaHolidays.git
   ```

2. Install Backend Dependencies:
   ```bash
   cd adhvagabackend
   npm install
   ```

3. Install Frontend Dependencies:
   ```bash
   cd ../adhvagafrontend
   npm install
   ```

### Running the Application (Development)

Run the backend:
```bash
cd adhvagabackend
npm run dev
```

Run the frontend:
```bash
cd adhvagafrontend
npm run dev
```

The application will be running at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).
