# Mom’s Got This · Website preview

This repository hosts a design gallery with 18 alternatives and the original layout for comparison. Every design has a link back to the gallery. Quotes and contact buttons are interactive demos, so Amber can try them with sample details.

The public preview uses `noindex` in the HTML and Render response headers. Anyone with the URL can still open the gallery or its images. Keep the GitHub repository private if you want its source visible only to collaborators. The site needs no environment variables or credentials.

## Deploy from GitHub to Render

1. Extract the ZIP. Copy the **contents** of `momskc-preview` into the root of your GitHub repo, including `.gitignore` and `render.yaml`. Commit and push.
2. In Render, choose **New → Blueprint**, connect the GitHub repo and select the branch to deploy. The Blueprint creates a Static Site, publishes only `public/`, adds the response headers and registers `momskc.com` as a custom domain.
3. Check the generated `onrender.com` URL after the first deploy. Open a design, try **Phone preview**, and verify that a sample quote stays on the page.
4. In Render’s **Settings → Custom Domains**, use the DNS instructions for `momskc.com`. Set the records at the provider that hosts DNS, then select **Verify** in Render.

| DNS name | Type | Target |
|---|---|---|
| `@` | `ALIAS` or `ANAME` when supported | Your exact `onrender.com` hostname |
| `@` | `A` if apex aliasing is unavailable | `216.24.57.1` |
| `www` | `CNAME` | Your exact `onrender.com` hostname |

Use one apex option. For Cloudflare DNS, follow Render’s Cloudflare-specific setup and use a DNS-only, flattened CNAME at the apex. Replace conflicting website records for `@` and `www`, including old `AAAA` records. Render adds the `www` redirect when you add the apex domain and manages the HTTPS certificate after verification.

After the certificate is active, verify the domain and response headers from Windows:

```powershell
curl.exe -I http://momskc.com/
curl.exe -I https://momskc.com/
curl.exe -I https://momskc.com/sites/01-impeccable-delight/index.html
```

The first request should redirect to HTTPS. The HTTPS responses should include `X-Robots-Tag: noindex, nofollow` and `Content-Security-Policy`. Test the gallery and phone preview at the HTTPS address before sharing it with Amber.

[Render Blueprint reference](https://render.com/docs/blueprint-spec) · [Custom domains](https://render.com/docs/custom-domains) · [DNS setup](https://render.com/docs/configure-other-dns) · [Cloudflare DNS setup](https://render.com/docs/configure-cloudflare-dns)

## Preview on your computer

From the repository root, run `python -m http.server 8000 --directory public` and open [localhost:8000](http://localhost:8000/). A local HTTP server lets the browser apply the same-origin policy used on Render.
