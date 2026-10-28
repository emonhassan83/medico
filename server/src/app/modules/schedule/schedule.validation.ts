import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z
      .string({
        required_error: "Start date is required!",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Start date must be a valid date!",
      }),
    endDate: z
      .string({
        required_error: "End date is required!",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "End date must be a valid date!",
      }),
    startTime: z
      .string({
        required_error: "Start time is required!",
      })
      .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "Start time must be in HH:MM format!",
      }),
    endTime: z
      .string({
        required_error: "End time is required!",
      })
      .regex(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, {
        message: "End time must be in HH:MM format!",
      }),
  }),
});

export const ScheduleValidation = {
  create,
};
