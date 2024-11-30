type MedicalReport = {
  id: string;
  patientId: string;
  reportName: string;
  reportLink: string;
  createdAt: string;
  updatedAt: string;
};

type PatientHealthData = {
  id: string;
  patientId: string;
  dateOfBirth: string | null;
  gender: "MALE" | "FEMALE" | "OTHER";
  bloodGroup:
    | "O_POSITIVE"
    | "O_NEGATIVE"
    | "A_POSITIVE"
    | "A_NEGATIVE"
    | "B_POSITIVE"
    | "B_NEGATIVE"
    | "AB_POSITIVE"
    | "AB_NEGATIVE"
    | null;
  hasAllergies: boolean;
  hasDiabetes: boolean;
  height: number | null;
  weight: number | null;
  diet: string | null;
  pulse: number | null;
  smokingStatus: boolean;
  dietaryPreferences: string | null;
  pregnancyStatus: boolean | null; // Optional for gender relevance
  mentalHealthHistory: string | null;
  immunizationStatus: boolean;
  hasPastSurgeries: boolean;
  recentAnxiety: boolean;
  recentDepression: boolean;
  maritalStatus: "UNMARRIED" | "MARRIED" | null;
  createdAt: string;
  updatedAt: string;
};

export type IPatient = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  medicalReport: MedicalReport[];
  patientHealthData: PatientHealthData | null;
};
