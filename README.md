# Ishmail v4.5 GitHub JSON Build (fixed)

Upload these files to the repo root:

- index.html
- .nojekyll
- README.md
- database/
- database.json
- favicon.ico

The site tries JSON in this order:
1. ./database/database.json
2. database/database.json
3. ./database.json
4. database.json

Your spreadsheet local file paths were converted to:
- ./database/CV.pdf
- ./database/images/...

You need to upload your actual CV and images into the database folder for them to load online.
