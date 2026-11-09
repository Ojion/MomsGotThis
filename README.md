# momskc.com

Static site for Mom's Got This Cleaning Co., served by GitHub Pages from the `docs/` folder on `main`
(Settings > Pages > Deploy from a branch > `main` / `/docs`). `docs/CNAME` holds the domain and `docs/.nojekyll`
makes GitHub serve the files as-is. Any push to `main` republishes within a minute or two.

## Right now it's a preview

momskc.com shows the gallery of website options. Search engines are kept out by `docs/robots.txt` and a `noindex`
meta tag on every page.

When Amber picks her design: make that design's page `docs/index.html` (copy `sites/<chosen>/index.html` and its
`page-*.js` and `og.jpg` up a level, change every `../../images/` to `images/`, and its `og:image` to
`https://momskc.com/og.jpg`), remove the other `sites/` and `thumbs/`, and delete `robots.txt` and the `noindex`
meta tag so Google can list it.

## Try it on your computer

    python -m http.server 8000 --directory docs

then open http://localhost:8000.
