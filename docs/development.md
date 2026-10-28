# Medico - Local Development Setup Guide

This guide provides step-by-step instructions for getting the **Medico** full-stack development environment running locally.

---

## 1. Prerequisites

Ensure the following tools are installed on your machine:
- **Node.js**: v20+ or v22+ (`node -v`)
- **npm**: v10+ (`npm -v`)
- **PostgreSQL**: v14+ running locally, or a hosted cloud instance (Neon, Supabase, Aiven).
- **Git**: (`git --version`)

---

## 2. Clone & Initial Setup

```bash
# Clone the repository
git clone https://github.com/emonhassan83/medico.git
cd medico
```

---

## 3. Backend Setup (`server/`)

### 1. Navigate to Server Directory:
```bash
cd server
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Configure Environment Variables:
Create `.env` in `server/` with the following contents:
```bash
NODE_ENV=development
PORT=5000

# Client Application URL
CLIENT_URL=http://localhost:3000

# PostgreSQL Connection String
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/medico_db?schema=public"

# JWT Authentication
JWT_SECRET=super_secret_development_access_key_min_32_chars
EXPIRES_IN=1d
REFRESH_SECRET=super_secret_development_refresh_key_min_32_chars
REFRESH_EXPIRES_IN=365d
PASS_RESET_EXPIRATION_TIME=15m
RESET_LINK=http://localhost:3000/reset-password

# Email / Nodemailer Configuration
EMAIL=your-gmail@gmail.com
APP_PASS=your-gmail-app-password

# Bcrypt Salt Factor
SALT_ROUND=12

# SSLCommerz Sandbox Credentials
STORE_ID=your_store_id
STORE_PASSWD=your_store_passwd
SUCCESS_URL=http://localhost:5000/api/v1/payment/success
FAIL_URL=http://localhost:5000/api/v1/payment/fail
CANCEL_URL=http://localhost:5000/api/v1/payment/cancel
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
```

### 4. Apply Database Migrations & Seed:
```bash
# Push schema and generate Prisma client
npx prisma migrate dev --name init
npx prisma generate

# Populate initial admin and specialties
npm run seed
```

### 5. Start Development Server:
```bash
npm run dev
```
The server will boot on `http://localhost:5000`. Healthcheck endpoint: `http://localhost:5000/up`.

---

## 4. Frontend Setup (`client/`)

### 1. Navigate to Client Directory:
```bash
cd ../client
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Configure Environment Variables:
Create `.env.local` in `client/`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

### 4. Start Next.js Development Server:
```bash
npm run dev
```
The client application will start on `http://localhost:3000`.

---

## 5. Default Development Credentials

After running `npm run seed`:
- **Role**: `ADMIN`
- **Email**: `admin@medico.com`
- **Password**: `Admin@1234`
