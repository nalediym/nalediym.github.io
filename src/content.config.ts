import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Writing — blog posts, essays, long-form artifacts.
 * Pim-compatible: optional `pim` frontmatter marks posts Pim generated
 * or last refreshed, so we can trace provenance and rebuild on demand.
 */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    pim: z
      .object({
        source_project: z.string().optional(),
        assessment_id: z.string().optional(),
        generated_at: z.coerce.date().optional(),
      })
      .optional(),
  }),
});

/**
 * Projects — one file per repo, each a portfolio entry. Optional `pim`
 * block carries the ARM-rubric scores Pim emitted during assessment.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum(['concept', 'alpha', 'beta', 'stable', 'archived']),
    repo: z.string().url().optional(),
    website: z.string().url().optional(),
    release: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    startedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    order: z.number().default(999),
    pim: z
      .object({
        assessment_id: z.string().optional(),
        verdict: z.enum(['READY', 'NOT_READY']).optional(),
        assessed_at: z.coerce.date().optional(),
        scores: z
          .object({
            market: z.number().min(1).max(10),
            packaging: z.number().min(1).max(10),
            network: z.number().min(1).max(10),
            friction: z.number().min(1).max(10),
            longevity: z.number().min(1).max(10),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const collections = { posts, projects };
