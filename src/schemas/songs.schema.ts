import { z } from 'zod';

export const createSongsSchema = z
  .array(
    z.object({
      title: z.string(),
      image: z.string().url().optional(),
      link: z.string().url(),
      order: z.number().min(0),
    }),
  )
  .min(1, 'At least one song is required');

export type CreateSongsDTO = z.infer<typeof createSongsSchema>;

export const updateSongsSchema = z.object({
  created: createSongsSchema.optional(),
  updated: z.array(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      image: z.string().url().optional(),
      link: z.string().url().optional(),
      order: z.number().min(0).optional(),
    }),
  ),
  deleted: z.array(z.string()),
});

export type UpdateSongsDTO = z.infer<typeof updateSongsSchema>;
