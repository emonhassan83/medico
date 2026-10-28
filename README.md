# Medico - Healthcare Management Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)](https://ant.design/)

**Medico** is an enterprise-grade healthcare management and clinical operations system designed to streamline workflows in modern medical centers. It connects four core user personas—**Admin**, **Receptionist**, **Doctor**, and **Patient**—delivering specialized capabilities for account governance, doctor scheduling, appointment booking, clinical prescription issuance, invoicing, and secure payment processing.

---

## 📸 System Preview

![HomePage Screenshot](https://i.ibb.co.com/XWH0ws4/Screenshot-2024-12-11-135659.png)

---

## 🌟 Role-Based Features

### 👑 Admin
- **Staff Governance**: Provision, manage, and toggle active status for Receptionists, Doctors, and Patients.
- **Clinical Specialties**: Create and curate medical departments and doctor specializations.
- **Global Appointments**: Oversee all hospital appointments with state transition controls.
- **Financial Analytics**: Review hospital-wide billing transactions and revenue streams.

### 📋 Receptionist
- **Calendar & Appointment Hub**: View appointments dynamically mapped across a calendar grid.
- **Doctor Availability Scheduling**: Create and publish bookable calendar slots for medical specialists.
- **Patient Management**: Onboard walk-in patients and manage their demographic records.
- **Billing & Invoices**: View invoices and perform manual payment verification for cash/offline patients.

### 🩺 Doctor
- **Consultation Calendar**: Track personal appointment appointments filtered by date and status.
- **Schedule Customization**: Create customized availability slots for patient consultations.
- **Patient Records**: Inspect patient histories and manage profile updates during visits.
- **Prescription System**: Issue rich-text digital prescriptions with dosages, medicines, and clinical advice.
- **Doctor Invoices**: Review payment statuses associated with completed consultations.

### 🏥 Patient
- **Doctor Discovery**: Search specialists by clinical department, name, and availability.
- **Appointment Booking**: Select available time slots and schedule consultations in real-time.
- **Online Payment**: Pay consultation fees through **SSLCommerz** gateway with instant invoice generation.
- **Prescription Hub**: Access and print digital prescriptions issued by consulting doctors.
- **Consultation Reviews**: Rate and review doctors based on medical experience.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Ant Design 5 (antd), Tailwind CSS, Redux Toolkit (RTK Query), FullCalendar, React Quill, Sonner |
| **Backend** | Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL |
| **Authentication** | JWT (JSON Web Tokens), HttpOnly Cookies, Bcrypt Password Hashing, RBAC Middleware |
| **Integrations** | SSLCommerz Payment Gateway, Google SMTP (Nodemailer) |
| **Validation & Error** | Zod Schema Validation, Centralized Global Error Handler |

---

## 📚 Technical Documentation

Comprehensive engineering documentation is available in the [`docs/`](./docs/) directory:

- 📐 [**System Architecture**](./docs/ARCHITECTURE.md) - Layered system design, sequence diagrams & ERD.
- 🔐 [**Authentication & RBAC**](./docs/AUTHENTICATION.md) - JWT lifecycle, route guards & IDOR prevention.
- 📡 [**API Guidelines**](./docs/API_GUIDELINES.md) - REST conventions, response/error schemas & endpoints.
- 🗄️ [**Database & Seeding**](./docs/DATABASE_SEEDING.md) - Prisma migrations, schema models & seeding steps.
- 🚀 [**Deployment Guide**](./docs/DEPLOYMENT.md) - Production topology, Vercel & Docker instructions.
- 📁 [**Folder Structure**](./docs/FOLDER_STRUCTURE.md) - Complete monorepo layout & conventions.
- 💻 [**Local Development**](./docs/development.md) - Setup guide, prerequisites & environment variables.
- 🧪 [**Testing Workflow**](./docs/TESTING_WORKFLOW.md) - Quality assurance, security checks & cURL tests.
- 📏 [**Coding Rules**](./docs/CODING_RULES.md) - TypeScript conventions, controller/service patterns.
- 🤖 [**AI System Prompt**](./docs/AI_SYSTEM_PROMPT.md) - Context and system instructions for AI assistants.

---

## 🚀 Quick Start Guide

### 1. Clone Repository
```bash
git clone https://github.com/emonhassan83/medico.git
cd medico
```

### 2. Configure & Run Backend (`server/`)
```bash
cd server
npm install

# Setup environment variables
cp .env.example .env   # (or create .env following docs/development.md)

# Run Prisma database migration and generate client
npx prisma migrate dev --name init
npx prisma generate

# Seed initial admin and specialties
npm run seed

# Start server
npm run dev
```
> Server runs on: `http://localhost:5000` (Healthcheck: `http://localhost:5000/up`)

### 3. Configure & Run Frontend (`client/`)
```bash
cd ../client
npm install

# Setup environment variables
cp .env.example .env.local  # Set NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Start frontend development server
npm run dev
```
> Frontend runs on: `http://localhost:3000`

---

## 🔑 Default Credentials (After Seeding)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@medico.com` | `Admin@1234` |

---

## 🛡️ Security Hardening

- **IDOR Safeguards**: Protected password reset and resource modification endpoints verifying token subject against targeted identity.
- **Route Guards**: Strict Role-Based Access Control (`auth(...)`) on all protected routes.
- **CORS Whitelist**: Explicit origin verification to prevent unauthorized cross-origin requests.
- **Dependency Health**: Audited and patched transitive dependencies with package overrides.

---

## 👥 Contributors

1. **Arafat Dayan**: Team Leader & Frontend Developer
2. **Emon Hassan Mirdha**: Team-Co Leader, Full Stack Developer & GitHub Manager
3. **Mohammad Shahansha**: Full Stack Developer
4. **Milon Ahamed Shuvo**: Frontend Developer

---

## 📄 License & Links

- **Frontend Live URL**: [https://medico-client-tau.vercel.app/](https://medico-client-tau.vercel.app/)
- **License**: ISC