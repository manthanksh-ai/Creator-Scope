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
