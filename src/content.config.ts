import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// お知らせ: src/content/news/ に Markdown を1件1ファイルで追加する
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** true にすると一覧に表示しない（下書き） */
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
