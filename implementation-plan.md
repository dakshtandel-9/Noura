# Implementation plan / six-to-eight-week delivery window
The window is the documented estimate, not a new promise. Start after acceptance, verified advance, required assets and access. The sequence below is proposed; parallel work is possible only after the relevant approval. Do not mark percentage completion by counting checkboxes.

## Gate 0 — authorize the start
1. Confirm the legal/client identity and current agreement version.
2. Confirm the ₹27,000 documented scope and any later amendment; verify payment rather than assuming it.
3. Approve the new video-led long-page treatment and separate production-asset costs.
4. Name one decision owner and one consolidated feedback channel.
5. Obtain client-owned account invites, not a collection of shared passwords.
6. Record missing assets/decisions in client-inputs.md.
Evidence: approved brief, scope change log, receipt/status and access inventory.

## Week 1 / Gate 1 — architecture and content
7. Approve the 18 section blocks as one long landing page.
8. Decide public utility routes, exact admin screens and fixed CMS fields.
9. Approve the two form field dictionaries and privacy process.
10. Approve invitation, appointment and member state machines.
11. Decide member-code format and optional QR exclusion/inclusion.
12. Approve the draft voice and remove unverified claims.
13. Plan film, poster, responsive crops and permissions.
14. Choose database provider, runtime and a costed hosting plan.
Evidence: sitemap, requirements, field/data model, content/asset inventory.

## Weeks 2–3 / Gate 2 — high-fidelity UI
15. Approve desktop/mobile hero with footage or clearly labelled stand-in.
16. Lock one palette, typography system and spacing scale.
17. Design all four experience chapters and the session rhythm.
18. Design invitation journey, card, privacy and FAQ.
19. Design both forms in every important state.
20. Design mobile header/menu and keyboard order.
21. Design admin overview, lists, filters, detail and empty/error states.
22. Design member editor and one card template.
23. Review contrast, reduced motion and long text.
24. Get explicit versioned approval before implementing every polished screen.
Evidence: approved UI specification, desktop/mobile screenshots and working-flow prototype.

## Weeks 3–5 / Gate 3 — implement thin vertical slices
25. Initialize TypeScript project, linting, formatting, lockfile and test setup.
26. Add tokens and primitive components; test contrast/focus.
27. Build semantic public sections with local content and real anchors.
28. Implement poster-first hero loading and media controls.
29. Create schema migrations, auth and restrictive row policies.
30. Implement one validated public invitation submission end-to-end.
31. Implement private authorized invitation list/detail.
32. Implement atomic approve/create-or-link-member with audit history.
33. Implement private-session submission and review.
34. Implement member search/edit and stable IDs.
35. Implement one auth-only card export.
36. Add only the approved content/settings fields.
37. Test direct endpoints, malformed input and unauthorized sessions.
38. Add final approved content and optimized assets.
Evidence: staging demo from public submission through private review and card generation.

## Midpoint payment gate
Original documents show 40% / ₹10,800 at approximately 50% completion. Proposed evidence to agree: approved design, responsive page, both forms saved, authorized request review and member creation demonstrated. Do not invoice merely because Week 4 arrived. The advance is 30% / ₹8,100; final 30% / ₹8,100 is due before final production handover, subject to the actual agreement.

## Weeks 6–7 / Gate 4 — verify and accept
39. Run the acceptance matrix across key browsers and device sizes.
40. Test all video fallbacks, blocked autoplay and reduced motion.
41. Test duplicate submissions, simultaneous approvals and network errors.
42. Confirm private-data/cache/storage isolation.
43. Check legal copy, real business details and content permissions.
44. Measure actual media weight and performance; optimize before launch.
45. Restore a backup on staging and test rollback.
46. Run client user-acceptance testing with documented evidence.
47. Resolve blockers; log minor deferred work explicitly.
Evidence: completed test matrix, defect log and signed/recorded acceptance.

## Weeks 7–8 / Gate 5 — launch and handover
48. Verify domain, DNS, TLS, production secrets and account ownership.
49. Verify final payment/approval under the agreement.
50. Deploy known-good release; perform a real submission/review smoke test with controlled data.
51. Remove all prototype labels, sample personal data and placeholder links from production.
52. Give the client source repository, account inventory, instructions and recorded training.
53. Record launch and the start of the documented 12-month maintenance period.
54. Explain small-update versus new-feature boundaries and agree support contact.
55. Review a first backup, form delivery and admin access after launch.
56. Keep an issue/decision log and a follow-up review date.

## AI-assisted development discipline
Use one component or vertical slice per task. Read AGENTS.md first. Require a summary of changed files, actual tests run, known limitations and next dependency. Do not ask a code generator to produce an unchecked “complete platform” in one prompt. Review database permissions and production credentials yourself. UI similarity is not evidence of correct business logic.

## Time/scope protection
Public login, checkout, instant scheduling, clinical profiles, bespoke 3D, complex scroll experiences, broad CMS, automated marketing and extra pages are change requests. Twelve-month maintenance does not mean unlimited redesign or new modules. Stock, filming, hosting and usage fees need separate approval if not explicitly covered.
