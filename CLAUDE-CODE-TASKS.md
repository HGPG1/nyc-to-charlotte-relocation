# Claude Code Tasks — NYC to Charlotte Relocation Page

## Context
Repo: HGPG1/nyc-to-charlotte-relocation
Stack: Next.js, Tailwind, TypeScript, deployed on Vercel (auto-deploys on push to main)
Live: https://relocate.homegrownpropertygroup.com
Original reference: https://nyc2charl-apbce9ej.manus.space/

## Audit items to fix (quick wins):

### 1. OG tags + canonical
Add to layout.tsx metadata:
- og:title, og:description, og:type=website, og:url=https://relocate.homegrownpropertygroup.com/
- og:image — use /images/charlotte-skyline.jpg or generate an OG screenshot
- canonical: https://relocate.homegrownpropertygroup.com/
- twitter:card=summary_large_image

### 2. FB Lead conversion event
On both form submissions, fire:
```js
window.fbq?.("track", "Lead", { content_name: "NYC to Charlotte Relocation Playbook" });
```
Then replace the alert() with a styled inline success message or toast. The Manus original showed: "🎉 Your free Relocation Playbook is on its way!"

### 3. Compress calculator background image
public/images/modern-home-interior.jpg is 1.1MB. Convert to WebP or compress to <300KB. Update the reference in page.tsx accordingly.

### 4. Replace blurry hero image
public/images/charlotte-skyline.jpg is only 600×337. Replace with a high-res Charlotte skyline (Unsplash or similar, minimum 1920px wide). The hero has a dark gradient overlay so exact photo doesn't need to be perfect, just a cityscape.

### 5. Favicon
Generate a favicon from public/images/hgpg-logo.png (or crop it) and add to the app. Add the appropriate link tags in layout.tsx.

### 6. Robots.txt
Add a basic public/robots.txt:
```
User-agent: *
Allow: /

Sitemap: https://relocate.homegrownpropertygroup.com/sitemap.xml
```

## Brand colors (NO GREEN):
- #2A384C dark navy
- #A0B2C2 steel blue
- #D1D9DF light steel
- #F0F0F0 off-white

## Don't touch:
- Logo sizing (h-60 header, h-24 footer) — already matches original
- Calculator formula (mortgage × 300) — already matches
- Header layout (logo + CTA only, no nav links)
- Form field structure (hero: name+email, bottom: name+email+phone with label)
- Meta Pixel setup (already firing PageView)
- Font loading (Sansita + Inter via Google Fonts)

## GitHub
- Push to main → Vercel auto-deploys in ~30 seconds
