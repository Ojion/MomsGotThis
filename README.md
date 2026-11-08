# Mom's Got This Cleaning Co. — 18 site options

Open `index.html` to browse all 18 (plus the original). Each option is one self-contained page in
`sites/NN-name/index.html` that uses the shared photos in `images/`.

## Putting the chosen one online (free)

1. Make a new folder, e.g. `momsgotthis-site/`.
2. Copy the chosen `sites/NN-name/index.html` and `sites/NN-name/og.jpg` into it.
3. Copy the `images/` folder into it.
4. In that `index.html`, replace every `../../images/` with `images/`.
5. Deploy the folder as-is to a free static host (no build step):
   - **Cloudflare Pages:** dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets → drag the folder.
   - **Netlify:** app.netlify.com/drop → drag the folder.
6. Once it has its address (e.g. `https://momsgotthis.pages.dev`), change `content="og.jpg"` in the
   `og:image` tag to the full address, `https://momsgotthis.pages.dev/og.jpg`. Facebook and iMessage
   only show the preview card with a full URL. Check it with https://developers.facebook.com/tools/debug/.

Optional: a custom domain (~$10/year) can be pointed at either host later.

## Notes

- The quote form opens the visitor's texting app with their details filled in, addressed to 816-715-4322.
  Nothing is sent until they press send. It needs no server.
- All job photos are Amber's real client homes, unretouched. The only edit: in `playroom.webp` the
  family-name sign on the wall was replaced with a generic "play" sign for the family's privacy.
- Files in `images/art/` are generated illustrations/props (OpenAI image API), never presented as client work.
- `thumbs/` is only for the gallery and isn't needed on the live site.
