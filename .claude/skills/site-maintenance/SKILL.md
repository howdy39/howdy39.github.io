---
name: site-maintenance
description: Maintenance workflow for the howdy39.github.io personal site (served at howdy39.dev via GitHub Pages custom domain).
when_to_use: Use when editing index.html content (career, article list), updating dependencies via Renovate PRs, or making any change to this repo.
---

# howdy39.github.io Maintenance

Single static site: `index.html` + `css/index.css` + `js/delighters.js`. No build step, no CI/status checks configured. GitHub Pages serves it directly at `https://howdy39.dev` (custom domain set via `CNAME`).

## Structure of index.html

Sections in order: intro → **Career** → article-list sections → `post-sincerely` (Thanks). Each article-list section is `<section class="post-XXX"><h2>...</h2><figure>...</figure><ul data-delighter><li><a href="..." target="_blank" rel="noopener">Title</a></li>...</ul></section>`.

Current article categories (last reorganized 2026-07, oriented around 情シス/SaaS-management evangelist positioning):
- 情シス × AI
- SaaS管理・ID/セキュリティ
- Google Workspace & GAS
- 情シス・組織論 (note essays, no figure/image)
- Chrome Extension (built products, not articles — left as-is unless told otherwise)

## Career section format

```html
<li>
  会社名 (<time class="post-date" datetime="YYYY-MM-01"></time>YYYY/MM〜YYYY/MM)<br>
  役職<br>
  技術スタック, カンマ区切り
</li>
```
Open-ended (current) role omits the end date after `〜`. When adding a new role, close out the previous entry's end date first.

## Pulling fresh article data

No scraping needed — these public endpoints return JSON/readable content directly via WebFetch:
- Qiita: `https://qiita.com/api/v2/users/howdy39/items?per_page=100`
- Zenn: `https://zenn.dev/api/articles?username=howdy39&order=latest`
- note: `https://note.com/api/v2/creators/howdy39/contents?kind=note&page=1`
- SpeakerDeck: plain `https://speakerdeck.com/howdy39` works fine with WebFetch (HTML has the list inline)

## Renovate PRs

`gh pr list --repo howdy39/howdy39.github.io` to see open PRs. This repo's Renovate PRs frequently touch the same `package.json`/`package-lock.json` region, so merging one invalidates the mergeability of the others (they show `mergeStateStatus: UNKNOWN` then fail with a real conflict on merge attempt). Merge one at a time and let Renovate auto-rebase the rest rather than force-pushing to its branches. Repo uses **merge commits** (not squash) — confirmed via `gh api repos/.../commits/<sha> -q '.parents | length'` returning 2 on past merges.

## Commit style

User prefers one commit per discrete piece of work (e.g. README tweak, Career update, article-list overhaul as separate commits), not one giant commit at the end. Conventional Commits format (`feat:`, `docs:`, etc.), per global CLAUDE.md.

## No local preview server

There's no dev server for this static site (no `.claude/launch.json` needed under normal circumstances) — it's plain HTML/CSS/JS with no build tooling. Verify edits by checking tag balance (`grep -c '<section'` vs `</section>`) and reading the diff; a Python `http.server` can be wired up via `.claude/launch.json` + `preview_start` if visual verification is needed, but note the Browser preview tool resolves `launch.json` relative to its own session root, which may not match the actual repo cwd — check this before relying on it.
