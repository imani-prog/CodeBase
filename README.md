# MediLink - Healthcare Management Platform

> **Bridging the gap between citizens, clinics, hospitals, and Community Health Workers through smart, user-centric technology**

MediLink is a comprehensive digital health and technology platform transforming healthcare access across Africa. Our mission is to make quality healthcare accessible, affordable, and efficient for everyone through innovative technology solutions.

---

##  Overview

MediLink operates as both a **healthcare service platform** and a **technology solutions provider**, offering:

- **Hospital Management Systems (HMS)** - Complete digitization of hospital operations
- **Patient Portals & Outreach Dashboards** - Accessible care for citizens
- **Telemedicine Modules** - Remote consultations and care
- **CHW Workflow & Supervision Apps** - Community health worker coordination
- **Financial Integration** - NHIF, M-Pesa, SHA payment systems
- **Emergency Services** - Ambulance tracking and dispatch
- **Health Data Analytics & Reporting** - Real-time insights and decision support

---

##  Key Features

### For Healthcare Facilities
- **Electronic Health Records (EHR)** - Secure, centralized patient data management
- **Appointments & Referrals** - Streamlined scheduling and specialist referrals
- **Ambulance Management** - Real-time tracking, dispatch, driver management
- **Financial Management** - Billing, insurance claims (NHIF/SHA), payment processing
- **Telemedicine Integration** - Video consultations and remote care
- **Pharmacy Management** - Inventory, prescriptions, dispensing
- **Laboratory Management** - Test orders, results, and reporting
- **Insurance Management** - Policy verification, claims processing
- **Reports & Analytics** - Comprehensive operational dashboards

### For Patients
- **Online Appointments** - Book visits and receive reminders
- **Home-Based Care** - Request CHW or nurse home visits
- **Emergency Services** - Ambulance tracking with real-time updates
- **Telemedicine** - Video consultations with licensed doctors
- **Insurance Integration** - NHIF/SHA direct billing
- **Health Records Access** - Download medical reports and prescriptions
- **Prescription Management** - Digital prescriptions and refills
- **Health Reminders** - Medication and appointment notifications
- **Wellness Programs** - Access health education and resources

### For Community Health Workers (CHWs)
- **Patient Management** - Track assigned patients and visits
- **Home Visit Logging** - GPS-enabled visit tracking
- **Health Assessments** - Digital assessment forms
- **Task Management** - Follow-ups and assignments
- **Reports & Analytics** - Performance tracking
- **Training Resources** - Access to educational materials
- **Message Center** - Communication with facilities

### For Administrators
- **User Management** - Multi-role access control
- **Hospital Management** - Facility profiles and services
- **CHW Assignments** - Coordinate community health workers
- **Financial Oversight** - Revenue tracking and reporting
- **System Settings** - Platform configuration
- **Notifications Management** - System-wide alerts
- **Training Management** - Staff training and certification

---

## Technology Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **Vite 7.0.5** - Fast build tool and dev server
- **React Router DOM 7.7.0** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first styling
- **Lucide React 0.525.0** - Modern icon library
- **Recharts 3.1.2** - Data visualization
- **Google Maps API 2.20.8** - Location services

### Backend (Integration)
- **Java Spring Boot** - REST API backend
- **JPA/Hibernate** - Database ORM
- **PostgreSQL/MySQL** - Primary database
- **Repository Pattern** - Data access layer
- **DTO Pattern** - Data transfer objects

---

## Project Structure

