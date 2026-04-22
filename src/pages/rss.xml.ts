import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: "Naledi — writing",
    description: 'Essays, launch posts, long-form notes on local-first AI tools.',
    site: context.site ?? 'https://nalediym.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/writing/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
