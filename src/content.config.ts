import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const personas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/personas' }),
  schema: ({ image }) =>
    z.object({
      heroImage: image(),
      heroImageAlt: z.string(),
      heroHeading: z.string(),
      heroSubhead: z.string(),
      heroAnchorId: z.string(),
      heroAnchorLabel: z.string(),
      introHeading: z.string(),
      introParagraphs: z.array(z.string()),
      introImage: image(),
      introImageAlt: z.string(),
      risksHeading: z.string(),
      risksSubhead: z.string(),
      risks: z.array(z.object({ heading: z.string(), body: z.string() })),
      howItWorksStep4Heading: z.string(),
      howItWorksStep4Body: z.string(),
      faqs: z.array(faqItem),
      closingHeading: z.string(),
      closingSubhead: z.string(),
    }),
});

const personaHubs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/persona-hubs' }),
  schema: ({ image }) =>
    z.object({
      heroImage: image(),
      heroImageAlt: z.string(),
      heroHeading: z.string(),
      heroParagraphs: z.array(z.string()),
      whoHeading: z.string(),
      whoIntro: z.string(),
      whoLinks: z.array(z.object({ label: z.string(), href: z.string() })),
      whoFooterHtml: z.string(),
      whyHeading: z.string(),
      whyParagraphs: z.array(z.string()),
      whyImage: image(),
      whyImageAlt: z.string(),
      includesHeading: z.string(),
      includesSubhead: z.string(),
      includesItems: z.array(z.object({ heading: z.string(), body: z.string() })),
      faqs: z.array(faqItem),
      closingHeading: z.string(),
      closingSubhead: z.string(),
    }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/comparisons' }),
  schema: ({ image }) =>
    z.object({
      heroImage: image(),
      heroImageAlt: z.string(),
      heroHeading: z.string(),
      heroSubhead: z.string(),
      tableHeading: z.string(),
      tableSubhead: z.string(),
      competitorName: z.string(),
      rows: z.array(z.object({ label: z.string(), bigby: z.string(), competitor: z.string() })),
      chooseCompetitorHeading: z.string(),
      chooseCompetitorItems: z.array(z.object({ heading: z.string(), body: z.string() })),
      chooseBigbyHeading: z.string(),
      chooseBigbyItems: z.array(z.object({ heading: z.string(), body: z.string() })),
      faqs: z.array(faqItem),
      closingHeading: z.string(),
      closingSubhead: z.string(),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      author: z.string(),
      image: image(),
      imageAlt: z.string(),
      faqs: z.array(faqItem).optional(),
    }),
});

export const collections = { personas, 'persona-hubs': personaHubs, comparisons, posts };
