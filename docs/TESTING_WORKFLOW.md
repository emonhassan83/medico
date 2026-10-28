# Medico - Testing Workflow & Quality Assurance

This document details the testing methodology, API testing strategies, verification checklists, and quality assurance workflows for **Medico**.

---

## 1. Quality Assurance Strategy

Medico follows a multi-tier testing strategy:
- **Static Analysis**: TypeScript strict type-checking (`tsc --noEmit`), ESLint syntax validation, Prettier formatting verification.
- **Dependency Audit**: `npm audit` monitoring and vulnerability remediation across client and server.
- **API Functional Testing**: Testing route authorization, status codes, Zod validation, and error envelopes using Postman / cURL.
- **End-to-End User Journeys**: Validating critical user flows (e.g. Appointment booking -> Payment gateway -> Doctor consultation -> Prescription issuance).

---

## 2. Static Code Verification

Run before every commit or pull request:

```bash
# In server/
cd server
npx tsc --noEmit
npm run lint:check

# In client/
cd ../client
npm run build
npm run lint
```

---

## 3. Core API Test Scenarios (cURL Examples)

### Scenario A: Authentication & Token Verification
```bash
# 1. Login as Admin
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@medico.com","password":"Admin@1234"}'

# Expected: 200 OK with accessToken and Set-Cookie: refreshToken
```

### Scenario B: Route RBAC Guard Verification
```bash
# 2. Access Admin route without token
curl -X GET http://localhost:5000/api/v1/admin

# Expected: 401 Unauthorized ("You are not authorized")

# 3. Access Admin route with Patient token
curl -X GET http://localhost:5000/api/v1/admin \
  -H "Authorization: Bearer <PATIENT_ACCESS_TOKEN>"

# Expected: 403 Forbidden ("Forbidden")
```

### Scenario C: Password Reset IDOR Protection
```bash
# 4. Attempt to reset password of User B using User A's token
curl -X POST http://localhost:5000/api/v1/auth/reset-password \
  -H "Authorization: Bearer <USER_A_RESET_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"id":"<USER_B_ID>","newPassword":"NewSecret@1234"}'

# Expected: 401 Unauthorized ("Invalid or unauthorized reset token!")
```

### Scenario D: Payment Verification Access Guard
```bash
# 5. Attempt manual payment validation without Admin/Receptionist privileges
curl -X PATCH http://localhost:5000/api/v1/payment/validate/<APPOINTMENT_ID>

# Expected: 401 Unauthorized ("You are not authorized")
```

---

## 4. End-to-End QA Acceptance Checklist

- [ ] **Admin Onboarding**: Admin can log in, create a Doctor, create a Receptionist, and assign specialties.
- [ ] **Slot Management**: Receptionist/Doctor can define available calendar schedules.
- [ ] **Patient Booking**: Patient can view available doctors by specialty, select a slot, and initiate booking.
- [ ] **Payment Lifecycle**: Patient can redirect to SSLCommerz sandbox, complete test payment, and receive confirmation.
- [ ] **Clinical Prescription**: Doctor can open appointment, write medication details via rich text editor, and issue prescription.
- [ ] **Patient Review**: Patient can leave ratings and text feedback after consultation.
