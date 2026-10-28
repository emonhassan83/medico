import { z } from 'zod';

const create = z.object({
  body: z.object({
    doctorId: z
      .string({
        required_error: "Doctor ID is required!",
      })
      .uuid("Doctor ID must be a valid UUID!"),
    scheduleId: z
      .string({
        required_error: "Schedule ID is required!",
      })
      .uuid("Schedule ID must be a valid UUID!"),
  }),
});

export const AppointmentValidation = {
  create,
};