# Aman Gupta — Personal Website

A cozy, illustrated academic portfolio designed for GitHub Pages.

## Folder structure

- `index.html` — page structure/content
- `style.css` — all visual styling
- `script.js` — notes, projects, publication links and interactions
- `assets/hero-room.png` — homepage artwork
- `assets/` — put your profile photo, CV, notes PDFs and paper PDFs here

## Updating the website

The easiest place to make regular updates is `script.js`.

### Add a note

Find `const notes = { ... }` and add another entry. Then add a matching `data-note="..."` card in `index.html`.

### Add a project

Add another object inside `const projects = [ ... ]`.

### Add your paper

Put your PDF in `assets/paper.pdf`, then replace the placeholder arXiv URL in `script.js`.

### Add your photo

Put your photo at:

`assets/profile.jpg`

Then replace the `.photo-placeholder` in `index.html` with an `<img>`.

### Add your CV

Put your CV at:

`assets/cv.pdf`

The CV button is already wired to that path.

## GitHub Pages

Create a GitHub repository named:

`YOUR-GITHUB-USERNAME.github.io`

Upload all files/folders in this project.

Then go to:

Repository → Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save.

Your website will appear at:

`https://YOUR-GITHUB-USERNAME.github.io`

## Important

Do not edit the website directly on GitHub every time if you don't want to. A nicer workflow is:

1. Keep this folder on your computer.
2. Edit it locally.
3. Open GitHub Desktop (or use git).
4. Commit your changes.
5. Push.
6. GitHub Pages updates the website automatically.

The site is intentionally built without a framework so it stays easy to maintain.
