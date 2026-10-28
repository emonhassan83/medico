import { z } from 'zod';

const update = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required!"
    }).optional(),
    lastName: z.string({
      required_error: "Last name is required!"
    }).optional(),
    contactNumber: z.string({
      required_error: "Contact Number is required!",
    }).optional(),
    profilePhoto: z.string({
      required_error: "Profile Photo is required!",
    }).optional(),
    address: z.string({
      required_error: "Address Number is required!",
    }).optional(),
  }),
});

export const adminValidationSchemas = {
  update,
};
