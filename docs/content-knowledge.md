# Creator content knowledge, 5 November 2026

- The local public-profile collector checks one public directory profile per Instagram account, and channel metadata for YouTube-only entries. It checks exact Instagram handles, checkpoints every 40 profiles and stops a host after 403/429.
- No logins, contact databases, private APIs or paid model calls are used.
- The knowledge preparation step preserves existing post-reviewed summaries and roster descriptions, derives a short labelled summary from known source categories or explicit public-bio content phrases, and leaves unsupported profiles marked for research.
- Public bios are excerpts of at most 24 words. Emails, phone-like numbers, management/booking lines and links are excluded. Public directory category proportions describe content classification, never audience demographics.
- Source dates are retrieval dates, not freshness guarantees. No recent-reel review is implied by a bio or directory snapshot.
- `content-search.mjs` performs weighted BM25-style retrieval with a transparent related-term dictionary. It is free text retrieval, not an LLM, embedding model or autonomous content verification system.
- Matching excludes creator names/handles from topic evidence. Audience, family appearances, rates, availability and brand suitability are never inferred from generic categories.
- Existing sensitive source links and financial notes remain server-side. Only selected, filtered source evidence is returned by the creator API.

## Runtime behaviour

Descriptions, source labels and topic evidence are stored in `contentKnowledge`. Ranking uses the brief text and recorded content, with a BM25-style related-term layer inside the 40% mandate component. Profile names and handles do not establish topic fit. Existing budget, views, audience and past-campaign components retain their 20/20/10/10 weights.

The coverage panel distinguishes supported summaries from public-source checks. A missing or inaccessible public profile does not become a verified creator description. Refreshing a source is not a review of recent videos, audience quality or brand safety.
