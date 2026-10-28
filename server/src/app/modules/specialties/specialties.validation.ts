import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    icon: z.string({
      required_error: 'Icon is required!',
    }),
    description: z.string({
      required_error: 'Icon is required!',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required!',
      })
      .optional(),
    icon: z
      .string({
        required_error: 'Icon is required!',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Icon is required!',
      })
      .optional(),
  }),
});

export const SpecialtiesValidation = {
  create,
  update,
};
