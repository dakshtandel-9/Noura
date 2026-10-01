import { IntroLoader } from "@/components/layout/IntroLoader";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { ExperienceTiles } from "@/components/sections/ExperienceTiles";
import { Experts } from "@/components/sections/Experts";
import { Hero } from "@/components/sections/Hero";
import { InvitationJourney } from "@/components/sections/InvitationJourney";
import { InvitationRequest } from "@/components/sections/InvitationRequest";
import { MeetYourGuide } from "@/components/sections/MeetYourGuide";
import { MemberIdentity } from "@/components/sections/MemberIdentity";
import { PrivateSession } from "@/components/sections/PrivateSession";
import { Questions } from "@/components/sections/Questions";
import { SharedExperience } from "@/components/sections/SharedExperience";

/**
 * The landing page, built section by section in the narrative order of
 * docs/site-structure.md, opened by the intro loader (wordmark heartbeat → header). Current slice: header → arrival → overview strip → experience tiles →
 * shared experience → guide (when approved) → experts → invitation journey → member identity → invitation request →
 * private-session request → questions → closing invitation → closing footer.
 */
export default function HomePage() {
  return (
    <>
      <IntroLoader />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <ExperienceStrip />
        <ExperienceTiles />
        <SharedExperience />
        <MeetYourGuide />
        <Experts />
        <InvitationJourney />
        <MemberIdentity />
        <InvitationRequest />
        <PrivateSession />
        <Questions />
        <ClosingInvitation />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
