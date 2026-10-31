import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: () =>
    z.object({
      title: z.string(),
      domain: z.enum(['data', 'software', 'ai']),
      year: z.string(),
      summary: z.string(),
      technicalContext: z.string().optional(),
      status: z.enum(['completed', 'in-progress', 'planned']).optional(),
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        )
        .default([]),
      technologies: z.array(z.string()),
      githubUrl: z.string().optional(),
      liveUrl: z.string().optional(),
      architectureSteps: z
        .array(
          z.object({
            step: z.number(),
            label: z.string(),
            description: z.string(),
            tag: z.string().optional(),
          })
        )
        .default([]),
      featured: z.boolean().default(false),
    }),
});

export const collections = {
  projects,
};
