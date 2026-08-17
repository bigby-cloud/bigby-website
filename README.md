# Bigby.cloud

Source for [bigby.cloud](https://bigby.cloud), an [Astro](https://astro.build) static site styled with Bootstrap, deployed to GitHub Pages.

## Structure

```
src/pages/       Route-level pages (one file/folder per URL)
src/layouts/     Base layout + templates shared across many pages (personas, comparisons)
src/components/  Reusable UI pieces (hero, cards, FAQ accordion, pricing table...)
src/content/     Content collections: personas, persona-hubs, comparisons, posts
src/assets/      Images (processed by astro:assets at build time) and fonts
src/styles/      Bootstrap import + brand overrides (custom.scss)
public/          Static files served as-is (robots.txt, llms.txt, favicon)
```

## Editing content

Most day-to-day changes don't touch page templates at all:

- **A persona page** ("for-accountants" etc.): edit the matching file in `src/content/personas/*.md`. It's frontmatter, not HTML: headline, risk items, FAQ entries.
- **A comparison page** (Bigby vs X): edit `src/content/comparisons/*.md`.
- **A blog post**: edit or add a file in `src/content/posts/*.md`. The body is plain Markdown. New posts are picked up automatically by the `/[year]/[month]/[slug]/` route, keyed off the post's `date` field.
- **Pricing, homepage, /drive/, /compare/, one-off pages**: these are hand-built in `src/pages/*.astro` since each one is unique. Edit the file directly.
- **Design tokens** (brand colour, font): `src/styles/custom.scss`.
- **Shared layout pieces** (header, footer, hero, FAQ accordion): `src/components/*.astro`.

## Local development

```
docker compose up --build --remove-orphans   # dev server at localhost:4321
```

Local Node/pnpm install is not recommended to avoid supply chain attacks — use Docker and keep dependencies installed inside the container.

Run `docker compose run --rm dev pnpm build` to test a full site build.

## Shipping a change

```
git checkout -b [type]/[description]   # e.g. copy/pricing-update, fix/persona-typo
```

Edit, check locally, then push and open a PR. Merging to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages automatically.

## Open items

- **Privacy policy**: `src/pages/privacy-policy.astro` is a placeholder. Needs a proper rewrite before launch.
