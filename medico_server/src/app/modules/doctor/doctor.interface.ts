import { Gender } from '@prisma/client';

export type IDoctorFilterRequest = {
  searchTerm?: string;
  email?: string;
  contactNo?: string;
  gender?: Gender;
  specialties?: string;
};

export type IDoctorUpdate = {
  firstName?: string;
  lastName?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  bio?: string;
  contactNumber?: string;
  address?: string;
  gender?: Gender;
  dateOfBirth?: Date | string;
  registrationNumber?: string;
  experience?: number;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  specialties?: ISpecialties[];
  averageRating?: number;
  isDeleted?: boolean;
};

export type ISpecialties = {
  specialtiesId: string;
  isDeleted?: boolean | null;
};
