# Site structure / one long story
Status: proposed expansion of the documented landing-page sections; section splits are not automatically extra pages. The new long-page direction is S5. The client must approve content effort and modules before development.

## Public route inventory
- `/` — the complete long landing page.
- `/privacy` and `/terms` — proposed utility pages for client-provided wording; confirm whether implemented as pages or accessible panels within the agreed scope.
- Success and error states — inline in each form. No separate public membership profile or booking confirmation route.
- No Journal/blog, ecommerce, open registration, extra experience-detail pages or real-time calendar in the base build.

## Ordered section specification
### 00. Orientation — `#header`
**Story beat:** Know where you are.

**Build:** Gold wordmark on white; Philosophy, Experiences, Your invitation anchors. Primary invitation button. Mobile menu.

**Basis:** S1 p4; navigation details proposed.

### 01. Arrival / video hero — `#arrive`
**Story beat:** A quieter moment. A deeper connection.

**Build:** Silent full-bleed background film, permanent pause/play control, poster fallback, invitation CTA and explore anchor.

**Basis:** S1 p5 + latest user instruction.

### 02. A pause in the story — `#pause`
**Story beat:** You do not have to fill every moment.

**Build:** Brief typographic interlude; fewer than 45 words; no timer or enforced breathing exercise.

**Basis:** Proposed story treatment.

### 03. The NOURA intention — `#philosophy`
**Story beat:** A little less noise. A little more presence.

**Build:** Asymmetric copy and arched still; approved philosophy, not an invented founder history.

**Basis:** S1 p6 + Option 3.

### 04. Experience index — `#experiences`
**Story beat:** Four ways to come back to the moment.

**Build:** Move / Be still / Listen / Connect. Four icon-led anchor cards, not four new pages.

**Basis:** S1 pp4,6; treatment proposed.

### 05. Chapter 01 / Move — `#yoga`
**Story beat:** Movement, without the rush.

**Build:** Yoga editorial split; short concrete description; private-session CTA preselects Yoga.

**Basis:** S1 p6.

### 06. Chapter 02 / Be still — `#meditation`
**Story beat:** Make room for stillness.

**Build:** Reversed split; meditation image; no promise of treating anxiety or other conditions.

**Basis:** S1 p6.

### 07. Chapter 03 / Listen — `#sound`
**Story beat:** Let the moment unfold in sound.

**Build:** Olive-toned interlude and sound-bowl image; no autoplay audio; session CTA.

**Basis:** S1 p6.

### 08. Chapter 04 / Connect — `#connection`
**Story beat:** A shared moment. A smaller circle.

**Build:** Private group imagery; invitation-led copy; no made-up capacity or guaranteed availability.

**Basis:** S1 p6.

### 08a. Meet your guide — `#guide` (optional, pending verified content)
**Story beat:** Who holds the practice.

**Build:** One 45/55 editorial portrait-and-copy section after the shared experience. Publish only after the client supplies and approves the real practitioner's name, exact role, short biography, portrait and image rights. Omit unverified credentials and practice labels; hide the whole section while these inputs are absent.

**Basis:** Owner request, 1 October 2026.

### 09. Session rhythm — `#rhythm`
**Story beat:** Unhurried, from beginning to end.

**Build:** Arrive / Settle / Explore / Close. Clearly proposed rhythm pending operational approval.

**Basis:** New illustrative story module.

### 10. Sensory pause — `#space`
**Story beat:** Room to slow down.

**Build:** One wide still with minimal copy; conceptual setting, not a claim about the actual venue.

**Basis:** Proposed art direction.

### 11. How access works — `#journey`
**Story beat:** A thoughtful welcome, not an instant booking.

**Build:** Share interest → team reviews → approved visitors receive next steps. Appointment requests are separate from membership approval.

**Basis:** S1 p7.

### 12. Member identity — `#member`
**Story beat:** A personal detail. A sense of belonging.

**Build:** One sample card with a demonstration name and ID; no working QR and no real personal data.

**Basis:** S1 p8; QR remains optional.

### 13. Privacy / reassurance — `#care`
**Story beat:** Care includes how we handle your details.

**Build:** Plain explanation of restricted review and human follow-up. No “100% secure” claims or fake credentials.

**Basis:** S1 pp9–10.

### 14. Questions before you begin — `#questions`
**Story beat:** A few things, gently clarified.

**Build:** Accessible disclosure items about invitations, preferred dates, payments and two types of request.

**Basis:** Proposed within landing content.

### 15. Invitation form — `#invitation`
**Story beat:** Your next chapter starts with a conversation.

**Build:** Name, email, optional phone, referral/source, interests and approved privacy acknowledgement. Manual review.

**Basis:** S1 p7; field rules proposed.

### 16. Private-session form — `#private-session`
**Story beat:** Prefer a private session?

**Build:** Name, email, optional phone, session type, date preference and optional message. Never instant confirmation.

**Basis:** S1 p7.

### 17. Closing / footer — `#footer`
**Story beat:** Come as you are. Take your time.

**Build:** Gold logo, same page anchors, approved contact and social links, privacy/terms. Hide unprovided social links.

**Basis:** S1 p4.

## Storytelling without losing usability
Keep the opening short enough to explain the offering within the first two screens. Repeat invitation actions at the hero, the access chapter and the primary form, not after every paragraph. The experience index lets task-focused visitors skip directly to the section they need. A floating or sticky CTA must not cover form inputs or keyboard focus on mobile.

## Admin route inventory (private)
`/admin/login`, `/admin`, `/admin/appointments`, `/admin/appointments/[id]`, `/admin/invitations`, `/admin/invitations/[id]`, `/admin/members`, `/admin/members/[id]`, `/admin/members/[id]/card`, `/admin/settings` (only agreed fields). These describe the recommended application architecture; the HTML is not a secure implementation of them.

## Definition of done for the structure
Each visible link leads to an implemented destination. All headings form a sensible outline. The page works in a single-column reading order. Programme links reach the correct chapter or preselect the correct form choice. A request can be started without completing the story, watching video or accepting marketing.
