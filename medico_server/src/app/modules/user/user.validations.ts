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
        .email(),
      contactNumber: z.string({
        required_error: 'Contact Number is required!',
      }),
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
        .email(),
      contactNumber: z.string({
        required_error: 'Contact Number is required!',
      }),
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
      address: z
        .string({
          required_error: 'Address is required!',
        })
        .nullable(),
      registrationNumber: z.string({
        required_error: 'Reg number is required',
      }),
      experience: z
        .number({
          required_error: 'Experience is required',
        })
        .int(),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
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
      email: z
        .string({
          required_error: 'Email is required for communication.',
        })
        .email('Please enter a valid email address.'),
      firstName: z.string({
        required_error: 'First name is required.',
      }),
      lastName: z.string({
        required_error: 'Last name is required.',
      }),
      profilePhoto: z
        .string({
          required_error: 'Profile Photo is required for records.',
        })
        .optional(),
      contactNumber: z.string({
        required_error: 'Contact number is required for verification.',
      }),
      address: z
        .string({
          required_error: 'Address is required for records.',
        })
        .optional(),

    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.PENDING, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const UserValidation = {
  createAdmin,
  createReceptionist,
  createDoctor,
  createPatient,
  updateStatus,
};
