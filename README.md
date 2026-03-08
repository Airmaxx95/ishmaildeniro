# Ishmail v4.5 GitHub JSON Build

This build is prepared for GitHub Pages and uses **database/database.json** as the single source of content.
The HTML contains **no baked-in spreadsheet data**.

## Folder structure

```text
index.html
database/
  database.json
  favicon.ico
  CV.pdf
  images/
```

## What to upload to GitHub

Upload **everything in this folder** into a GitHub repository.

## How the site works

- `index.html` contains the site layout and behaviour
- `database/database.json` contains your artwork and site data
- `database/favicon.ico` is used as the favicon
- `database/CV.pdf` should be added by you if needed
- `database/images/` should contain your artwork image folders

## Update workflow

1. Edit your spreadsheet
2. Convert it to `database/database.json`
3. Upload the new `database.json` to GitHub
4. The site updates without rebuilding HTML

## GitHub Pages steps

1. Create a public GitHub repo
2. Upload the contents of this folder
3. Go to **Settings → Pages**
4. Set **Deploy from branch**
5. Select **main** and **/(root)**
6. Save

Your site will appear at:

`https://YOURUSERNAME.github.io/REPOSITORY-NAME`

## Custom domain

If you own a domain, add it in:

**Settings → Pages → Custom domain**

Then point your DNS to GitHub Pages.

## Notes

- Keep favicon at `database/favicon.ico`
- Keep JSON at `database/database.json`
- `index.html` must stay named exactly `index.html`
