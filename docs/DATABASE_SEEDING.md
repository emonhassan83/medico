# Medico - Database Schema & Seeding Guide

This guide details the PostgreSQL database schema, Prisma migrations, and database seeding strategy for **Medico**.

---

## 1. Schema Overview

Medico uses **Prisma ORM** with PostgreSQL. The schema is organized into logical domains:

1. **User & Identity**: `User`, `Admin`, `Doctor`, `Receptionist`, `Patient`.
2. **Clinical Specializations**: `Specialties`, `DoctorSpecialties`.
3. **Availability & Scheduling**: `Schedule`, `DoctorSchedules`.
4. **Appointments & Clinical Workflow**: `Appointment`, `Prescription`, `Review`.
5. **Billing & Transactions**: `Payment`.

---

## 2. Running Migrations

### Apply Migrations Locally:
```bash
cd server

# Create and apply new migrations based on schema.prisma changes
npx prisma migrate dev --name <migration-name>

# Regenerate Prisma Client
npx prisma generate
```

### Apply Migrations in Production:
```bash
npx prisma migrate deploy
```

### Reset Database (Development Only):
```bash
npx prisma migrate reset
```

---

## 3. Database Seeding

The seeding script populates initial data:
- Super Admin account with default credentials.
- Clinical specialties (Cardiology, Neurology, Pediatrics, Orthopedics, Dermatology, etc.).
- Sample Doctors, Receptionists, and Patients.

### Execute Seeding:
```bash
cd server
npm run seed
```

### Seed Script Structure (`server/prisma/seed.ts`):
```typescript
import { PrismaClient, UserRole, UserStatus, Gender } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@1234', 12);

  // 1. Seed Super Admin
  const adminEmail = 'admin@medico.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          role: UserRole.ADMIN,
          needPasswordChange: false,
          status: UserStatus.ACTIVE,
        }
      });

      await tx.admin.create({
        data: {
          email: user.email,
          firstName: 'Super',
          lastName: 'Admin',
          contactNumber: '+8801700000000',
        }
      });
    });
    console.log('Seeded default Admin: admin@medico.com');
  }

  // 2. Seed Medical Specialties
  const specialties = [
    { title: 'Cardiology', icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png' },
    { title: 'Neurology', icon: 'https://cdn-icons-png.flaticon.com/512/3209/3209072.png' },
    { title: 'Orthopedics', icon: 'https://cdn-icons-png.flaticon.com/512/2864/2864402.png' },
    { title: 'Pediatrics', icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png' },
    { title: 'Dermatology', icon: 'https://cdn-icons-png.flaticon.com/512/4882/4882672.png' },
  ];

  for (const item of specialties) {
    const exists = await prisma.specialties.findFirst({
      where: { title: item.title }
    });
    if (!exists) {
      await prisma.specialties.create({ data: item });
    }
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 4. Prisma Studio

To inspect and manage database records interactively through a web UI:

```bash
cd server
npx prisma studio
```
Access Prisma Studio at `http://localhost:5555`.
