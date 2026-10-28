import { z } from 'zod';

// Enums mapped exactly from Prisma
const GenderEnum = z.enum(['MALE', 'FEMALE', 'UNKNOWN']);
const BloodGroupEnum = z.enum([
  'O_POSITIVE',
  'O_NEGATIVE',
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
]);
const MaritalStatusEnum = z.enum(['MARRIED', 'UNMARRIED']);

// Schema for Medical Report
const MedicalReportSchema = z.object({
  patientId: z.string().uuid().optional(),
  reportName: z.string(),
  reportLink: z.string().url()
});

// Schema for Patient Health Data
const PatientHealthDataSchema = z.object({
  patientId: z.string().uuid().optional(),
  dateOfBirth: z.union([z.string(), z.date()]),
  gender: GenderEnum,
  bloodGroup: BloodGroupEnum,
  hasAllergies: z.boolean().default(false),
  hasDiabetes: z.boolean().default(false),
  height: z.string().optional(),
  weight: z.string().optional(),
  diet: z.string().optional(),
  pulse: z.string().optional(),
  smokingStatus: z.boolean().default(false),
  dietaryPreferences: z.string().optional(),
  pregnancyStatus: z.boolean().default(false),
  mentalHealthHistory: z.string().optional(),
  immunizationStatus: z.boolean().default(false),
  hasPastSurgeries: z.boolean().default(false),
  recentAnxiety: z.boolean().default(false),
  recentDepression: z.boolean().default(false),
  maritalStatus: MaritalStatusEnum
});

// Schema for Main Patient Data
const PatientSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  profilePhoto: z.string().url().optional(),
  contactNumber: z.string().regex(/^\+\d{10,15}$/),
  address: z.string().optional(),
  medicalReport: z.array(MedicalReportSchema).optional(),
  patientHealthData: PatientHealthDataSchema.optional(),
});

export const patientValidation = {
  PatientSchema
};
