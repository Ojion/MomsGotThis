# momskc.com

Static site for Mom's Got This Cleaning Co. Render publishes `public/` (see `render.yaml`).

## Update the live site

1. Copy everything in this folder (including `render.yaml` and `.gitignore`) into the root of the GitHub repo that
   Render deploys, replacing the old `public/` folder completely so retired pages disappear.
2. Commit and push to the branch Render watches. Render redeploys on its own within a minute or two.
3. Open https://momskc.com and try a design and its Phone preview.

The service name in `render.yaml` is `momskc-preview`, matching the existing Render service, so Render updates it
instead of creating a new one.

## Right now it's a preview

`momskc.com` shows the gallery of website options. Search engines are told to stay away (`robots.txt`, a `noindex`
meta tag, and the `X-Robots-Tag` header in `render.yaml`).

When Amber picks her design and it goes live as the real site: make that design's page `public/index.html` (copy
`sites/<chosen>/index.html` up a level, change every `../../images/` to `images/`, and its `og:image` to
`https://momskc.com/og.jpg` after copying its `og.jpg` up too), remove the other `sites/` and `thumbs/`, and delete
`robots.txt`, the `noindex` meta tag and the `X-Robots-Tag` header so Google can list it.

## Try it on your computer

    python -m http.server 8000 --directory public

then open http://localhost:8000.
