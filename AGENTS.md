<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Menu, toppings and delivery zones live in `src/data/menu.ts`; restaurant facts in `src/data/restaurant.ts` — single source for UI and order logic.
- Order/price rules are pure functions in `src/lib/order.ts` with tests in `src/lib/order.test.ts`; components never compute prices themselves.
- Orders are sent via a prefilled WhatsApp link (no backend); the cart persists only in localStorage, read after hydration.
- Mount the cart and site shell in the root route so orders survive navigation between content pages.
- Use the shared SEO helper for leaf metadata and data-derived JSON-LD to keep public facts consistent.
- Keep local food discovery in menu-derived homepage sections linked to the full ordering menu; avoid thin keyword-only pages and unverified coordinates or self-serving rating schema.
- Derive sitemap URLs from required route staticData.sitemap decisions to keep newly added pages discoverable automatically.
