# momskc.com

Static site for Mom's Got This Cleaning Co. GitHub Pages publishes the `docs/` folder on `main`
(Settings → Pages → Deploy from a branch → `main` / `/docs`). `docs/.nojekyll` makes GitHub serve the files as-is.
`render.yaml` is left from the old Render setup and can be deleted once momskc.com points at GitHub.

## Update the live site

1. Copy everything in this folder (including `render.yaml` and `.gitignore`) into the root of the GitHub repo that
   Render deploys, replacing the old `docs/` folder completely so retired pages disappear.
2. Commit and push to the branch Render watches. Render redeploys on its own within a minute or two.
3. Open https://momskc.com and try a design and its Phone preview.

The service name in `render.yaml` is `momskc-preview`, matching the existing Render service, so Render updates it
instead of creating a new one.

## Right now it's a preview

`momskc.com` shows the gallery of website options. Search engines are told to stay away (`robots.txt`, a `noindex`
meta tag, and the `X-Robots-Tag` header in `render.yaml`).

When Amber picks her design and it goes live as the real site: make that design's page `docs/index.html` (copy
`sites/<chosen>/index.html` up a level, change every `../../images/` to `images/`, and its `og:image` to
`https://momskc.com/og.jpg` after copying its `og.jpg` up too), remove the other `sites/` and `thumbs/`, and delete
`robots.txt`, the `noindex` meta tag and the `X-Robots-Tag` header so Google can list it. (On GitHub Pages there is no X-Robots-Tag header; the meta tag and robots.txt do the job.).

## Try it on your computer

    python -m http.server 8000 --directory docs

then open http://localhost:8000.
