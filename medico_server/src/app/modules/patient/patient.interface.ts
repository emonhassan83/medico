import { Gender, BloodGroup, MaritalStatus } from '@prisma/client';

export type IPatientFilterRequest = {
  searchTerm?: string;
  email?: string;
  contactNo?: string;
};

export type IMedicalReport = {
  reportName: string;
  reportLink: string;
};

export type IPatientHealthData = {
  dateOfBirth: Date | string;
  gender: Gender; // Prisma enum
  bloodGroup: BloodGroup; // Prisma enum
  hasAllergies: boolean;
  hasDiabetes: boolean;
  height?: string;
  weight?: string;
  smokingStatus?: boolean;
  dietaryPreferences?: string;
  pregnancyStatus?: boolean;
  mentalHealthHistory?: string;
  immunizationStatus?: boolean;
  hasPastSurgeries?: boolean;
  recentAnxiety?: boolean;
  recentDepression?: boolean;
  maritalStatus: MaritalStatus; // Prisma enum
};

export type IPatientUpdate = {
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  contactNumber: string;
  address?: string;
  patientHealthData?: IPatientHealthData;
  medicalReport?: IMedicalReport[];
};
