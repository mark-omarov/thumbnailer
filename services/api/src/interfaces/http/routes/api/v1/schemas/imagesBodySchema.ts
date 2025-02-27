import { z } from 'zod';

export const uploadImageFormSchema = z.object({
  file: z.any().refine((val) => val != null, {
    message: 'File is required',
  }),
  body: z.object({
    size: z
      .string()
      .regex(/^[0-9]+x[0-9]+$/, {
        message: "Size must be in the format 'NxN', e.g. '300x300'",
      })
      .optional()
      .default('300x300'),
  }),
});

export type CreateThumbnailFormInput = z.infer<typeof uploadImageFormSchema>;
