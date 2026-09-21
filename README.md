# Aman Gupta — Personal Website

A cozy, illustrated academic website designed to scale as the archive grows.

## Updating notes

1. Put a PDF in `assets/notes/`.
2. Open `script.js`.
3. Add one object to the `notes` array.
4. Set `featured: true` if you want it visible in the illustrated study room. The archive can contain any number of notes.

## Updating publications

1. Put a PDF in `assets/papers/`.
2. Add one object to the `publications` array in `script.js`.
3. Add the arXiv URL in the `arxiv` field.
4. Mark the current paper `featured: true` if you want it on the desk.

The study room and research desk are intentionally kept uncluttered. Clicking the room's archive control or the research monitor opens the scalable archive.

## GitHub Pages

The repository should be named `Shadow-monrc.github.io`, with the contents of this folder at the repository root. In Settings → Pages, use **Deploy from a branch → main → /(root)**.
