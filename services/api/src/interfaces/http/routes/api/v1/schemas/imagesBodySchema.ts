import { z } from 'zod';

export const uploadImageBodySchema = z.object({
  body: z.object({
    size: z
      .string()
      .regex(/^[0-9]+x[0-9]+$/, {
        message: "Size must be in the format 'NxN', e.g. '300x300'",
      })
      .optional()
      .default('300x300')
      .openapi('UploadImageSize', {
        description:
          "Desired thumbnail size in the format 'NxN', e.g. '300x300'",
      }),
  }),
});

export type UploadImageBodySchema = z.infer<typeof uploadImageBodySchema>;
