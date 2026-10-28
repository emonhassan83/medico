# Medico - Repository & Folder Structure

This document outlines the organization, conventions, and module layout of the **Medico** full-stack monorepo.

---

## 1. Root Repository Layout

```
medico/
├── .gitignore               # Comprehensive Git ignore rules (Next.js, Node, logs, secrets)
├── README.md                # Project landing, features, installation, team & contributor guide
├── client/                  # Next.js 14 App Router Frontend
├── server/                  # Express.js & TypeScript Backend (Prisma ORM)
└── docs/                    # Technical engineering specifications & architecture
    ├── AI_SYSTEM_PROMPT.md  # System instructions for AI coding assistants
    ├── API_GUIDELINES.md    # RESTful API design standards, error formats & routes
    ├── ARCHITECTURE.md      # Layered architecture blueprint & entity diagrams
    ├── AUTHENTICATION.md    # RBAC security, JWT lifecycle & password reset flow
    ├── CODING_RULES.md      # Engineering rules, TypeScript conventions & code style
    ├── DATABASE_SEEDING.md  # Prisma schema, migrations & seed execution guide
    ├── DEPLOYMENT.md        # Production deployment, Docker & environment checklist
    ├── FOLDER_STRUCTURE.md  # Detailed monorepo file & directory breakdown
    ├── TESTING_WORKFLOW.md  # Testing protocols, API validation & QA checklist
    └── development.md       # Local developer environment setup & workflow
```

---

## 2. Frontend Structure (`client/`)

The client is built using **Next.js 14 (App Router)**, **Ant Design (antd)**, **Tailwind CSS**, and **Redux Toolkit**:

```
client/
├── package.json             # Frontend dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── next.config.mjs          # Next.js configuration
├── public/                  # Static assets (images, logos, icons)
└── src/
    ├── app/                 # Next.js App Router root
    │   ├── (DashboardLayout)/# Route group with protected role dashboards
    │   │   ├── admin/       # Admin portals (doctors, receptionists, patients, appointments)
    │   │   ├── doctor/      # Doctor portals (appointments, schedules, prescriptions)
    │   │   ├── receptionist/# Receptionist portals (schedules, doctors, billing)
    │   │   └── patient/     # Patient portals (appointments, prescriptions, invoices)
    │   ├── login/           # Authentication login page
    │   ├── register/        # Patient self-registration page
    │   ├── forgot-password/ # Password reset request page
    │   ├── reset-password/  # Password reset confirmation page
    │   ├── payment/         # SSLCommerz callback & status feedback pages
    │   ├── layout.tsx       # Root Next.js HTML layout
    │   └── page.tsx         # Public landing / Home page
    ├── components/          # Reusable UI component library
    │   ├── Dashboard/       # Sidebar, Header, Breadcrumbs, Profile Drawer
    │   ├── Forms/           # Reusable form controls & validation wrappers
    │   ├── UI/              # Buttons, Modals, Badges, DataTables
    │   └── Shared/          # Navbar, Footer, PageHeader
    ├── redux/               # Global state management
    │   ├── api/             # RTK Query API slice definitions
    │   ├── hooks.ts         # Typed useDispatch & useSelector hooks
    │   └── store.ts         # Redux store configuration
    ├── services/            # Client auth services, token storage & cookies
    ├── types/               # Global TypeScript interface definitions
    └── utils/               # Formatting, date helpers, local storage utilities
```

---

## 3. Backend Structure (`server/`)

The server follows a **Modular Layered Architecture** with strict layer decoupling:

```
server/
├── package.json             # Backend dependencies, scripts & overrides
├── tsconfig.json            # TypeScript compiler configuration
├── prisma/
│   ├── schema.prisma        # Database schema definitions & relations
│   ├── migrations/          # Version-controlled SQL migration history
│   └── seed.ts              # Initial database seeding script
└── src/
    ├── server.ts            # Server bootstrap, HTTP listener & graceful shutdown
    ├── app.ts               # Express application initialization, CORS & middlewares
    └── app/
        ├── config/          # Environment variable parser & config object
        ├── enums/           # Domain enums (UserRole, UserStatus, etc.)
        ├── errors/          # Custom ApiError, Zod & Prisma error normalizers
        ├── helpers/         # JWT helpers, pagination helpers, calculation utils
        ├── interfaces/      # TypeScript interfaces for request context & errors
        ├── middlewares/     # Auth, Zod validator, Global error handler
        ├── routes/          # Centralized route aggregator (routes/index.ts)
        ├── shared/          # Shared singletons (prisma client, logger)
        └── modules/         # Domain-driven feature modules
            ├── admin/       # Admin profile, analytics & management
            ├── appointment/ # Appointment booking, status transitions & queries
            ├── auth/        # Login, refresh token, password reset & emails
            ├── doctor/      # Doctor profile, specialties & search
            ├── doctorSchedule/ # Doctor time-slot availability
            ├── meta/        # Dashboard metrics & statistical metadata
            ├── patient/     # Patient profile & history
            ├── payment/     # SSLCommerz integration & manual verification
            ├── prescription/# Clinical prescription generation
            ├── receptionist/# Receptionist staff management
            ├── review/      # Patient doctor ratings & reviews
            ├── schedule/    # Time slot management
            ├── specialties/ # Clinical specialty management
            ├── SSL/         # Low-level SSLCommerz REST client
            └── user/        # User creation, password hashing & profile retrieval
```

---

## 4. Module Internal Conventions

Each module inside `server/src/app/modules/<module-name>/` consistently exposes:
- `<module>.interface.ts`: Module-specific data contracts.
- `<module>.validation.ts`: Zod validation schemas for incoming requests.
- `<module>.controller.ts`: HTTP request handlers invoking services and calling `sendResponse`.
- `<module>.service.ts`: Business logic, database transactions, and data mutations.
- `<module>.routes.ts`: Express router with route-level `auth()` and `validateRequest()` middlewares.