```
MedilinkCodes/CodeBase/
├── public/                    # Static assets
├── src/
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   ├── Components/           # Reusable UI components
│   │   ├── Admin/            # Admin-specific components
│   │   ├── Client/           # Client portal components
│   │   └── Public/           # Public-facing components
│   ├── Pages/                # Route-based pages
│   │   ├── Admin/            # Admin dashboard pages
│   │   │   ├── AmbulanceManagement.jsx
│   │   │   ├── HospitalManagement.jsx
│   │   │   ├── FinancialManagement.jsx
│   │   │   ├── InsuranceManagement.jsx
│   │   │   ├── TelemedicineManagement.jsx
│   │   │   └── ...
│   │   ├── Client/           # Client portal pages
│   │   │   ├── CHW/          # Community Health Worker pages
│   │   │   └── Patient/      # Patient portal pages
│   │   ├── Public/           # Public pages
│   │   ├── about/            # About pages
│   │   ├── services/         # Service information pages
│   │   ├── solutions/        # Solution pages
│   │   └── resources/        # Resource pages
│   ├── Layouts/              # Layout components
│   │   ├── AdminLayout.jsx
│   │   ├── CHWLayout.jsx
│   │   └── ClientLayout.jsx
│   ├── routes/               # Route configurations
│   │   ├── adminRoutes.jsx
│   │   ├── chwRoutes.jsx
│   │   ├── clientRoutes.jsx
│   │   ├── patientRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── hooks/                # Custom React hooks
│   │   └── useAuth.jsx       # Authentication hook
│   ├── Services/             # API service layer
│   └── assets/               # Images and media
├── eslint.config.js          # ESLint configuration
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Project dependencies
```

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CodeBase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_backend_api_url
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## User Roles

### 1. **Admin**
- Full system access
- User management
- Hospital and facility management
- Financial oversight
- System configuration

### 2. **Patient**
- Book appointments
- Access health records
- Request home visits
- Telemedicine consultations
- Insurance management

### 3. **Community Health Worker (CHW)**
- Patient visit tracking
- Home visit logging
- Health assessments
- Task management
- Training access

### 4. **Hospital Staff**
- Patient management
- Appointment scheduling
- Records management
- Prescription management
- Reports generation

---

##  Authentication & Security

- **Role-based access control (RBAC)**
- **Private route protection**
- **Secure authentication flow**
- **Data encryption** for sensitive information
- **NHIF/SHA integration** with secure API connections
- **Compliance** with GDPR and data protection regulations

---

## Key Routes

### Public Routes
- `/` - Home page
- `/about/*` - About pages (mission, story, team)
- `/services/*` - Service information (patients, CHWs, clinics, demo)
- `/solutions/*` - Solution pages (hospitals, patients, CHWs)
- `/partners/*` - Partner information
- `/resources/*` - Blog, support, training, API docs

### Protected Routes
- `/admin/*` - Admin dashboard and management
- `/client/patient/*` - Patient portal
- `/client/chw/*` - CHW portal

---

## API Integration

### Backend Services
The frontend integrates with a Java Spring Boot backend providing:

- **REST API endpoints** for all CRUD operations
- **Authentication service** with JWT tokens
- **Payment gateway integration** (M-Pesa, NHIF)
- **Real-time notifications** via WebSocket
- **File uploads** for documents and images
- **GPS tracking** for ambulances and CHW visits

### Key API Modules
- Ambulance management (dispatch, tracking, drivers, equipment)
- Patient records and health data
- Appointment scheduling
- Insurance verification and claims
- Financial transactions and billing
- Telemedicine sessions
- CHW activity tracking

---

## Features in Detail

### Ambulance Management
- Real-time GPS tracking
- Dispatch management with priority levels
- Driver assignment and scheduling
- Equipment inventory tracking
- Maintenance logging
- Emergency call handling

### Financial Services
- M-Pesa STK Push integration
- NHIF/SHA claims processing
- Patient billing and invoicing
- Payment history and receipts
- Multi-currency support

### Telemedicine
- Video consultations
- Appointment scheduling
- Digital prescriptions
- Medical records sharing
- Follow-up management

---

## Impact

MediLink is designed to serve:
- **Rural clinics** with limited infrastructure
- **Major hospitals** requiring full digitization
- **Community health programs** coordinating CHWs
- **Patients** in remote areas needing access to care
- **Government health initiatives** supporting national health goals

---

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

Copyright © 2026 MediLink. All rights reserved.

---

## Support & Contact

- **Website**: [Contact Page](/contact)
- **Email**: support@medilink.com
- **Documentation**: [Developers API](/resources/developers-api)
- **Training**: [Resources & Training](/resources/training)

---

## Roadmap

- [ ] Mobile app development (iOS/Android)
- [ ] AI-powered diagnosis assistance
- [ ] Blockchain for health records
- [ ] Integration with more insurance providers
- [ ] Expanded analytics and reporting
- [ ] Multi-language support

---

**MediLink** - _Making healthcare accessible to all Africans_

