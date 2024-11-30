interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: string;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
}

interface Patient {
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
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: string;
  paymentStatus: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  doctor: Doctor;
  patient: Patient;
}

export interface AppointmentResponse {
  appointments: Appointment[];
}
