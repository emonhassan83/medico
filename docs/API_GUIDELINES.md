# Petfinder - API Design Guidelines & Route Specification

This document defines the RESTful API conventions, request/response payload contracts, error handling schemas, HTTP status codes, query filtering, and exhaustive route specifications for the **Petfinder** backend.

---

## 1. Base URL & API Versioning

All API endpoints follow semantic versioning prefixed under `/api/v1`:

```http
https://api.yourdomain.com/api/v1/<resource>
```

Local development base URL:
```http
http://localhost:5000/api/v1
```

All requests requiring authentication must include the JWT bearer token in the `Authorization` header:
```http
Authorization: <JWT_ACCESS_TOKEN>
```

---

## 2. Standardized Response Envelope

All API endpoints return JSON payloads enveloped consistently via the `sendResponse` utility function:

### List / Paginated Response:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Pets retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 35
  },
  "data": [
    {
      "id": "e8a24c29-38b4-4e20-8041-3838ebef4bc1",
      "name": "Buddy",
      "species": "Dog",
      "breed": "Golden Retriever",
      "color": "Golden",
      "age": 2,
      "gender": "Male",
      "size": "Large",
      "location": "Seattle, WA",
      "description": "Friendly, energetic, and loves outdoor play.",
      "temperament": "Gentle, active",
      "medicalHistory": "Fully vaccinated, neutered",
      "adoptionRequirements": "Fenced yard, active household",
      "healthStatus": "Healthy",
      "createdAt": "2026-10-15T10:00:00.000Z",
      "updatedAt": "2026-10-15T10:00:00.000Z"
    }
  ]
}
```

### Single Entity Response:
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Pet listed successfully",
  "data": {
    "id": "e8a24c29-38b4-4e20-8041-3838ebef4bc1",
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "createdAt": "2026-10-15T10:00:00.000Z"
  }
}
```

---

## 3. Standardized Error Handling

All unhandled errors and domain exceptions are intercepted by `globalErrorHandler` and returned in a unified format:

```json
{
  "success": false,
  "message": "Validation Error",
  "errorMessages": [
    {
      "path": "email",
      "message": "Invalid email address format"
    }
  ],
  "stack": "Error: ... (included only in development environment)"
}
```

### Standard HTTP Status Codes

| Code | Constant | Meaning & Usage |
| :--- | :--- | :--- |
| **`200 OK`** | `httpStatus.OK` | Successful GET, PUT, or PATCH request |
| **`201 Created`** | `httpStatus.CREATED` | Resource successfully created (POST) |
| **`400 Bad Request`** | `httpStatus.BAD_REQUEST` | Validation error, malformed input payload |
| **`401 Unauthorized`** | `httpStatus.UNAUTHORIZED` | Missing, expired, or invalid JWT token |
| **`403 Forbidden`** | `httpStatus.FORBIDDEN` | Insufficient role permissions for target endpoint |
| **`404 Not Found`** | `httpStatus.NOT_FOUND` | Resource or endpoint path does not exist |
| **`409 Conflict`** | `httpStatus.CONFLICT` | Unique key violation (e.g. email already exists) |
| **`500 Internal Server Error`** | `httpStatus.INTERNAL_SERVER_ERROR` | Unhandled server exception |

---

## 4. Query Filtering, Searching & Pagination

List endpoints support standardized query parameters for pagination, dynamic sorting, and fuzzy search:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | `number` | `1` | 1-indexed page number |
| `limit` | `number` | `10` | Records per page |
| `sortBy` | `string` | `createdAt` | Field name to sort by |
| `sortOrder` | `string` | `desc` | Direction (`asc` or `desc`) |
| `searchTerm`| `string` | `""` | Partial text matching across name, breed, location, etc. |

### Example Request:
```http
GET /api/v1/pets?searchTerm=retriever&species=Dog&size=Large&page=1&limit=10&sortBy=age&sortOrder=asc
```

---

## 5. Complete Endpoint Catalog

### 🔐 1. Authentication (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Public | Authenticates credentials and returns access token + refresh token cookie |
| `POST` | `/api/v1/auth/refresh-token` | Public (Cookie) | Issues fresh access token using HTTP-only refresh token cookie |
| `POST` | `/api/v1/auth/change-password` | Authenticated | Updates current user password (`USER`, `ADMIN`, `SUPER_ADMIN`) |
| `POST` | `/api/v1/auth/forgot-password` | Public | Sends password reset token email via Nodemailer |
| `POST` | `/api/v1/auth/reset-password` | Public (Token) | Resets account password using valid reset token |

---

