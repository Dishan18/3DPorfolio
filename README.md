# Dishan Sarkar, portfolio

Personal site of Dishan Sarkar, AI engineer.

Live: [dishansarkar.vercel.app](https://dishansarkar.vercel.app/)

A single-page site built with React, TypeScript and Vite, styled as an AI engineer's desk: a cutting mat of draggable paper objects (a model card, a working punch card, a loss curve), projects in file folders, earlier builds in slide mounts and a postcard footer. No animation libraries. Light and dark themes follow the system setting.

## Editing content

All copy lives in [`src/data/content.ts`](src/data/content.ts): profile, experience, featured projects, research, the project index, skills and background. The résumé is served from `public/resumeDishanSarkar.pdf`; project screenshots are in `public/images/`.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.tsx              page layout and sections
  index.css            design tokens and all styles
  data/content.ts      site copy
  components/Desk        the hero: the mat and its objects
  components/Draggable   pick up, throw, settle
  components/PunchCard   Hollerith-encoded punch card
  components/Archive     earlier builds as slide mounts
  styles/tokens.css      colours, type, spacing
  styles/base.css        base rules
```

## License

MIT
