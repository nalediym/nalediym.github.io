# Pim → Portfolio MDX Contract

When [Pim](~/.claude/skills/pimp) hits Phase 4 (GENERATE), one of the output agents
targets the portfolio. It writes MDX files to this repo and opens a PR.

Two destinations:

- `src/content/posts/*.mdx` — launch posts, essays, retrospectives.
- `src/content/projects/*.mdx` — one entry per repo in the portfolio index.

Both are validated by Astro's content-collection schemas in `src/content.config.ts`.
This document is the authoritative spec; the Zod schemas are its runtime check.

---

## Post: `src/content/posts/<slug>.mdx`

### Frontmatter

```yaml
---
title: string                          # REQUIRED. Display title. Should read naturally.
description: string                    # REQUIRED. 1-2 sentence lede. Appears in meta, og, card.
publishedAt: YYYY-MM-DD                # REQUIRED. Original publish date.
updatedAt: YYYY-MM-DD                  # optional. If this post has been revised.
tags: [string, ...]                    # optional. lowercase-kebab. 3-6 recommended.
draft: boolean                         # optional. Default false. True = never listed.
cover: string                          # optional. Path to cover image (in public/).
pim:                                   # optional. Provenance block.
  source_project: string               # e.g. "hypha"
  assessment_id: string                # e.g. "assess-20260422-001"
  generated_at: YYYY-MM-DD
---
```

### Body conventions

- Start with an italicized tagline under the title (`_One sentence that sells the post._`).
- Use `##` for major sections, `###` for sub-sections. Never `#` in body.
- Code blocks: use triple backticks with language identifier (`ts`, `bash`, `yaml`, `json`).
- Links: inline markdown. Prefer named anchors over bare URLs.
- Pull quotes: standard markdown blockquote (`>`).
- For launch posts, end with a **Try it** section showing one concrete command sequence.
- For credits, use a **Credits** section listing prior art with inline links.

### Example

```mdx
---
title: Dogsheep for AI agents
description: A local-first knowledge graph for your static exports.
publishedAt: 2026-04-22
tags: [hypha, local-first, agents, mcp]
pim:
  source_project: hypha
  assessment_id: assess-20260422-001
  generated_at: 2026-04-22
---

In 2019, Simon Willison started shipping Dogsheep...
```

---

## Project: `src/content/projects/<slug>.mdx`

### Frontmatter

```yaml
---
title: string                          # REQUIRED. Project name.
tagline: string                        # REQUIRED. 1-sentence what-it-does. Appears on cards.
status: concept | alpha | beta | stable | archived  # REQUIRED.
repo: https://...                      # optional. GitHub/GitLab URL.
website: https://...                   # optional. Live demo / docs site.
release: https://...                   # optional. Release page URL.
tags: [string, ...]                    # optional. Stack / domain tags.
startedAt: YYYY-MM-DD                  # REQUIRED.
updatedAt: YYYY-MM-DD                  # optional.
featured: boolean                      # optional. Default false. Featured projects get hero slots.
cover: string                          # optional. Path to cover image.
order: number                          # optional. Sort order on index (lower = first).
pim:                                   # optional. ARM-rubric results from Pim's ASSESS phase.
  assessment_id: string
  verdict: READY | NOT_READY
  assessed_at: YYYY-MM-DD
  scores:                              # 1-10 per dimension.
    market: number
    packaging: number
    network: number
    friction: number
    longevity: number
---
```

### Body conventions

Three required H2 sections for consistency across the index:

1. **## What it does** — 1-3 paragraphs. The "why care" elevator pitch.
2. **## How it works** — technical substance. Use `**bold**` to highlight key decisions.
3. **## What's shipped** — concrete deliverables, with a test/pass count if applicable.

Optional H2 sections:

- **## Explicit deferrals** — honest scope. What's *not* in this version and why.
- **## Credits** — prior art + inspirations with inline links.
- **## Roadmap** — next milestones, with rough horizons (not dates).

### Pim-specific rules (voice + placement)

Pim's voice is confident-not-delusional. When writing a project entry, follow the
SKILL.md voice rules: 5/5 confidence, research citations where warranted, scrappy
tone, backs claims with evidence. The rubric scores in the `pim` frontmatter are the
public audit trail — they render as a card at the top of the project page.

### Example

```mdx
---
title: Hypha
tagline: Person OS for your static exports.
status: alpha
repo: https://github.com/nalediym/hypha
release: https://github.com/nalediym/hypha/releases/tag/v0.1.0-alpha
tags: [typescript, bun, sqlite, mcp, knowledge-graph, local-first, bitemporal]
startedAt: 2026-04-22
featured: true
order: 1
---

## What it does
Hypha ingests static data exports into a typed temporal graph...
```

---

## Writing workflow (how Pim should emit)

When Pim's ASSESS phase returns **READY**, the GENERATE phase spawns a portfolio
agent alongside the existing platform agents (X, GitHub, YouTube Shorts). The
portfolio agent's job:

1. **Write** a new `src/content/posts/<slug>.mdx` with the launch essay.
2. **Write or update** `src/content/projects/<slug>.mdx` with current status + rubric.
3. **Open a PR** against `main` of the portfolio repo, titled
   `content: <project> launch — <YYYY-MM-DD>`.
4. **Link the PR** back from Pim's audit log in `~/Projects/pimp/memory/`.

The PR description should include:

- Assessment summary + verdict
- Rubric scores
- List of files added/modified
- Any follow-ups (TODO images, TODO CTA) flagged in the body with HTML comments

## Schema source of truth

Always `src/content.config.ts`. When this contract and the schema drift, the schema
wins. Run `bun run build` to catch any mismatch — Astro validates frontmatter at
build time and fails the whole build on a single invalid entry.
