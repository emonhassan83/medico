# Petfinder - System Architecture & Engineering Blueprint

This document specifies the software architecture, data modeling, component boundaries, asynchronous flows, and design patterns governing the **Petfinder** pet adoption and rescue management system.

---

## 1. High-Level System Architecture

Petfinder is architected as a decoupled, multi-tier system comprising a **Next.js 16** frontend (App Router, Turbopack, Material UI, Redux Toolkit), an **Express.js TypeScript** REST API server, **Prisma ORM**, and a **PostgreSQL** relational database.

```mermaid
graph TD
    Client["Client: Next.js 16 (App Router, Redux Toolkit, MUI)"]
    Server["API Server: Node.js / Express.js (TypeScript)"]
    DB[("PostgreSQL Database (Prisma ORM)")]
    SMTP["Google SMTP Service (Nodemailer)"]

    Client -->|HTTPS / REST API JSON| Server
    Server -->|Type-safe SQL Queries via Prisma| DB
    Server -->|Password Reset & Alerts| SMTP
```

---

## 2. Layered Application Architecture (Server)

The backend follows a modular, layered design pattern enforcing strict separation of concerns across each incoming request:

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Router as Express Router (/api/v1)
    participant Auth as Auth & RBAC Middleware
    participant Validator as Zod Request Validator
    participant Controller as Express Controller
    participant Service as Business Service
    participant Prisma as Prisma Client
    participant DB as PostgreSQL Database

    Client->>Router: HTTP Request (Method, Route, Headers)
    Router->>Auth: Validate JWT & User Role
    Auth->>Validator: Validate Request Body / Params (Zod)
    Validator->>Controller: Route to Controller Handler
    Controller->>Service: Call Business Logic with Sanitized Payload
    Service->>Prisma: Query / Mutation Transaction
    Prisma->>DB: Execute SQL Query
    DB-->>Prisma: Return Result Set
    Prisma-->>Service: Hydrated Prisma Model
    Service-->>Controller: Return Formatted Result
    Controller-->>Client: Standardized JSON Response (sendResponse)
