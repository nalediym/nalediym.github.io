# Naledi's portfolio

Static site built with Astro 5 + MDX. Publishes to [nalediym.github.io](https://nalediym.github.io).

Two content collections:

- `src/content/posts/` — writing (essays, launch posts, retrospectives)
- `src/content/projects/` — portfolio entries, one per repo

Both are schema-validated in `src/content.config.ts`. MDX shape is documented in [`PIM-CONTRACT.md`](./PIM-CONTRACT.md) — that's the contract [Pim](https://github.com/nalediym) writes against when it emits new content.

## Local dev

```bash
bun install
bun run dev        # → http://localhost:4321
```

## Build + preview

```bash
bun run build      # → dist/
bun run preview
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `main` and publishes to GitHub Pages. Once the repo is at `nalediym/nalediym.github.io`, it auto-deploys.

## Design

Fraunces (display) + JetBrains Mono (UI/mono). Dark-first, tinted neutrals in oklch — never pure black. Burnt-copper accent. Spring-free easings (ease-out-quart/quint/expo). Tokens in `src/styles/tokens.css`.

## License

MIT for site code. Writing content © Naledi.
