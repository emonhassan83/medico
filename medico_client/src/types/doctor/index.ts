export interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  review: any[]; // You may want to specify the structure of the review object if known
  doctorSpecialties: DoctorSpecialty[];
}

export interface DoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: any; // You may want to specify the structure of the specialties object if known
}

export interface IDoctor {
  id: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number | undefined;
  gender: "MALE" | "FEMALE";
  apointmentFee: number | undefined;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties?: ISpecialties[];
}

export interface ISpecialties {
  specialtiesId: string;
  isDeleted?: null;
}

export interface IDoctorFormData {
  doctor: IDoctor;
  password: string;
}

export interface DoctorFormValues {
  password: string;
  doctor: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    address: string;
    gender: string;
    designation: string;
    registrationNumber: string;
    qualification: string;
    experience: string;
    appointmentFee: string;
    currentWorkingPlace: string;
    profilePhoto: string;
  };
}