```

### Layer Responsibilities

1. **Routing Layer (`src/app/routes/`)**: Registers modular route groups under the `/api/v1` namespace.
2. **Middleware Layer (`src/app/middlewares/`)**:
   - `auth.ts`: Decodes and validates JWT bearer tokens, checks token validity, and enforces user role constraints.
   - `validateRequest.ts`: Intercepts and parses incoming request payloads against Zod validation schemas.
   - `globalErrorHandler.ts`: Catches exceptions, maps Prisma and Zod errors to consistent HTTP responses, and handles environment-specific error stack formatting.
3. **Controller Layer (`*.controller.ts`)**:
   - Extracts and unwraps query parameters, route parameters, request bodies, and authenticated user credentials.
   - Delegates business execution to the corresponding service module.
   - Envelopes output using `sendResponse()`.
4. **Service Layer (`*.service.ts`)**:
   - Encapsulates business logic, data calculations, authorization checks, and third-party integrations (e.g. Nodemailer).
   - Coordinates database transactions (`prisma.$transaction`) to guarantee atomicity.
5. **Data Access Layer (`prisma/schema.prisma` & `src/app/shared/prisma.ts`)**:
   - Provides a singleton Prisma client instance across the application lifecycle.
   - Exposes strongly typed entity models, relations, cascades, and enum definitions.

---

## 3. Database Entity Relationship Model

The relational PostgreSQL schema links users, pet listings, adoption requests, blogs, comments, and donations:

```mermaid
erDiagram
    User ||--o{ Pet : "publishes/manages"
    User ||--o{ AdoptionRequest : "submits"
    Pet ||--o{ AdoptionRequest : "applied for"
    User ||--o{ Blog : "authors"
    Blog ||--o{ Comment : "contains"
    User ||--o{ Comment : "writes"
    User ||--o{ Donation : "contributes"

    User {
        String id PK
        String name
        String email UK
        String password
        UserRole role
        String contactNumber
        String address
        Gender gender
        UserStatus status
        Boolean isDeleted
        DateTime createdAt
        DateTime updatedAt
    }

    Pet {
        String id PK
        String name
        String image
        String species
        String breed
        String color
        Int age
        Gender gender
        String size
        String location
        String description
        String temperament
        String medicalHistory
        String adoptionRequirements
        String healthStatus
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }

    AdoptionRequest {
        String id PK
        String userId FK
        String petId FK
        RequestStatus status
        String petsHousehold
        String petOwnershipExperience
        OpinionOption petsNeutered
        OpinionOption secureOutdoorArea
        AnimelSleep animalSleep
        OpinionOption animalAlonePeriodsTime
        String detailsSupport
        DateTime createdAt
        DateTime updatedAt
    }

    Blog {
        String id PK
        String title
        String description
        String image
        String reference
        String[] tags
        String category
        BlogStatus status
        Int like
        String userId FK
        DateTime publishedAt
        DateTime updatedAt
    }

    Comment {
        String id PK
        String content
        String blogId FK
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Donation {
        String id PK
        Float amount
        String donorName
        String donorEmail
        String message
        String userId FK
        DateTime donatedAt
        DateTime updatedAt
    }
```

---

## 4. Key Architectural Subsystems

### A. Adoption Request Lifecycle & State Machine

The adoption workflow enforces strict validation and state transitions:

```mermaid
stateDiagram-v2
    [*] --> PENDING : User Submits Questionnaire
    PENDING --> APPROVED : Admin Approves Application
    PENDING --> REJECTED : Admin Rejects Application
    PENDING --> PENDING : User Updates Answers
    APPROVED --> [*]
    REJECTED --> [*]
```

1. **Submission**: Authenticated users submit a comprehensive application assessing living conditions, household pets, outdoor security, and daily solitude periods.
2. **Review & Triage**: Shelter staff (`ADMIN` / `SUPER_ADMIN`) review submissions through `/api/v1/adoption-requests`.
3. **Status Update**: Applications transition from `PENDING` to either `APPROVED` or `REJECTED` via a dedicated patch endpoint (`PATCH /api/v1/adoption-requests/:requestId/status`).

---

### B. Role-Based Access Control (RBAC) Matrix

Petfinder maintains three distinct hierarchical roles:

| Module / Action | `USER` | `ADMIN` | `SUPER_ADMIN` |
| :--- | :---: | :---: | :---: |
| Browse & Search Pets | ✅ | ✅ | ✅ |
| Submit Adoption Application | ✅ | ❌ | ❌ |
| Create / Edit / Delete Pet Listing | ❌ | ✅ | ✅ |
| Review / Approve Adoption Requests | ❌ | ✅ | ✅ |
| Publish / Manage Blogs | ❌ | ✅ | ✅ |
| Comment on Blogs | ✅ | ✅ | ✅ |
| Make Donations | ✅ | ✅ | ✅ |
| View Platform Analytics (`/meta`) | Personal | Shelter-wide | Full Platform |
| Promote / Demote Roles | ❌ | ✅ | ✅ |
| Soft-Delete User Accounts | ❌ | ❌ | ✅ |

---

### C. Authentication & Session Security Flow

1. **Access Token Generation**: Upon successful authentication via `POST /api/v1/auth/login`, an HMAC SHA-256 JWT access token is signed with `JWT_SECRET` (default lifespan: 7 days) and returned in the JSON payload.
2. **Refresh Token Rotation**: A separate long-lived refresh token signed with `REFRESH_TOKEN_SECRET` is placed in an `httpOnly`, `sameSite`, and secure cookie (`refreshToken`).
3. **Password Recovery Workflow**:
   - User requests reset via `POST /api/v1/auth/forgot-password`.
   - The server verifies user status, generates a short-lived token (15m expiry), constructs a secure link, and dispatches an HTML email via Google SMTP (Nodemailer).
   - User verifies token and submits new credentials via `POST /api/v1/auth/reset-password`.

---

### D. Analytics & Meta Aggregator (`/meta`)

The `/api/v1/meta` route provides role-aware business intelligence:
- **`SUPER_ADMIN` & `ADMIN`**: Computes total registered users, active pet listings, adoption conversion ratios (pending vs. approved), and gross donation volume.
- **`USER`**: Delivers a personalized summary of submitted adoption applications, active requests, and contribution history.
