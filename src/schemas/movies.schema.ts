import { z } from 'zod';

export const createMovieSchema = z
  .array(
    z.object({
      title: z.string(),
      image: z.string().url(),
      link: z.string().url(),
      order: z.number().min(0),
    }),
  )
  .min(1, 'At least one movie is required');

export type CreateMovieDTO = z.infer<typeof createMovieSchema>;

export const updateMovieSchema = z
  .array(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      image: z.string().url().optional(),
      link: z.string().url().optional(),
      order: z.number().min(0).optional(),
    }),
  )
  .min(1, 'At least one movie is required');

export type UpdateMovieDTO = z.infer<typeof updateMovieSchema>;

export const deleteMovieSchema = z
  .array(z.string())
  .min(1, 'At least one movie is required');

export type DeleteMovieDTO = z.infer<typeof deleteMovieSchema>;
