# Medico - Coding Standards & Engineering Rules

This document specifies the TypeScript guidelines, architecture constraints, error-handling conventions, and security best practices for all contributors to **Medico**.

---

## 1. General Principles

1. **Type Safety Over Convenience**: Avoid `any` types. Every request, response, and database payload must have explicit TypeScript typing.
2. **Modular Architecture**: Never place business logic inside controllers or routing files. Controllers receive requests and call services; services perform computations and database operations.
3. **Fail-Fast Validation**: Every endpoint accepting client data must validate payloads with **Zod** before hitting controllers.
4. **Defensive Security**:
   - Always hash passwords with bcrypt before persistence.
   - Always verify token subject identity against URL parameters (mitigate IDOR).
   - Use parameterized Prisma queries (avoids SQL injection).
   - Sanitize rich-text HTML inputs before rendering.

---

## 2. Server Conventions

### Controller Pattern:
```typescript
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { DoctorService } from './doctor.service';

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.getSingleDoctor(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor retrieved successfully',
    data: result,
  });
});
```

### Service Pattern:
```typescript
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const getSingleDoctor = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      specialties: {
        include: { specialties: true }
      }
    }
  });

  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }

  return doctor;
};
```

---

## 3. Client Conventions (Next.js & React)

1. **Server vs. Client Components**:
   - Keep page headers and static UI as Server Components.
   - Use `'use client'` only on interactive components (forms, calendars, drawers, modal states).
2. **Form Management**:
   - Use `react-hook-form` paired with `@hookform/resolvers/zod` for type-safe form validation.
3. **API Integration**:
   - Use Redux Toolkit (RTK Query) for server state caching, pagination, and invalidation.
   - Centralize token retrieval and cookie injection within the base API slice.
4. **Notification Feedback**:
   - Use `sonner` or Ant Design `message`/`notification` to give clear, accessible feedback on every asynchronous mutation.

---

## 4. Linting & Formatting

```bash
# Check formatting
npm run prettier:check

# Fix formatting
npm run prettier:fix

# Check ESLint rules
npm run lint:check

# Fix auto-fixable lint issues
npm run lint:fix
```

- Enforce 2-space indentation.
- Enforce single quotes for strings and trailing commas where valid in ES5.
- Semicolons are required.
