/* Landing-page checks (UI-level only — no backend exists yet).
   Run from the repository root:
     python3 -m http.server 8765 &
     NODE_PATH="$(npm root -g)" node tests/landing.check.cjs
   Uses fake data only. Screenshots go to $SHOTS_DIR when set. */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = process.env.LANDING_URL || 'http://localhost:8765/site/';
const SHOTS = process.env.SHOTS_DIR || '';
const results = [];
function check(id, name, pass, detail) {
  results.push({ id, name, pass: !!pass, detail: detail || '' });
}

const ORDER = ['header', 'arrive', 'pause', 'philosophy', 'experiences', 'yoga', 'meditation', 'sound',
  'connection', 'rhythm', 'space', 'journey', 'member', 'care', 'questions', 'invitation',
  'private-session', 'footer'];

async function makeWebm(browser) {
  const page = await browser.newPage();
  await page.goto('about:blank');
  const b64 = await page.evaluate(async () => {
    const c = document.createElement('canvas'); c.width = 320; c.height = 180;
    const ctx = c.getContext('2d');
    const rec = new MediaRecorder(c.captureStream(25), { mimeType: 'video/webm' });
    const chunks = []; rec.ondataavailable = (e) => chunks.push(e.data);
    let t = 0; const iv = setInterval(() => { ctx.fillStyle = `hsl(${140 + (t++ % 20)},20%,30%)`; ctx.fillRect(0, 0, 320, 180); }, 40);
    rec.start(); await new Promise((r) => setTimeout(r, 1500)); rec.stop();
    await new Promise((r) => (rec.onstop = r)); clearInterval(iv);
    const buf = await new Blob(chunks, { type: 'video/webm' }).arrayBuffer();
    let s = ''; new Uint8Array(buf).forEach((b) => (s += String.fromCharCode(b))); return btoa(s);
  });
  await page.close();
  return Buffer.from(b64, 'base64');
}

