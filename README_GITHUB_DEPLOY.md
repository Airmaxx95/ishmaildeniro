# ishmail_v4.5_github

This is a GitHub Pages-ready build made from the baseline:

`ishmail_v4.4.97_work_text_scrollbar_hidden`

## Files in this folder

- `index.html` — the site
- `Ishmail_Portfolio_Database_CURRENT_with_research_visibility_toggle.xlsx` — your current spreadsheet snapshot
- `ASSET_MANIFEST.txt` — every image/PDF path the site expects under `Database/`

## Important

This build converts local `file:///...` paths to relative web paths like:

- `Database/CV.pdf`
- `Database/Images/...`

GitHub Pages cannot access files from your Mac directly, so you must upload the real image/PDF files into the repository.

## Recommended repo structure

```text
your-repo/
├── index.html
├── Ishmail_Portfolio_Database_CURRENT_with_research_visibility_toggle.xlsx
└── Database/
    ├── CV.pdf
    └── Images/
        └── ...
```

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload everything from this folder into the repo root.
3. Also upload all images/PDFs listed in `ASSET_MANIFEST.txt` into matching paths.
4. In GitHub go to:
   `Settings -> Pages`
5. Under **Build and deployment** choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
6. Save.
7. Wait for GitHub Pages to deploy.

Your site URL will be:

`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Connect your own domain

In the repo:

1. Go to `Settings -> Pages`
2. Add your domain in **Custom domain**
3. Update DNS at your registrar.

For a root domain, GitHub Pages usually needs A records pointing to:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For a subdomain like `portfolio.yourdomain.com`, use a CNAME to:

`YOUR-USERNAME.github.io`

Then enable HTTPS in GitHub Pages after DNS resolves.
