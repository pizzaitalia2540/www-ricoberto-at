import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { NAV } from "@/components/site/SiteHeader";
import { sitemapStaticPaths } from "@/lib/sitemap";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("includes every public restaurant page but not the sitemap itself", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(sitemapStaticPaths(router)).toEqual([
      "/",
      "/en",
      "/galerie",
      "/impressum",
      "/kontakt",
      "/lieferung",
      "/speisekarte",
      "/ueber-uns",
    ]);
  });
  it("links Über uns, Galerie and Kontakt to their own pages, with no # in the address", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const expected = [
      { label: "Über uns", to: "/ueber-uns" },
      { label: "Galerie", to: "/galerie" },
      { label: "Kontakt", to: "/kontakt" },
    ] as const;

    for (const { label, to } of expected) {
      const entry = NAV.find((n) => n.label === label);
      if (!entry) throw new Error(`The menu is missing the "${label}" entry`);
      expect(entry).toEqual({ to, hash: "", label });

      const href = router.buildLocation({ to: entry.to, hash: entry.hash }).href;
      expect(href).not.toContain("#");
      expect(router.matchRoutes(href).at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
