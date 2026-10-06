import { IntroLoader } from "@/components/layout/IntroLoader";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ClosingBanner } from "@/components/sections/ClosingBanner";
import { FounderNote } from "@/components/sections/FounderNote";
import { Enquire } from "@/components/sections/Enquire";
import { ExperienceTiles } from "@/components/sections/ExperienceTiles";
import { Hero } from "@/components/sections/Hero";
import { MeetYourGuide } from "@/components/sections/MeetYourGuide";
import { Place } from "@/components/sections/Place";
import { Practitioners } from "@/components/sections/Practitioners";
import { Stages } from "@/components/sections/Stages";
import { Story } from "@/components/sections/Story";

/**
 * Current landing narrative: arrival → story → founder note → stages → experiences →
 * place → expandable practitioners → enquire → approved guide → close.
 */
export default function HomePage() {
  return (
    <>
      <IntroLoader />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story />
        <FounderNote />
        <Stages />
        <ExperienceTiles />
        <Place />
        <Practitioners />
        <Enquire />
        <MeetYourGuide />
        <ClosingBanner />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
