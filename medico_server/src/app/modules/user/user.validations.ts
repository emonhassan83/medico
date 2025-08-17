import { Gender, UserStatus } from '@prisma/client';
import { z } from 'zod';

const createAdmin = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required!',
    }),
    admin: z.object({
      firstName: z.string({
        required_error: 'First Name is required!',
      }),
      lastName: z.string({
        required_error: 'Last Name is required!',
      }),
      email: z
        .string({
          required_error: 'Email is required!',
        })
        .email('Invalid email address.'),
      contactNumber: z.string({
        required_error: 'Contact Number is required!',
      }),
      address: z
        .string({
          required_error: 'Contact Number is required!',
        })
        .optional(),
      profilePhoto: z.string().optional(),
      coverPhoto: z.string().optional(),
    }),
  }),
});

const createReceptionist = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required!',
    }),
    receptionist: z.object({
      firstName: z.string({
        required_error: 'First Name is required!',
      }),
      lastName: z.string({
        required_error: 'Last Name is required!',
      }),
      email: z
        .string({
          required_error: 'Email is required!',
        })
        .email('Invalid email address.'),
      contactNumber: z.string({
        required_error: 'Contact Number is required!',
      }),
      profilePhoto: z.string().optional(),
      coverPhoto: z.string().optional(),
      bio: z.string().optional(),
      address: z.string({
        required_error: 'Address is required!',
      }),
      dateOfBirth: z.string().optional(),
      experience: z.number().int().default(0),
      gender: z.nativeEnum(Gender, {
        required_error: 'Gender is required!',
      }),
      designation: z.string({
        required_error: 'Designation is required!',
      }),
      qualification: z.string({
        required_error: 'Qualification is required!',
      }),
      specialization: z.array(z.string()).optional(),
      yearsOfExperience: z.number().int().default(0),
    }),
  }),
});

const createDoctor = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required!',
    }),
    doctor: z.object({
      firstName: z.string({
        required_error: 'First Name is required!',
      }),
      lastName: z.string({
        required_error: 'Last Name is required!',
      }),
      email: z
        .string({
          required_error: 'Email is required!',
        })
        .email(),
      contactNumber: z.string({
        required_error: 'Contact Number is required!',
      }),
      profilePhoto: z.string().optional(),
      coverPhoto: z.string().optional(),
      bio: z.string().optional(),
      address: z
        .string({
          required_error: 'Address is required!',
        })
        .nullable(),
      gender: z.nativeEnum(Gender, {
        required_error: 'Gender is required!',
      }),
      dateOfBirth: z.string().optional(),
      registrationNumber: z.string({
        required_error: 'Reg number is required',
      }),
      experience: z
        .number({
          required_error: 'Experience is required',
        })
        .int(),
      appointmentFee: z.number({
        required_error: 'Appointment fee is required',
      }),
      qualification: z.string({
        required_error: 'Qualification is required',
      }),
      currentWorkingPlace: z.string({
        required_error: 'Current working place is required!',
      }),
      designation: z.string({
        required_error: 'Designation is required!',
      }),
    }),
  }),
});

const createPatient = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required!',
    }),
    patient: z.object({
      firstName: z.string({
        required_error: 'First name is required.',
      }),
      lastName: z.string({
        required_error: 'Last name is required.',
      }),
      email: z
        .string({
          required_error: 'Email is required for communication.',
        })
        .email('Please enter a valid email address.'),
      profilePhoto: z.string().optional(),
      coverPhoto: z.string().optional(),
      bio: z.string().optional(),
      contactNumber: z.string({
        required_error: 'Contact number is required for verification.',
      }),
      address: z
        .string({
          required_error: 'Address is required for records.',
        })
        .optional(),
      gender: z.nativeEnum(Gender, {
        required_error: 'Gender is required!',
      }),
      dateOfBirth: z.string().optional(),
    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([
      UserStatus.ACTIVE,
      UserStatus.PENDING,
      UserStatus.BLOCKED,
      UserStatus.DELETED,
    ]),
  }),
});

export const UserValidation = {
  createAdmin,
  createReceptionist,
  createDoctor,
  createPatient,
  updateStatus,
};
