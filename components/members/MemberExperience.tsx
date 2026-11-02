import Image from "next/image";
import Link from "next/link";
import { UserSignOut } from "@/components/account/UserSignOut";
import { MemberIdentity } from "@/components/sections/MemberIdentity";
import { Icon } from "@/components/ui/Icon";
import { memberChapters, memberPhotos, preparationSteps, retreatDays, salonThemes, type MemberPhoto } from "@/content/members";
import { media } from "@/content/site";
import type { MemberCardAccount } from "@/lib/user-accounts";
import styles from "./MemberExperience.module.css";

function Photo({ photo, className = "", sizes = "(max-width: 767px) 100vw, 50vw", eager = false }: {
  photo: MemberPhoto;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return <Image className={`${styles.photo} ${className}`} src={photo.src} width={1536} height={1024} alt={photo.alt} sizes={sizes} loading={eager ? "eager" : "lazy"} />;
}

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className={styles.chapterLabel}><span>{number}</span><span className={styles.chapterRule} aria-hidden="true" />{children}</p>;
}

/** Server-rendered editorial content. The owning route authorizes access before rendering it. */
export function MemberExperience({ account }: { account: MemberCardAccount }) {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.container}>
        <div className={styles.accountBar}>
          <span className={styles.accountLabel}><Icon name="lock" size={14} /> The private edition</span>
          <UserSignOut />
        </div>

        <header className={styles.intro}>
          <p className={styles.eyebrow}>A closer look at the NOURA experience</p>
          <h1>Your time.<br /><em>Beautifully considered.</em></h1>
          <p>A slower rhythm. A smaller circle. Space to return to yourself.</p>
          <span className={styles.introRule} aria-hidden="true" />
          <p className={styles.previewNote}>An invitation to imagine. This retreat preview uses conceptual imagery; the programme, location and services are subject to confirmation.</p>
        </header>

        <nav className={styles.chapterNav} aria-label="Member page chapters">
          {memberChapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`}>{chapter.label}</a>)}
        </nav>

        <section id="three-days" className={styles.section} aria-labelledby="days-title">
          <div className={styles.sectionHeading}>
            <div><ChapterLabel number="01">The three days</ChapterLabel><h2 id="days-title">A rhythm, <em>not a rush.</em></h2></div>
            <p>Time to arrive. Space to explore.<br />Something to carry home.</p>
          </div>
          <div className={styles.dayGrid}>
            {retreatDays.map((day) => (
              <article className={styles.dayCard} key={day.number}>
                <div className={styles.dayPhoto}><Photo photo={day.photo} eager sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 400px" /></div>
                <div className={styles.dayBody}>
                  <div className={styles.dayTop}><span className={styles.eyebrow}>{day.day}</span><span className={styles.dayNumber} aria-hidden="true">{day.number}</span></div>
                  <h3>{day.title}</h3>
                  <p className={styles.dayDescription}>{day.description}</p>
                  <ul>{day.moments.map((moment) => <li key={moment}>{moment}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.sectionNote}>An illustrative three-day journey. The confirmed programme will be shared personally.</p>
        </section>

        <section id="nourish" className={`${styles.section} ${styles.editorial}`} aria-labelledby="nourish-title">
          <div className={styles.editorialImage}><Photo photo={memberPhotos.nourish} /></div>
          <div className={styles.editorialCopy}>
            <ChapterLabel number="02">The food</ChapterLabel>
            <h2 id="nourish-title">Nourish.</h2>
            <p className={styles.lead}>A place at the table.<br />A moment to savour.</p>
            <p>Food is part of the experience. Fresh, seasonal ingredients. Thoughtful preparation. The pleasure of slowing down over something beautiful.</p>
            <p>From the first morning coffee to a long-table dinner, the idea is simple: nourishment and enjoyment, together.</p>
            <div className={styles.quietDetail}><Icon name="leaf" size={20} /><span>Seasonal. Thoughtful. Shared.</span></div>
            <a className={styles.textLink} href="#concierge">Discuss your preferences <Icon name="arrow-right" size={18} /></a>
          </div>
        </section>

        <section id="salons" className={`${styles.section} ${styles.editorial} ${styles.salon}`} aria-labelledby="salons-title">
          <div className={styles.editorialImage}><Photo photo={memberPhotos.salons} /></div>
          <div className={styles.editorialCopy}>
            <ChapterLabel number="03">The salons</ChapterLabel>
            <h2 id="salons-title">Conversations<br />that <em>matter.</em></h2>
            <p>Small circles. Interesting perspectives. Questions worth staying with. A chance to listen, share and connect without a stage or a script.</p>
            <p className={styles.smallLabel}>Possible conversations</p>
            <ul className={styles.themeList}>{salonThemes.map((theme) => <li key={theme}>{theme}</li>)}</ul>
            <p className={styles.aside}>Bring your curiosity. There is room for your point of view.</p>
          </div>
        </section>

        <section id="evening" className={`${styles.section} ${styles.evening}`} aria-labelledby="evening-title">
          <div className={styles.eveningImage}><Photo photo={memberPhotos.evening} sizes="(max-width: 767px) 100vw, 60vw" /></div>
          <div className={styles.eveningCopy}>
            <ChapterLabel number="04">The evening</ChapterLabel>
            <h2 id="evening-title">When the sun<br />goes down,<br /><em>we slow down.</em></h2>
            <p>The warmth of a fire. Dinner that takes its time. Music, sound and conversation that drift into the night.</p>
            <span className={styles.eveningRule} aria-hidden="true" />
            <p className={styles.eveningClosing}>A different kind of evening.<br />A little closer to one another.</p>
          </div>
        </section>

        <section id="your-journey" className={`${styles.section} ${styles.editorial} ${styles.journey}`} aria-labelledby="journey-title">
          <div className={styles.deviceStage}>
            <div className={styles.device} aria-label="Illustrative personal journey preview">
              <span className={styles.deviceSpeaker} aria-hidden="true" />
              <div className={styles.deviceImage}><Photo photo={memberPhotos.arrival} sizes="300px" /></div>
              <div className={styles.deviceContent}>
                <Image src={media.wordmarkTransparent.src} width={media.wordmarkTransparent.width} height={media.wordmarkTransparent.height} alt="NOURA" sizes="100px" />
                <p className={styles.deviceTitle}>Make room<br />for yourself.</p>
                <p className={styles.deviceLabel}>Your intention</p>
                <ul><li>Rest & reset</li><li>Reconnect</li><li>Find clarity</li><li>Simply be</li></ul>
              </div>
            </div>
            <p className={styles.deviceCaption}>A glimpse of your journey</p>
          </div>
          <div className={styles.editorialCopy}>
            <ChapterLabel number="05">Your journey</ChapterLabel>
            <h2 id="journey-title">Your retreat.<br /><em>Your rhythm.</em></h2>
            <p className={styles.lead}>Everyone arrives with something different.</p>
            <p>Some come to rest. Some to reconnect. Some to find clarity. Some simply to breathe.</p>
            <p>Your experience begins with what matters to you. Take a moment to consider what you would like from these three days, and what you might leave behind.</p>
            <a href="#before-arrival" className={styles.textLink}>Before you arrive <Icon name="arrow-right" size={18} /></a>
          </div>
        </section>

        <section id="before-arrival" className={`${styles.section} ${styles.preparation}`} aria-labelledby="preparation-title">
          <div>
            <ChapterLabel number="06">The pre-retreat journey</ChapterLabel>
            <h2 id="preparation-title">It begins<br /><em>before you arrive.</em></h2>
            <p className={styles.preparationIntro}>Small moments of preparation. A gentler way into the experience.</p>
            <ol className={styles.timeline}>
              {preparationSteps.map((step) => <li key={step.timing}><p className={styles.smallLabel}>{step.timing}</p><h3>{step.title}</h3><p>{step.text}</p></li>)}
            </ol>
            <p className={styles.previewNote}>Example timing only. Your preparation and arrival details will be confirmed individually.</p>
          </div>
          <div className={styles.preparationVisual}>
            <div className={styles.preparationImage}><Photo photo={memberPhotos.garden} /></div>
            <div className={styles.preparationQuote}><Icon name="leaf" size={24} /><p>A little less noise.<br /><em>A little more presence.</em></p></div>
          </div>
        </section>

        <section id="concierge" className={`${styles.section} ${styles.concierge}`} aria-labelledby="concierge-title">
          <div className={styles.conciergeImage}><Photo photo={memberPhotos.concierge} /></div>
          <div className={styles.conciergeCopy}>
            <ChapterLabel number="07">The concierge</ChapterLabel>
            <h2 id="concierge-title">The little things.<br /><em>Thoughtfully considered.</em></h2>
            <p>A personal conversation about the details that help you feel at ease, from arriving comfortably to feeling at home.</p>
            <ul className={styles.preferenceList}><li>Travel & arrival</li><li>Dietary preferences</li><li>Room preferences</li><li>Personal requests</li></ul>
            <p className={styles.conciergeClosing}>You focus on being here.<br />Let’s talk about the rest.</p>
            <Link href="/contact" className={styles.textLink}>Speak with the NOURA team <Icon name="arrow-right" size={18} /></Link>
            <p className={styles.previewNote}>Support and arrangements are subject to individual confirmation.</p>
          </div>
        </section>

      </div>

      <div className={`${styles.section} ${styles.identity}`}>
        <MemberIdentity account={account} />
      </div>

    </main>
  );
}
