type Doctor = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
};

type Patient = {
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
};

type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: "SCHEDULED" | "INPROGRESS" | "COMPLETED" | "CANCELED";
  paymentStatus: "PAID" | "UNPAID";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TPrescription = {
  id: string;
  doctorId: string;
  patientId: string;
  appointmentId: string;
  followUpDate: string | null;
  instructions: string;
  createdAt: string;
  updatedAt: string;
  doctor: Doctor;
  patient: Patient;
  appointment: Appointment;
};
