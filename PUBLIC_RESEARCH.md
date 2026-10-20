# Public creator expansion

Approved scope: profiles with 10,000+ publicly reported Instagram followers across all genres in the 30 cities enumerated in `src/database.json.discoveryCoverage.cities`. This is a non-exhaustive public-source sample, not an all-India census. Existing supplied roster records remain intact, including those below this threshold.

## Rebuild

`node expand-public-creators.mjs` merges the three `research-*.json` files into the current database by canonical Instagram profile. Existing IDs and roster values remain stable. New evidence is attached separately and conflicts remain visible. `public-expansion-audit.json` records the most recent merge; source files are retained for reproducibility. `node build-site.mjs` copies only browser assets into `public`; the database is bundled only into server routes before the framework build.

## Evidence

Public directories are third-party observations. A profile appearing on a city's list is not proof of its present base. Audience-location rankings were excluded from creator-location evidence. City-based matches for new directory-only profiles are provisional. Dates shown are dates the public source was inspected, not fresh Instagram measurements, unless a separate source measurement date is available. Rounded published follower figures stay reported snapshots.

Creators are not assigned an agency based on discovery. The `Public research` label in source filters is a provenance group only. New source fields have no estimated costs, reel views, demographics, creator gender, languages, family/child claims or age. Unknowns remain null/empty in JSON and display as Unknown. Full names absent from the source are identified by @handle and explicitly marked Unknown in the profile evidence panel.

Community/editorial pages were excluded. Source-review corrections and any unresolved multi-city claims are retained as caveats. No claim is made that directories have independently validated each profile or that every city/genre is complete.
