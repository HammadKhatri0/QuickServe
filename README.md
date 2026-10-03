# QuickServe – Online Service Website (MERN Stack)

A modern, responsive, full-stack service-based web application developed using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with strict adherence to the **MVC (Model-View-Controller)** architectural pattern.

---

## 🚀 Key Features

- **🏠 Home Page**: Hero section, service highlights, stats counter, "Why Choose Us", trust badges, and quick CTA buttons.
- **🛠️ Services Page**: Full catalog of available services displayed in responsive cards with real-time search functionality.
- **🔍 Search Functionality**: Instant live search by service name or description (e.g. `AC`), displaying matching cards or a friendly *"No service found."* empty state.
- **📄 Service Details Page (`/services/:id`)**: Comprehensive view including high-res image, price, duration, detailed service scope, and instant *"Book Now"* redirection.
- **📅 Booking Page (`/book`)**: Interactive booking form with multi-field client-side and server-side validation, MongoDB persistence, and success confirmation modal.
- **✉️ Contact Page (`/contact`)**: Customer inquiry form with validation, MongoDB persistence, and complete corporate office details.
- **ℹ️ About Page (`/about`)**: Company background, mission statement, vision, service breakdown, and satisfaction guarantee.
- **⚡ Service Management (Admin CRUD) (`/manage-services`)**: Full demonstration dashboard allowing administrators to:
  - Add new services (Name, Description, Price, Duration, Image URL)
  - View all services in real time
  - Edit/update existing services
  - Delete services
  - View all customer bookings and contact submissions directly from MongoDB.

---

## 🏛️ Project & MVC Architecture

```
MERN Assignment/
├── backend/                        # Express & Node.js Server (MVC)
│   ├── config/
│   │   └── db.js                   # MongoDB connection via Mongoose
│   ├── models/                     # [M] Models (Mongoose Schemas)
│   │   ├── Service.js              # Service collection schema
│   │   ├── Booking.js              # Booking collection schema
│   │   └── Contact.js              # Contact inquiry schema
│   ├── controllers/                # [C] Controllers (Business Logic)
│   │   ├── serviceController.js    # CRUD handlers for services
│   │   ├── bookingController.js    # Booking submission & retrieval
│   │   └── contactController.js    # Contact message submission & retrieval
│   ├── routes/                     # API Routes
│   │   ├── serviceRoutes.js        # /api/services endpoints
│   │   ├── bookingRoutes.js        # /api/bookings endpoints
│   │   └── contactRoutes.js        # /api/contact endpoints
│   ├── seeder/
│   │   └── seedServices.js         # Auto-seeder for 8 default services
│   ├── .env                        # Port, Mongo URI, client URL
│   ├── package.json
│   └── server.js                   # Application entry point & middleware
│
├── frontend/                       # React.js Client ([V] View in MVC)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Responsive navigation bar with mobile drawer
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx          # Site footer with quick links & info
│   │   │   ├── Footer.css
│   │   │   ├── ServiceCard.jsx     # Reusable service card component
│   │   │   └── ServiceCard.css
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Home page
│   │   │   ├── HomePage.css
│   │   │   ├── AboutPage.jsx       # About us page
│   │   │   ├── AboutPage.css
│   │   │   ├── ServicesPage.jsx    # Services catalog with live search
│   │   │   ├── ServicesPage.css
│   │   │   ├── ServiceDetailsPage.jsx # Individual service specification
│   │   │   ├── ServiceDetailsPage.css
│   │   │   ├── BookingPage.jsx     # Booking form with validation
│   │   │   ├── BookingPage.css
│   │   │   ├── ContactPage.jsx     # Contact form with validation
│   │   │   ├── ContactPage.css
│   │   │   ├── ManageServicesPage.jsx # Admin CRUD & DB records inspector
│   │   │   └── ManageServicesPage.css
│   │   ├── services/
│   │   │   └── api.js              # Axios REST API client methods
│   │   ├── App.jsx                 # React Router routing & layout
│   │   ├── App.css
│   │   ├── index.css               # Design system, CSS variables & typography
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js              # Proxy configuration (/api -> :5000)
│   └── package.json
│
├── package.json                    # Root workspace script runner
└── README.md
```

---

## 🗄️ Database Collections (MongoDB)

### 1. `services`
```json
{
  "_id": "ObjectId",
  "name": "AC Repair & Servicing",
  "description": "Professional AC repair and maintenance service.",
  "price": 2500,
  "duration": "2 Hours",
  "image": "https://images.unsplash.com/...",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### 2. `bookings`
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0300-1234567",
  "service": "AC Repair & Servicing",
  "date": "2026-10-15",
  "address": "House 12, Street 5, Blue Area, Islamabad",
  "message": "Please bring extra refrigerant gas.",
  "status": "Pending",
  "createdAt": "ISODate"
}
```

### 3. `contacts`
```json
{
  "_id": "ObjectId",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "0312-9876543",
  "message": "Inquiring about corporate maintenance contracts.",
  "createdAt": "ISODate"
}
```

---

## 🌐 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/services` | Retrieve all services (supports `?search=...`) |
| `GET` | `/api/services/:id` | Retrieve single service details |
| `POST` | `/api/services` | Create new service (Admin CRUD) |
| `PUT` | `/api/services/:id` | Update service by ID (Admin CRUD) |
| `DELETE` | `/api/services/:id` | Delete service by ID (Admin CRUD) |
| `GET` | `/api/bookings` | Retrieve all submitted bookings |
| `POST` | `/api/bookings` | Submit a new customer booking |
| `DELETE` | `/api/bookings/:id` | Delete booking record |
| `GET` | `/api/contact` | Retrieve all contact messages |
| `POST` | `/api/contact` | Submit a new contact message |

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on port 27017 or a MongoDB Atlas URI in `backend/.env`.

### 1. Start the Backend
Open a terminal in the root directory:
```powershell
cd backend
npm install
npm run dev
# Or: node server.js
```
The backend server will run at `http://localhost:5000`. On first start, it automatically seeds 8 initial services into MongoDB.

### 2. Start the Frontend
Open a second terminal in the root directory:
```powershell
cd frontend
npm install
npm run dev
```
The frontend application will be live at `http://localhost:5173`.
