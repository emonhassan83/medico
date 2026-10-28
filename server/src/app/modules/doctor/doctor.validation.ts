import { z } from 'zod';

const create = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    firstName: z.string({
      required_error: "Name is required!"
    }),
    lastName: z.string({
      required_error: "Name is required!"
    }),
    profilePhoto: z.string({
      required_error: 'Profile Photo is required',
    }).optional(),
    coverPhoto: z.string({
      required_error: 'Cover Photo is required',
    }).optional(),
    contactNumber: z.string({
      required_error: 'Contact Number is required',
    }),
    registrationNumber: z.string({
      required_error: 'Registration Number is required',
    }),
    experience: z.number({
      required_error: 'Experience is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    appointmentFee: z.number({
      required_error: 'Blood group is required',
    }),
    qualification: z.string({
      required_error: 'Appointment Fee is required',
    }),
    currentWorkingPlace: z.string({
      required_error: 'Current Working Place is required',
    }),
    designation: z.string({
      required_error: 'Designation is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    experience: z.number().optional(),
    gender: z.string().optional(),
    appointmentFee: z.number().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const DoctorValidation = {
  create,
  update,
};
