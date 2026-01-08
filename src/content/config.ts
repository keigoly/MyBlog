// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		cover: image().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const worksCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		category: z.string(), // e.g., "Extension", "Web App", "Tool"
		date: z.date(),
		cover: image().optional(),
		github: z.string().optional(),
		demo: z.string().optional(),
		technologies: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
	}),
});

export const collections = {
	'blog': blogCollection,
	'works': worksCollection,
};