# Portfolio refinement

Direction: an evidence-led software portfolio for people assessing Abenezer's work. Calm, exact, editorial. Paper, ink, and muted green; real application screenshots carry the color. Quiet numbered section labels provide a consistent signature.

Keep plain HTML/CSS, existing contact and print actions, education, research, and the separate KBTU page. Use normal anchor navigation and a readable document flow. Separate three professional contributions from two featured and three compact personal projects. Remove simulated screenshots, decorative hero elements, generic slogans, and excluded projects.

Evidence: local software resumes `Abenezer_Lemma_CV.pdf` and `Abenezer_Alemayehu_CV (1).pdf` verify ALFA Center employment, Breez, Phoenix, Barii, and Limmud. Aman AI is not named in those resumes; its role and contributions are limited to public merged PR 52, authored by abnzrdev. Do not imply a separate employment relationship. ZLearn refers to the existing ZealRN contribution linked from the portfolio; retain the product's actual name and public source.

Reuse reviewed existing Barii and Breez captures. The existing Melha capture is a renamed development build, so do not label it as a Limmud screenshot. Missing assets remain documented rather than rendered as broken images. Preserve Pages configuration and unrelated changes. Essential validation: HTML/assets/anchors, one desktop and mobile Chrome smoke check, console errors, and available project build checks.

Design guidance: [Unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky, CC BY 4.0.

## Verification — 12 November 2026

- Portfolio: desktop (1440px requested) and mobile (390px emulation) smoke checks passed; no horizontal overflow, missing local anchor targets, or broken images. Print action retained; print pagination was not re-audited.
- Chrome MCP: zero warnings/errors on local portfolio and Barii, Limmud, Patch75, ZealRN, and Cauldron project pages. The old live portfolio had a resource 404; the new page has an explicit favicon.
- Standard-library HTML checks passed for the portfolio, unchanged KBTU page, and all four static project sites: local assets, anchors, unique IDs, image alt attributes, titles, and viewport metadata.
- Cauldron: pnpm build, pnpm lint, Prettier check, and stylelint passed. Only typography/dialog styles changed; no game logic, save format, or deployment file changed.
- Static sites have no compilation step. Native Flutter, Rust, and Qt app builds were not repeated for documentation/site-only edits.
- Checked selected project sites, source repositories, case-study links, and the Barii release screenshot returned HTTP 200. Breez returned HTTP 530; LinkedIn returned HTTP 999 (automated access blocked). Their original URLs are retained.
- Lightweight independent diff review found no important issues. Existing dirty checkouts were preserved.
- Changes are prepared on feature branches. No production merge or deployment was performed.
