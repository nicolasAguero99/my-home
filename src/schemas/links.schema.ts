import { z } from 'zod';

export const createLinkSchema = z
  .array(
    z.object({
      title: z.string(),
      category: z.string(),
      url: z.string().url(),
      order: z.number().min(0),
    }),
  )
  .min(1, 'At least one link is required');

export type CreateLinkDTO = z.infer<typeof createLinkSchema>;

export const updateLinkSchema = z
  .array(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      category: z.string().optional(),
      url: z.string().url().optional(),
      order: z.number().min(0).optional(),
    }),
  )
  .min(1, 'At least one link is required');

export type UpdateLinkDTO = z.infer<typeof updateLinkSchema>;
