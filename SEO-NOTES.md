# SEO notes

## Finding: homepage canonical points to the lovable.app domain

The *published* homepage `<link rel="canonical">` (and `og:url`, `og:image`,
`twitter:image`, JSON-LD URLs and the `Sitemap:` line in `robots.txt`) point to
the Lovable preview domain (`*.lovable.app`) instead of the real site,
`https://pipapo-ricoberto.com`. Search engines are told the Lovable URL is the
preferred version of the page.

Cause: every URL derives from one constant, `SITE_URL` in `src/lib/seo.ts`
(plus the hard-coded `Sitemap:` line in `public/robots.txt`). Its history:

| Commit  | Date       | Value                                |
|---------|------------|--------------------------------------|
| 5d7648f | 2026-11-14 | https://ricoberto.lovable.app        |
| 5275515 | 2026-11-15 | https://order.pipapo-ricoberto.com   |
| f8856af | 2026-11-16 | https://www-ricoberto-at.lovable.app |
| fb9e689 | 2026-11-17 | https://pipapo-ricoberto.com (final) |

`main` is already correct. Lovable keeps serving the previous build until the
project is published (see `roadmap.md`), so the live homepage can still carry the
lovable.app canonical.

### To do
1. Publish the latest version in Lovable.
2. Verify: `curl -s https://pipapo-ricoberto.com/ | grep -i canonical`
   should show `https://pipapo-ricoberto.com/`. Also check `/robots.txt` and `/sitemap.xml`.
3. Make sure the custom domain is connected to this project in Lovable, and ideally
   make it the primary domain so `*.lovable.app` redirects to it.
4. Search Console: verify `pipapo-ricoberto.com`, submit the sitemap and use URL
   Inspection on the homepage to request re-indexing.
5. Keep `SITE_URL` as the single source; never reintroduce a lovable.app URL.

## Local SEO: "Pizza & Pasta in 1030 Wien / Erdberg / Erdbergstraße"
- `FindUs` section on the homepage ("So finden Sie uns in Erdberg, 1030 Wien") with
  address, nearest station (U3 Kardinal-Nagl-Platz), internal links to
  /speisekarte and /lieferung, and a visible FAQ built from `src/data/faq.ts`
  (hours, delivery zones and minimums, pickup all come from existing data).
- Off-site, which matters most for "near Erdbergstraße 101": a complete Google
  Business Profile with identical name, address, phone and hours, the website
  `https://pipapo-ricoberto.com`, photos, and a steady flow of reviews; keep the same
  details on Lieferando/Wolt/Falstaff-style listings.

## Technical checks
- Done in code: `paymentAccepted` in the Restaurant JSON-LD (remove "Credit Card" there if
  only Bankomat/debit is accepted); German 404 page with links to the start page and menu.
- Coordinates (`geo`) are still omitted on purpose (see `seo.test.ts`). To add them: open
  Erdbergstraße 101 in Google Maps, right-click the pin, copy latitude/longitude, then add
  `geo: { "@type": "GeoCoordinates", latitude, longitude }` and update the test.
- Impressum is indexable and in the sitemap (it also holds the allergen info). Add
  `noindex` only if you do not want it to appear in search results.
- PageSpeed: test https://pagespeed.web.dev/ for `/` and `/speisekarte` (mobile).
- Verify the real 404 status: `curl -sI https://pipapo-ricoberto.com/does-not-exist | head -1`
  should print `HTTP/2 404`.

## Performance
- Gallery/hero/logo images converted from JPEG to WebP (about 1.5 MB to 1.0 MB in total; hero
  220 KB to 146 KB, logo 76 KB to 24 KB). `og-image.jpg` stays JPEG for social crawlers.
- Verify after publishing with PageSpeed Insights (mobile) for `/` and `/speisekarte`.

## Search Console
- Ownership verified via DNS (domain provider). Keep the DNS record.
- Sitemap `https://pipapo-ricoberto.com/sitemap.xml` submitted 2026-11-18.
- Blocker: `pipapo-ricoberto.com` still serves an older build with a lovable.app canonical.
  Connect the domain to this Lovable project (Add domain, paid plan), then request indexing.
