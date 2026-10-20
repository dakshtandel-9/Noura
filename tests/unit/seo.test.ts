import { test } from "node:test";
import assert from "node:assert/strict";
import { getInTouch } from "../../content/home.ts";
import { seoPages } from "../../content/seo.ts";
import { faqPage } from "../../content/subpages.ts";
import { faqJsonLd, organizationJsonLd, pageMetadata, robotsConfig, serializeJsonLd, sitemapEntries, siteUrl } from "../../lib/seo.ts";

test("robots.txt blocks every crawler until indexing is switched on", () => {
  const closed = robotsConfig(false);
  assert.deepEqual(closed.rules, { userAgent: "*", disallow: "/" });
  assert.equal(closed.sitemap, undefined);
});

test("robots.txt at launch allows the site, keeps admin and the API out, and lists the sitemap", () => {
  const open = robotsConfig(true);
  assert.deepEqual(open.rules, { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] });
  assert.equal(open.sitemap, `${siteUrl}/sitemap.xml`);
});

test("sitemap lists exactly the public pages, never admin or legal drafts", () => {
  const urls = sitemapEntries().map((entry) => entry.url);
  assert.deepEqual(urls, [siteUrl, `${siteUrl}/about`, `${siteUrl}/FAQ`, `${siteUrl}/contact`, `${siteUrl}/invitation`]);
  assert.ok(urls.every((url) => !/admin|privacy|terms|cookies/.test(url)));
});

test("every public page has a full-length title and description and a canonical path", () => {
  for (const page of Object.values(seoPages)) {
    assert.ok(page.title.length <= 60, `${page.path} title is ${page.title.length} characters`);
    assert.ok(page.description.length >= 110 && page.description.length <= 160, `${page.path} description is ${page.description.length} characters`);
    const metadata = pageMetadata(page);
    assert.equal(metadata.alternates?.canonical, page.path);
    assert.equal(metadata.robots, undefined, "robots must follow the site-wide switch");
  }
});

test("search copy avoids wording the brand voice rules out", () => {
  for (const page of Object.values(seoPages)) {
    assert.doesNotMatch(`${page.title} ${page.description}`, /retreat|cure|heal you|guarantee|best|#1/i);
  }
});

test("JSON-LD cannot close its script tag", () => {
  assert.equal(serializeJsonLd({ name: "</script><b>" }), '{"name":"\\u003c/script>\\u003cb>"}');
});

test("organization markup uses the contact details shown on /contact", () => {
  const [organization] = organizationJsonLd()["@graph"] as Record<string, unknown>[];
  const shown = (id: string) => getInTouch.details.find((item) => item.id === id)?.value;
  assert.equal(organization?.email, shown("email"));
  assert.equal(organization?.telephone, shown("phone"));
  assert.ok(organization?.email && organization.telephone);
});

test("FAQ markup mirrors every question and answer on the FAQ page", () => {
  const items: readonly { q: string; a: readonly string[] }[] = faqPage.groups.flatMap((group) => [...group.items]);
  const entities = faqJsonLd(faqPage.groups).mainEntity as { name: string; acceptedAnswer: { text: string } }[];
  assert.equal(entities.length, items.length);
  assert.deepEqual(entities.map((entity) => entity.name), items.map((item) => item.q));
  assert.deepEqual(entities.map((entity) => entity.acceptedAnswer.text), items.map((item) => item.a.join(" ")));
});
