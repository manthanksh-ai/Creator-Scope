# Creator campaign information

Every creator detail response includes a structured campaign profile built from available evidence. Unknown is a missing-data state, not a negative finding or a brand-safety clearance. The field coverage count is not a quality score.

## Evidence

- Existing roster descriptions, series, quotes, engagement figures, fee-card menus and production/category notes retain their source references and remain reported claims.
- Format and tone terms are copied from explicit description text. They are not guessed from age, gender, appearance or audience.
- Public research facts carry sources, retrieval dates, confidence and caveats. Work examples retain publication dates, including historical examples.
- Creator age bands, availability, interests, declined categories, interviews, events, family collaborations and practical constraints require dated creator/authorized-representative confirmation before being displayed as confirmed.
- A post featuring a fictional father character does not verify participation by the creator's own father. Family examples require a direct public post; consent for a future collaboration is a separate field.
- Audience age/gender percentages stay blank until supplied through Insights. Creator topics do not establish audience interests. Reach, growth, quality and campaign results remain Unknown without supported evidence.

## Search

`creatorText` includes sourced topic, format and tone notes alongside original content descriptions and series. It excludes audience guesses, unknown preferences and unrelated source-page text. Matches relying on added research themes are flagged for confirmation.

## Photos

`profileImage` is an optional object containing `url`, `source`, `observedAt`, `platform` and `basis`. Photos must be matched to the existing Instagram handle. Directory snapshots are not a live Instagram connection. Broken or unavailable images fall back to initials. Do not substitute a lookalike, generated portrait, related-profile image or stock photo.

## Enrichment progress

`enrichmentCoverage` and `photoCoverage` expose aggregate coverage only. New research covers an initial ten profiles; the presence of the profile structure does not mean all 3,119 creators have been researched. More research is required to resolve Unknown values. No full-database export has been added.

Detailed newly extracted fee menus and commercial/SOP instructions are held in ignored local work files pending explicit approval for public disclosure. They are excluded from the published database and public GitHub source.

## October 21 brand workspace revision

The public profile now hides unsupported fields and shows content/work examples, known basics and public contact links. No audience entry form, profile rate editor or blank safety questionnaire is shown. Country is derived from the listed city and describes location, not citizenship. Age bands require supporting evidence and are never estimated from appearance.

New measured inputs use `reelMetrics`: ten public reel URLs, captured counts, collection date and publication dates or explicit grid-order evidence with pinned posts excluded. Rounded Instagram counts produce an explicitly approximate average. Estimated reach is 75% of that average and is only a planning proxy, not measured unique reach. Combined engagement sums likes, comments, saves and shares across all ten reels, divided by followers at capture. Every component must be available; absent saves/shares are never zero. Signing into a viewer account does not unlock other creators’ private Insights.

The initial new reel sample is Rajan Arora only. The remaining creator library has not been refreshed with ten-reel samples. Older reported averages retain a separate unverified-window label. The public API removes historical commercial terms and rates unless `publicRateApproved` is explicitly true. New detailed agency menus/SOPs remain private by the owner's instruction.

AI quota/configuration failures fall back to a clearly labelled keyword brief parser. This keeps shortlist search usable but is not a successful model inference. API credits must be supplied by the owner to restore model-based interpretation.

## Broad public performance pass

Public directory lookups were attempted for all 2,612 known Instagram handles. Only records with actual primary-profile metrics survive the import; empty directory records are rejected. Their displayed view averages and engagement figures retain a public source, retrieval date and an unverified sampling-window/formula warning. They are never relabelled as our last-ten formula. Approved public engagement calculation uses combined likes/comments from ten verified reels divided by captured followers; full engagement additionally requires saves and shares. Both remain absent when their inputs are incomplete. Compact counts use K/M with up to two decimals.

The original photo collector could take the first similar-creator image from an empty profile. Ten such image assignments were quarantined in this audit, including Sarvesha Swar. Her incorrect portrait is removed; initials are used until a correct image can be saved. Her public reel grid was reviewed directly and a rounded ten-reel view sample added. No audience estimates, inferred age, personal-family assumptions or commercial details were introduced by the directory import.

## Five-reel fallback and 2,500-profile coverage

The owner approved Instagram-only coverage and five latest non-pinned reels when ten were not captured. The shared calculator accepts dated/ordered five- or ten-reel samples and labels the actual sample size. Nine additional public Instagram grids were reviewed directly (six ten-reel samples, three five-reel samples); rounded public counts remain approximate. Exact public URLs are retained for every sampled reel.

A second directory pass added 178 source-linked Qoruz reported view averages, with exact-handle matching and no private report access. The resulting 2,500 Instagram profiles have available average views, a 75% reach planning proxy and a view-to-follower ratio. Of these, 2,437 have a directory-reported engagement figure. The remaining 63 do not receive an invented engagement rate. `Average views / followers × 100` is labelled view-to-follower rate, not engagement; it can exceed 100% and may combine snapshots from different dates. Public engagement still requires actual likes/comments, and full engagement also needs saves/shares. No YouTube views are included in these counts.
