import { z } from 'zod';

export const ReceptionistSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  profilePhoto: z.string().url().optional(),
  coverPhoto: z.string().url().optional(),
  bio: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^\+\d{10,15}$/, 'Contact number must be in international format'),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(), // or z.string().datetime() if you want strict date-time format
  experience: z.number().int().nonnegative().default(0),
  gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN']),
  designation: z.string().min(1, 'Designation is required'),
  qualification: z.string().min(1, 'Qualification is required'),
  specialization: z.array(z.string()).default([]),
  yearsOfExperience: z.number().int().nonnegative().default(0)
});

export const receptionistValidation = {
  ReceptionistSchema,
};