(async () => {
  const browser = await chromium.launch();

  /* Responsive, structure, console */
  for (const width of [320, 390, 768, 1024, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    await page.goto(URL, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check('UX-02', `no horizontal overflow @${width}px`, overflow <= 0, `overflow=${overflow}px`);
    check('JS', `no script errors @${width}px`, errors.length === 0, errors.join(' | '));
    const menuVisible = await page.isVisible('[data-menu-toggle]');
    const navVisible = await page.isVisible('.site-nav');
    check('UX-01', `either inline nav or menu toggle visible @${width}px`, menuVisible !== navVisible, `menu=${menuVisible} nav=${navVisible}`);
    if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `landing-${width}.png`), fullPage: true });
    await ctx.close();
  }

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const apiCalls = [];
  page.on('request', (r) => { if (/\/api\//.test(r.url())) apiCalls.push(r.url()); });
  await page.goto(URL, { waitUntil: 'networkidle' });

  const s = await page.evaluate((ORDER) => {
    const h = [...document.querySelectorAll('h1,h2,h3,h4')].map((e) => +e.tagName[1]);
    let skip = false; for (let i = 1; i < h.length; i++) if (h[i] - h[i - 1] > 1) skip = true;
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id).filter((id) => ORDER.includes(id));
    const dead = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1))
      .filter((id) => id && !document.getElementById(id));
    const imgsNoAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length;
    const unlabeled = [...document.querySelectorAll('input:not([type=hidden]),select,textarea')]
      .filter((el) => !el.closest('.hp-field') && !el.closest('label') && !(el.id && document.querySelector(`label[for="${el.id}"]`))).length;
    const bodyText = document.body.innerText;
    return {
      h1: document.querySelectorAll('h1').length, skip, ids, dead, imgsNoAlt, unlabeled,
      skipLink: !!document.querySelector('a.skip-link[href="#main"]'),
      landmarks: ['header', 'main', 'footer', 'nav'].every((t) => document.querySelector(t)),
      banned: /(100% secure|testimonial|award|guarantee|limited places|last few)/i.test(bodyText),
      typesetLogo: [...document.querySelectorAll('.brand, .site-footer__close')].some((el) => /NOURA/.test(el.innerText)),
    };
  }, ORDER);
  check('UX-05', 'exactly one H1', s.h1 === 1, `h1=${s.h1}`);
  check('UX-05', 'no skipped heading levels', !s.skip);
  check('UX-05', 'skip link and landmarks', s.skipLink && s.landmarks);
  check('UX-01', 'no dead in-page anchors', s.dead.length === 0, s.dead.join(','));
  check('STRUCT', 'section order matches site-structure.md', JSON.stringify(s.ids) === JSON.stringify(ORDER), s.ids.join(' → '));
  check('A11Y', 'every image has alt; every control labelled', s.imgsNoAlt === 0 && s.unlabeled === 0, `noAlt=${s.imgsNoAlt} unlabeled=${s.unlabeled}`);
  check('UX-07', 'no banned claims in copy', !s.banned);
  check('UX-08', 'logo is never typeset as text', !s.typesetLogo);

  /* Programme preselection (components.md interaction mapping) */
  for (const [label, value] of [['Request a yoga session', 'Yoga'], ['Request a meditation session', 'Meditation'], ['Explore a sound session', 'Music & Sound']]) {
    await page.click(`text=${label}`);
    await page.waitForTimeout(700);
    const st = await page.evaluate(() => ({ v: document.getElementById('ses-type').value, f: document.activeElement.id, h: location.hash }));
    check('UX-01', `"${label}" preselects ${value} and focuses selector`, st.v === value && st.f === 'ses-type' && st.h === '#private-session', JSON.stringify(st));
  }
  const connectHref = await page.getAttribute('#connection a.button', 'href');
  check('UX-01', 'Private-group chapter leads to invitation form', connectHref === '#invitation');

  /* Invitation form: required-field errors, then valid demo submission.
     Smooth scrolling is disabled here so pointer actions don't race the scroll animation. */
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL + '#invitation', { waitUntil: 'networkidle' });
  await page.click('#invitation-form [data-submit]');
  const inv = await page.evaluate(() => ({
    summary: !document.querySelector('#invitation-form [data-error-summary]').hidden,
    focused: document.activeElement.matches('#invitation-form [data-error-summary]'),
    invalid: [...document.querySelectorAll('#invitation-form [aria-invalid="true"]')].map((e) => e.name),
  }));
  check('FORM-03', 'empty invitation shows linked error summary with focus', inv.summary && inv.focused);
  check('FORM-03', 'required invitation fields flagged', ['full_name', 'email', 'interests', 'privacy_acknowledged'].every((n) => inv.invalid.includes(n)) && inv.invalid.length === 4, inv.invalid.join(','));

  await page.fill('#inv-name', 'A');
  await page.fill('#inv-email', 'not-an-email');
  await page.fill('#inv-interests', 'short');
  await page.fill('#inv-phone', 'abc');
  await page.click('#invitation-form [data-submit]');
  const inv2 = await page.$$eval('#invitation-form [aria-invalid="true"]', (els) => els.map((e) => e.name));
  check('FORM-04', 'too-short name/interest, bad email and bad phone rejected', ['full_name', 'email', 'interests', 'phone'].every((n) => inv2.includes(n)), inv2.join(','));

  await page.fill('#inv-name', 'Test Visitor');
  await page.fill('#inv-email', 'visitor@example.com');
  await page.fill('#inv-phone', '+00 000 000');
  await page.fill('#inv-interests', 'Quiet time and a small group practice.');
  await page.check('#inv-privacy');
  const key1 = await page.inputValue('#invitation-form [data-idempotency]');
  await page.click('#invitation-form [data-submit]');
  const busy = await page.evaluate(() => document.querySelector('#invitation-form [data-submit]').disabled);
  check('FORM-06', 'submit button disabled while submitting (duplicate guard)', busy);
  await page.waitForSelector('#invitation-form .form-status__title', { timeout: 3000 });
  const statusText = await page.textContent('#invitation-form [data-status]');
  const key2 = await page.inputValue('#invitation-form [data-idempotency]');
  check('FORM-01', 'valid invitation shows generic acknowledgement, no approval claim',
    /not a confirmed booking or membership approval/.test(statusText) && /nothing was sent/.test(statusText));
  check('FORM-01', 'fresh idempotency key after a completed request', key1 && key2 && key1 !== key2);

  /* Session form: past date rejected */
  await page.fill('#ses-name', 'Test Visitor');
  await page.fill('#ses-email', 'visitor@example.com');
  await page.selectOption('#ses-type', 'Meditation');
  await page.fill('#ses-date', '2020-01-01');
  await page.check('#ses-privacy');
  await page.click('#session-form [data-submit]');
  const dateErr = await page.textContent('#ses-date-error');
  check('FORM-05', 'past preferred date rejected', /future/.test(dateErr), dateErr);
  await page.fill('#ses-date', '');
  await page.click('#session-form [data-submit]');
  await page.waitForSelector('#session-form .form-status__title', { timeout: 3000 });
  check('FORM-02', 'valid session request acknowledged without confirming a booking', /not a confirmed booking/.test(await page.textContent('#session-form [data-status]')));
  check('DEMO', 'demo forms made no network request to /api', apiCalls.length === 0, apiCalls.join(','));

  await page.emulateMedia({ reducedMotion: 'no-preference' });

  /* FAQ keyboard */
  const summary = page.locator('.faq__item summary').first();
  await summary.focus(); await page.keyboard.press('Enter');
  check('UX-04', 'FAQ opens with keyboard', await page.$eval('.faq__item', (d) => d.open));

  /* Mobile menu keyboard */
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  await mp.goto(URL, { waitUntil: 'networkidle' });
  await mp.focus('[data-menu-toggle]'); await mp.keyboard.press('Enter');
  const opened = await mp.evaluate(() => ({ exp: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'), vis: !document.getElementById('mobile-menu').hidden, f: document.activeElement.closest('#mobile-menu') !== null }));
  await mp.keyboard.press('Escape');
  const closed = await mp.evaluate(() => ({ exp: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'), f: document.activeElement.matches('[data-menu-toggle]') }));
  check('UX-04', 'menu opens, moves focus in, Escape closes and restores focus', opened.exp === 'true' && opened.vis && opened.f && closed.exp === 'false' && closed.f, JSON.stringify({ opened, closed }));
  if (SHOTS) {
    await mp.click('[data-menu-toggle]');
    await mp.screenshot({ path: path.join(SHOTS, 'menu-390.png') });
  }
  await m.close();

  /* Film: missing file → poster state, no control */
  const miss = await page.evaluate(() => ({ hidden: document.querySelector('[data-film-toggle]').hidden, src: document.querySelector('[data-film]').getAttribute('src') }));
  await page.goto(URL, { waitUntil: 'networkidle' });
  const miss2 = await page.evaluate(() => ({ hidden: document.querySelector('[data-film-toggle]').hidden, h1: !!document.querySelector('#hero-title').offsetHeight }));
  check('VID-04', 'unavailable film leaves copy/CTAs and hides dead control', miss2.hidden && miss2.h1, JSON.stringify({ miss, miss2 }));

  /* Film: available → autoplay, pause persists offscreen and back */
  const webm = await makeWebm(browser);
  const v = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await v.route('**/hero-motion-study.mp4', (r) => r.fulfill({ status: 200, contentType: 'video/webm', body: webm }));
  const vp = await v.newPage();
  await vp.goto(URL, { waitUntil: 'load' });
  await vp.waitForFunction(() => !document.querySelector('[data-film]').paused, null, { timeout: 5000 }).catch(() => {});
  const playing = await vp.evaluate(() => ({ paused: document.querySelector('[data-film]').paused, label: document.querySelector('[data-film-label]').textContent, hidden: document.querySelector('[data-film-toggle]').hidden }));
  check('VID-01', 'muted inline film autoplays with visible Pause control', !playing.paused && playing.label === 'Pause film' && !playing.hidden, JSON.stringify(playing));
  await vp.focus('[data-film-toggle]'); await vp.keyboard.press('Enter');
  await vp.evaluate(() => window.scrollTo(0, 3000)); await vp.waitForTimeout(400);
  await vp.evaluate(() => window.scrollTo(0, 0)); await vp.waitForTimeout(400);
  const persisted = await vp.evaluate(() => ({ paused: document.querySelector('[data-film]').paused, label: document.querySelector('[data-film-label]').textContent }));
  check('VID-03/06', 'keyboard pause persists after scrolling away and back', persisted.paused && persisted.label === 'Play film', JSON.stringify(persisted));
  const box = await vp.$eval('[data-film-toggle]', (b) => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height }; });
  check('VID-06', 'film control hit area ≥44px', box.h >= 44 && box.w >= 44, JSON.stringify(box));
  if (SHOTS) await vp.screenshot({ path: path.join(SHOTS, 'hero-film-1280.png') });
  await v.close();

  /* Reduced motion → poster only, no film request until opted in */
  const r = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  let filmRequested = false;
  await r.route('**/hero-motion-study.mp4', (route) => { filmRequested = true; route.fulfill({ status: 200, contentType: 'video/webm', body: webm }); });
  const rp = await r.newPage();
  await rp.goto(URL, { waitUntil: 'networkidle' });
  const rm = await rp.evaluate(() => ({ src: document.querySelector('[data-film]').getAttribute('src'), label: document.querySelector('[data-film-label]').textContent }));
  check('VID-02', 'reduced motion: no film loaded, Play offered', !rm.src && !filmRequested && rm.label === 'Play film', JSON.stringify(rm));
  await r.close();

  /* No JavaScript */
  const n = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const np = await n.newPage();
  await np.goto(URL, { waitUntil: 'networkidle' });
  const nj = await np.evaluate(() => ({ h1: document.querySelector('h1').getBoundingClientRect().height > 0, forms: document.querySelectorAll('form').length, faq: document.querySelectorAll('details').length }));
  check('REL-03', 'story, FAQ and forms readable without JavaScript', nj.h1 && nj.forms === 2 && nj.faq === 5, JSON.stringify(nj));
  await n.close();

  await browser.close();

  let failed = 0;
  for (const x of results) {
    if (!x.pass) failed++;
    console.log(`${x.pass ? 'PASS' : 'FAIL'}  ${x.id.padEnd(9)} ${x.name}${x.pass || !x.detail ? '' : `  → ${x.detail}`}`);
  }
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