### 👤 2. User Management (`/api/v1/user`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/user/register` | Public | Registers a new adopter account |
| `GET` | `/api/v1/user/users` | `ADMIN`, `SUPER_ADMIN` | Retrieves all registered users with pagination & search |
| `GET` | `/api/v1/user/profile` | Authenticated | Retrieves current authenticated user's profile |
| `PUT` | `/api/v1/user/profile` | Authenticated | Updates current user's profile details |
| `PATCH`| `/api/v1/user/:id/change-role` | `ADMIN`, `SUPER_ADMIN` | Updates target user role (`USER`, `ADMIN`, `SUPER_ADMIN`) |
| `PATCH`| `/api/v1/user/:id/status` | `ADMIN`, `SUPER_ADMIN` | Toggles user status (`ACTIVE`, `BLOCKED`, `DELETED`) |
| `DELETE`| `/api/v1/user/soft-deleted/:id`| `SUPER_ADMIN` | Performs soft-deletion marking `isDeleted = true` |

---

### 🐾 3. Pets (`/api/v1/pets`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/pets` | `ADMIN`, `SUPER_ADMIN` | Creates a new pet adoption listing |
| `GET` | `/api/v1/pets` | Public | Lists all pets with filtering, search, and pagination |
| `GET` | `/api/v1/pets/my-pets` | `ADMIN`, `SUPER_ADMIN` | Retrieves pets created by current admin/shelter staff |
| `GET` | `/api/v1/pets/:petId` | Public | Retrieves detailed information for a specific pet |
| `PUT` | `/api/v1/pets/:petId` | `ADMIN`, `SUPER_ADMIN` | Updates listing details of an existing pet |
| `DELETE`| `/api/v1/pets/:petId` | `ADMIN`, `SUPER_ADMIN` | Removes a pet listing |

---

### 📋 4. Adoption Requests (`/api/v1/adoption-requests`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/adoption-requests` | `USER` | Submits an adoption questionnaire application for a pet |
| `GET` | `/api/v1/adoption-requests` | `ADMIN`, `SUPER_ADMIN` | Lists all submitted adoption requests across all pets |
| `GET` | `/api/v1/adoption-requests/my-adoption` | `USER` | Retrieves current user's submitted adoption applications |
| `PUT` | `/api/v1/adoption-requests/:requestId` | `USER` | Updates application answers for a pending request |
| `PATCH`| `/api/v1/adoption-requests/:requestId/status` | `ADMIN`, `SUPER_ADMIN` | Approves or rejects request (`PENDING`, `APPROVED`, `REJECTED`) |
| `DELETE`| `/api/v1/adoption-requests/:requestId` | `ADMIN`, `SUPER_ADMIN` | Deletes an adoption application |

---

### 📰 5. Community Blog (`/api/v1/blog`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/blog` | `ADMIN`, `SUPER_ADMIN` | Publishes or drafts a new educational article |
| `GET` | `/api/v1/blog` | Public | Lists published blogs with categories and tags |
| `GET` | `/api/v1/blog/:id` | Public | Retrieves a specific blog post with associated comments |
| `PATCH`| `/api/v1/blog/:id` | `ADMIN`, `SUPER_ADMIN` | Updates blog content, category, tags, or publication status |
| `DELETE`| `/api/v1/blog/:id` | `ADMIN`, `SUPER_ADMIN` | Removes a blog post |

---

### 💬 6. Comments (`/api/v1/comment`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/comment` | Authenticated | Adds a comment to a blog post |
| `GET` | `/api/v1/comment/:blogId` | Public | Retrieves all comments for a specific blog post |
| `DELETE`| `/api/v1/comment/:id` | Authenticated / Admin | Deletes an individual comment |

---

### 💝 7. Donations (`/api/v1/donate`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/donate` | `USER` | Records a philanthropic donation with optional note |
| `GET` | `/api/v1/donate` | Public | Lists all public donations |
| `GET` | `/api/v1/donate/user-donations` | Authenticated | Retrieves current authenticated user's donations |
| `GET` | `/api/v1/donate/:donateId` | Authenticated | Retrieves a specific donation record |
| `PUT` | `/api/v1/donate/:donateId` | `ADMIN`, `SUPER_ADMIN` | Updates a donation entry |
| `DELETE`| `/api/v1/donate/:donateId` | `ADMIN`, `SUPER_ADMIN` | Removes a donation entry |

---

### 📊 8. Dashboard Meta & Analytics (`/api/v1/meta`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/meta` | Authenticated | Returns role-specific KPI metrics: total pets, pending adoptions, user counts, and donation totals |
