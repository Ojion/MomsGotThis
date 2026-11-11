# momskc.com

Website for Mom's Got This Cleaning Co., served by GitHub Pages from the `docs/` folder on `main`
(Settings > Pages > Deploy from a branch > `main` / `/docs`). Any push to `main` republishes within a minute or two.

- `docs/index.html` is the whole site: words, links and styling.
- `docs/images/` holds the logo and photos. To swap a photo, upload a new file with the same name.
- `docs/og.jpg` is the picture shown when the link is shared on Facebook or in a text.
- `docs/CNAME` keeps the momskc.com domain, and `docs/.nojekyll` makes GitHub serve the files as-is. Leave both alone.

## Try it on your computer

    python -m http.server 8000 --directory docs

then open http://localhost:8000.
