## MEDICO APP

 Medico is a comprehensive medical management system designed to streamline operations in a healthcare setting. It caters to four primary roles: Admin, Receptionist, Doctor, and Patient, offering tailored features for account management, appointment scheduling, prescription handling, invoicing, and department specialization. With a robust technology stack of TypeScript, Next.js, Ant Design, Node.js, and Prisma ORM, Medico ensures a secure, user-friendly, and efficient platform for managing healthcare workflows.

![HomePage Screenshot](https://i.ibb.co.com/XWH0ws4/Screenshot-2024-12-11-135659.png)

### Project Features

#### Admin
- **User Management:**
  - [x] Manage Receptionist
    - Create Receptionists Profile
    - Manage Receptionists functionality Update, Delete Profile 
 - [x] Manage Doctor
    - Create Doctors Profile
    - Manage Doctors functionality Update, Delete Profile 
 - [x] Manage Patient
    - Create Patients Profile
    - Manage Patients functionality Update, Delete Profile

- **Doctor Specialties Management:**
  - Create Doctor Specialties
  - Manage Doctor Specialties like functionality Update Specialties

- **Appointment Management:**
  - Manage Appointment functionality change status and delete Appointment

- **Transaction:**
  - Viewing all transactions from the appointments

#### Receptionist
- **Manage Appointment:**
  - Viewing all Appointment based on Calender Date 
  - Manage Appointment functionality change status and delete Appointment

- **Manage Schedule:**
  - Receptionist create available Schedule for Doctor
  - Manage Schedule functionality delete Schedule

- **Viewing Doctor:**
  - Viewing all doctor, pagination, search function and viewing details Doctor

- **Manage Patient:**
  - Create Patients Profile
  - Manage Patients functionality Update, Delete Profile

- **Viewing Prescription:**
  - Viewing all patients prescription, pagination and viewing details prescription

- **Viewing Invoices:**
  - Viewing all invoices from the appointments and viewing details all Invoices

#### Doctor
- **Manage Appointment:**
  - Viewing all Doctor Appointment based on Calender Date 
  - Manage Doctor Appointment functionality change status and delete Appointment

- **Manage Schedule:**
  - Doctor create available doctor Schedule for Patient
  - Manage Schedule functionality delete Schedule

- **Viewing Patient:**
  - Viewing all patient, pagination, search function and viewing details Patient
  - Manage Patients functionality Update Profile

- **Manage Prescription:**
  - Create Prescription for Patient
  - Manage Prescription functionality Update, Delete Prescription

- **Viewing Invoices:**
  - Viewing doctor appointment all invoices from the appointments and viewing details all Invoices

#### Patient
- **Manage Appointment:**
  - Viewing all Doctor Appointment based on Calender Date 
  - Create Patient Appointment and cancel patient Appointment

- **Viewing Doctor:**
  - Viewing all doctor, pagination, search function and viewing details Doctor

- **Viewing Prescription:**
  - Viewing patient all Prescriptions and view details Prescription

- **Viewing Invoices:**
  - Viewing patient appointment all invoices from the appointments and viewing details all Invoices
  - Viewing patient details invoice here patient can payment their pending payments

- **User common features:**
  - [x] User Registration or Create a User & Login a User
  - [x] Get User Information & Update their Information
  - [x] Viewing metadata information based on role

- **Project Backend Structure:**
  - [x] Create a Node.js Express project.
  - [x] Use TypeScript for development.
- [x] Database Integration:
  - [x] Set up Prisma with PostgreSQL.
- [x] Data Models:
  - [x] Define Prisma Schema table for User, Pet, buyerManagement, Adoption Request.
  - [x] Implement data types and validations based on the provided structure.
  - [x] Implement user authentication, authorization, and user-related information.
- [x] Validation:
  - [x] Use Zod for enforcing data validation rules.
- [x] Error Handling:
  - [x] Handling Global Error Handler
  - [x] Handle better way to error for using AppError.
  - [x] Handling mongoose error and duplicate error.

#### Project Contributors: 
1. **Arafat Dayan**: Team Leader & Frontend Developer
2. **Emon Hassan Mirdha**: Team-Co Leader & Full Stack Developer & GitHub Manager
3. **Mohammad Shahansha**: Full Stack Developer
4. **Milon Ahamed Shuvo**: Frontend Developer

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


### Project Setup Instruction
1. Clone the repo: 
```bash
   https://github.com/emonhassan83/medico.git
   ```
2. Go to App Directory:
```bash
   cd medico
   ```

#### Setup Frontend
1. Go to frontend directory:
```bash
   cd medico_client
   ```

2. Install Dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

#### Setup Backend

1. Go to backend directory:

 ```bash
   cd medico_server
   ```

2. Install Dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#### Frontend-deployed-url: https://medico-client-tau.vercel.app/
#### Project_documentation: https://docs.google.com/document/d/1EIPPaqCY52pIjBy-C_hwas9d2KSGZgCVM7IhZ5W2xEM/edit?usp=sharing