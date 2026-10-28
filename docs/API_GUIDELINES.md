# Medico - API Design Guidelines & Standards

This document establishes the RESTful API conventions, request/response formats, error-handling conventions, status codes, and pagination standards for the **Medico** backend.

---

## 1. Base URL & Versioning

All API endpoints follow semantic versioning prefixed under `/api/v1`:

```http
https://api.medico.com/api/v1/<resource-name>
```

Local development base URL:
```http
http://localhost:5000/api/v1
```

---

## 2. Standardized Response Format

All API responses must follow a consistent JSON envelope implemented via the `sendResponse` helper:

### Success Response:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Resource retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45
  },
  "data": [ ... ]
}
```

### Single Entity Response:
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Doctor profile created successfully",
  "data": {
    "id": "c1f7b9e2-...",
    "email": "doctor@medico.com",
    "name": "Dr. Sarah Jenkins",
    "specialties": [ ... ]
  }
}
```

---

## 3. Standardized Error Format

All exceptions handled through `globalErrorHandler` return a unified payload structure:

```json
{
  "success": false,
  "message": "Validation Error",
  "errorMessages": [
    {
      "path": "email",
      "message": "Email must be a valid email address"
    }
  ],
  "stack": "Error: ... (only included in development environment)"
}
```

### HTTP Status Code Usage:
| Code | Constant | Usage |
| :--- | :--- | :--- |
| **`200 OK`** | `httpStatus.OK` | Successful GET, PUT, PATCH requests |
| **`201 Created`** | `httpStatus.CREATED` | Successful resource creation (POST) |
| **`400 Bad Request`** | `httpStatus.BAD_REQUEST` | Validation error, malformed input payload |
| **`401 Unauthorized`** | `httpStatus.UNAUTHORIZED` | Missing or invalid authentication token |
| **`403 Forbidden`** | `httpStatus.FORBIDDEN` | Authenticated user lacks required role permissions |
| **`404 Not Found`** | `httpStatus.NOT_FOUND` | Requested entity, route, or resource does not exist |
| **`409 Conflict`** | `httpStatus.CONFLICT` | Duplicate unique constraint violation (e.g. existing email) |
| **`500 Internal Error`** | `httpStatus.INTERNAL_SERVER_ERROR` | Unhandled server exceptions |

---

## 4. Query Filtering, Searching & Pagination

List endpoints (`GET /api/v1/doctor`, `GET /api/v1/patient`, etc.) support standardized query parameters:

### Common Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | integer | `1` | Current page number (1-indexed) |
| `limit` | integer | `10` | Number of items per page |
| `sortBy` | string | `createdAt` | Field name to sort results by |
| `sortOrder` | string (`asc` \| `desc`) | `desc` | Sorting direction |
| `searchTerm` | string | `""` | Partial text matching across searchable fields |

### Example Request:
```http
GET /api/v1/doctor?searchTerm=cardiology&page=1&limit=10&sortBy=experience&sortOrder=desc
```

---

## 5. Core API Routes Summary

### Authentication (`/api/v1/auth`)
- `POST /login` - Authenticate user & receive access/refresh tokens.
- `POST /refresh-token` - Exchange valid refresh token cookie for a new access token.
- `POST /change-password` - Update password for authenticated user.
- `POST /forgot-password` - Request password reset email.
- `POST /reset-password` - Reset password with verified token.

### User Management (`/api/v1/user`)
- `POST /create-admin` - Onboard new administrator (`ADMIN` only).
- `POST /create-doctor` - Register a new doctor profile (`ADMIN` only).
- `POST /create-patient` - Register a new patient account (Public / Receptionist).
- `POST /create-receptionist` - Register a new receptionist (`ADMIN` only).
- `GET /me` - Retrieve authenticated user profile with role details.

### Appointments (`/api/v1/appointment`)
- `POST /` - Book an appointment (`PATIENT`).
- `GET /` - List appointments with role-based filters.
- `PATCH /:id/status` - Update appointment status (`ADMIN`, `RECEPTIONIST`, `DOCTOR`).
- `DELETE /:id` - Cancel or delete appointment.

### Prescriptions (`/api/v1/prescription`)
- `POST /` - Issue medical prescription for an appointment (`DOCTOR`).
- `GET /` - List patient prescriptions.
- `GET /:id` - Get specific prescription details.

### Payments (`/api/v1/payment`)
- `POST /init-payment/:appointmentId` - Initialize SSLCommerz gateway session (`PATIENT`, `ADMIN`).
- `PATCH /validate/:appointmentId` - Manually verify offline payment (`ADMIN`, `RECEPTIONIST`).
- `POST /success` - SSLCommerz success callback.
- `POST /fail` - SSLCommerz failure callback.
- `POST /cancel` - SSLCommerz cancel callback.
