# Hosted AI intelligence

The private Site deploys `/api/status` and `/api/ai-plan` on a server. `OPENAI_API_KEY` is a hosted secret; `AI_MODEL` selects the model. No credentials ship to the browser. Local credentials remain in ignored `.env.local`.

Brief interpretation uses the OpenAI Responses API with strict structured output, `store:false`, a request size limit and timeout. The AI extracts requirements; deterministic source-based matching selects only imported profiles and flags missing mandatory evidence. A successful interpretation verifies the provider connection; configuration alone is not reported as a verified request. Provider errors are shown explicitly.

Planning KPIs include cost, reported average views, CPV, cost per 1,000 reported views, budget remaining, mandate verification and rate/view coverage. CPV is unknown unless all selected rows have costs and views with a positive total view denominator. These are planning indicators, not measured campaign results or unique reach.

The API key selected in the secure setup flow expires after 30 days. Rotate it through OpenAI Developers and update the hosted secret before expiry.

# Data coverage and commercial rollout

The current database includes the supplied roster sources, Monk Entertainment and the nine Blue Orchid profiles. It does not cover all Indian creators. The import date is the date the source was read, not the date a follower count or fee was measured. Multiple source values and agency associations are retained without claiming current exclusive representation.

The website is a private pilot. Agency billing, separate agency workspaces, permissions for multiple teams, licensed live data, Instagram background refresh and routine roster sync are not enabled. Saved plans, edited rates and uploaded Insights remain in the current browser. Review the rights and current validity of source roster data before selling access to it.

To rebuild from the imported roster snapshots:

1. `node import-rosters.mjs`
2. `node build-site.mjs`
3. `node checks.mjs`

Source rows and hyperlink metadata are retained in the private source repository. The deployed site contains only planning fields, provenance links and the public-facing interface; manager names, contact information and precise addresses are not exposed as profile fields.
