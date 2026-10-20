# Creator directory access

Full database export UI and browser-side export function have been removed. The old `/database.json` path responds with HTTP 410. The full source database remains server-only. `/api/catalog` returns metadata and three featured summaries; `/api/creators` returns a fixed page of 24 summaries; `/api/creator` returns one profile; `/api/matches` computes source-based matches server-side and returns at most 300 campaign candidates. No full-database download route is provided.

The website remains public as requested. Visible profiles can be copied, and repeated public queries can be automated; this is not a guarantee against scraping. Stronger controls require an authenticated access policy, persistent rate limits and/or a membership plan. Campaign-plan exports remain available for selected creators.

Named creator identity, current city and management are separate claims. No creator is called unmanaged merely because no supplied roster lists them. Instagram and YouTube profile paths are indexed and displayed; missing accounts are Unknown.

OML October 2026: artist names, source-linked social IDs, published platform counts and genres only. No audience charts or audience top cities imported as creator location. LVC Media February 2026: quote rows tied to deliverables, historical only. Terms state two-week email validity, GST18% extra and10% collab surcharge; email date is unknown. Historical quotes do not become a new default active cost.
