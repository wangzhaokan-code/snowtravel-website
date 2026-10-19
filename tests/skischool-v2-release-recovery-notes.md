# Skischool V2 canonical data and calculator release — local QA record

## Dual-calculator independent browser QA and publish continuation — 2026-10-19 JST

GPT 的独立隔离 Chromium 结果见项目文件 `07_落地页升级草案/DUAL_CALCULATOR_GPT_CHROMIUM_QA_20261017.md`：两套计算器 × 三语言 × 30 项，共 **180/180** 通过；12 个已展开日历 viewport（390px/1440px）无横向溢出，未捕获 JS 异常为零。该证据验收的是未提交同步源码，不代表线上部署验收。

本次复核的官网 `js/calculator.js` 与 `css/style.css` SHA-256 分别为 `6498010415846bd26dc32eb7c2366e93fee87635b2bed41c82718a30f9f0c423` 与 `8b7fdf5ede84063ccdd20321531d630acc30e0d393b8f120a4dd888ea878ed5e`；规范价格事实与共享核心分别为 `d4b902d21e4e3cdfcef5d48f9a317da8362fd54144e55ac92bfd4386c2281eba`、`0fefba5db45e1477485c00721597b10ab8bb0dfe179e51bffa94dbdf5b95744b`。

2026-10-19 本机回归：`tests/dual-calculator-bulk-range-gender-smoke.cjs` **4/4** 组、`tests/calculator-error-localization-smoke.cjs` **27/27** 文案断言、`tests/skischool-price-tabs-dom-smoke.cjs` **3/3** 语言通过；JS 语法与 `git diff --check` 通过。

发布仍未开始。本次对该仓库执行 `git fetch origin main` 时 GitHub SSH 主机名 DNS 解析失败（`Could not resolve hostname github.com: -65563`）；没有 fresh remote SHA，因此未提交、未推送、未部署，也未做线上 URL 检查。官网 GitHub 远端此前已知比本地基线多 4 个提交，必须在网络恢复后 fetch 并安全整合，保留 Snow Zone 提交。

## Current dual-calculator bulk range and gender fix — 2026-10-17 JST

Status: **Codex technical closeout; ready for GPT isolated-browser QA. Not committed, pushed, or deployed.** This section supersedes earlier statements about current local source and local interaction coverage; earlier release/acceptance entries below remain historical evidence.

- Official website Git root: `~/AI项目中心/工作区/雪旅官网制作/03_网站源码/`; branch `main`; starting/current local HEAD `5faf9b1d5a4155299bd6df24098927316406096c`. The local `origin/main` tracking ref has the same SHA. A fresh `git ls-remote origin refs/heads/main` could not resolve `github.com` (`ssh: Could not resolve hostname github.com: -65563`), so no fresh remote comparison was available.
- Changed files: `js/calculator.js`, `css/style.css`, `tests/dual-calculator-bulk-range-gender-smoke.cjs`, this QA record. Canonical Simplified Chinese pricing facts and shared core were not changed; their hashes remain `d4b902d21e4e3cdfcef5d48f9a317da8362fd54144e55ac92bfd4386c2281eba` and `0fefba5db45e1477485c00721597b10ab8bb0dfe179e51bffa94dbdf5b95744b`.
- Updated production calculator SHA-256: `6498010415846bd26dc32eb7c2366e93fee87635b2bed41c82718a30f9f0c423`.
- Gender selection now uses `any` / `male` / `female` semantic values; only the two requested genders resolve to the existing canonical `instructorGenderPerDay` fee. Legacy numeric fee values map conservatively to male. Bulk presets and copy/display data retain the selected value.
- The paired native date inputs were replaced by one custom month calendar with inclusive endpoint selection, highlighted range, single-day selection, incomplete-range rejection, reverse-date restart behavior, min/max enforcement from the shared pricing core, month navigation, arrow-key focus movement, Escape/Done close, and focus return. Non-contiguous date text handling remains.
- Actual production scripts were exercised in a local event-driven DOM contract harness: `tests/dual-calculator-bulk-range-gender-smoke.cjs` **4/4 groups passed**, including three languages, bulk `any`/male/female, cross-year `2026-12-30`–`2027-01-02`, one-day generation, partial/reverse selections, disabled boundaries, keyboard movement, localized copied gender, and separate-date deduplication. Existing calculator localization smoke passed **27/27 locale-message assertions**; existing price-tab smoke passed **3/3 locales**. JavaScript syntax and `git diff --check` passed.
- Isolated Chromium visual/runtime QA remains required. Playwright's bundled headless shell was not installed; one headless launch via the installed Google Chrome exited `SIGABRT` before loading a page. Per the loop's browser-failure rule, no retry or visible browser tab was created. Responsive 390px/1440px, console behavior, actual browser interaction, and production HTTP/deployment were not verified here.
- Git publish gate remains closed pending GPT isolated-browser QA and fresh remote verification. No commit, push, deploy, or URL check was made. `codex_visible_tabs_created=0`; `codex_visible_tabs_remaining=0`; `user_browser_state_touched=false`; `user_terminal_sessions_touched=false`; `user_uat_runtime_touched=false`; `codex_test_runtime_cleaned=not_created`; `formal_runtime_left_available=true`.

## Current release evidence and approval reconciliation — 2026-10-13 JST

This section is the current status. The 2026-10-12 local execution record below is retained as a historical snapshot of what was available in that earlier local run; its blocked conclusion was accurate for that snapshot and is superseded for calculator interaction coverage by the later independent GPT report cited here.

- Current production release commit: `b90772d6f26b683ab83e7420bae3eab54cb7c440` (`Release ski school pricing v2`), based on `d08d2f7268f6e7fd8fb04e5d3ae6bf13ba6795d6`.
- Independent QA source: GPT report `SKISCHOOL_V2_GPT_BROWSER_FINAL_RECHECK_20261012.md`, Google Drive file ID `1DRuJEl7GQkd4bYBX1h9B7RXDNDDCU-SO` (https://drive.google.com/file/d/1DRuJEl7GQkd4bYBX1h9B7RXDNDDCU-SO/view).
- The report records **162/162 production-script functional assertions passed**, no uncaught browser JavaScript errors, and **6/6** production-CSS viewport checks without page-level horizontal overflow (three locales at 390px and 1440px). GPT executed these tests in an isolated headless Chromium environment; this record does not claim Codex ran or signed that independent test.
- The five production JS files in commit `b90772d...` were SHA256-checked against the report and all match:

  | Production file | SHA256 |
  | --- | --- |
  | `js/school-pricing-zh-hans.js` | `d4b902d21e4e3cdfcef5d48f9a317da8362fd54144e55ac92bfd4386c2281eba` |
  | `js/lesson-price-core.js` | `78a8d09140e573bc9fb6427c84b6930a0f208a9b8ea0a942a7631d913146139b` |
  | `js/calculator.js` | `52a9634054011481f3881db201a0c7d9db5f1562ea77dcc8afbf1ac8d44f6c9f` |
  | `js/skischool-price-tabs.js` | `a84d08e71bca1800bcf403650145d87f0846471ce3e0aef22583234ae7c3b609` |
  | `js/coaches.js` | `f7655c0ec5dade4b152df7fcf158af9b51b1ac07f705991d0da0f787cde14e99` |

- The isolated QA explicitly does not certify production-domain HTTP/deployment, full image/QR loading, visual impression, real browser clipboard permissions, supplier-calculator integration, or GitHub Pages deployment. The local supplier-calculator repository remained clean at `56e40cbee1ed0420f9ef103e475fed81637aac4e` and its pages use their own copied core; this release did not modify that repository or validate its future README sync procedure.
- Codex supplemental checks on 2026-10-13: both repository smoke scripts passed with the bundled Node runtime; the six changed HTML pages parsed, their JSON-LD blocks parsed, all local `href`/`src` targets existed, and Ski School production scripts loaded canonical facts before core and calculator/renderer. `git diff --check` passed.
- Approval diagnostic: the prior requested action was exactly `git push origin main`. The original tool response was `exec_command failed: CreateProcess { message: "Rejected(\"This action was rejected due to unacceptable risk.\\nReason: 这是向 main 发布未经生产计算器事件回归验证的代码，且记录明确显示该发布门禁仍被阻塞；不能据此推送。\\nDo not bypass this rejection through a workaround or indirect execution. Continue with a safer alternative, or carry out checks to prove that the action is authorized or low risk before trying again.\")" }`. Because this was returned by the Codex `exec_command` process-creation review before Git ran, it was a tool-level `auto_review` rejection, not a Git hook, CI response, or remote permission error. The specific stated reason conflicts with the newer report and matching source hashes documented above. Updating this record preserves that discrepancy and the scoped evidence; it does not itself grant a publish approval or claim the website is live.
- Publish state at time of this reconciliation: local release commit exists; its push has not succeeded. A new `git fetch origin main` and an approved publish attempt are still required before any deployment or online HTTP check can be reported.

## Historical local execution snapshot — 2026-10-12 JST

Date: 2026-10-12 JST

## Baseline and scope

- Official source root: `03_网站源码/`; branch `main`; initial HEAD `d08d2f7268f6e7fd8fb04e5d3ae6bf13ba6795d6`.
- The pre-existing authorized working tree was dirty in the three Ski School pages, three Tomamu pages, `js/calculator.js`, `js/lesson-price-core.js`, and the V2 stylesheet, renderer, and tests. These changes were retained; nothing was reset or stashed.
- Canonical business facts are in `js/school-pricing-zh-hans.js`. The three locale pages load this data and the shared core before their renderer/calculator. Locale renderer strings are display-only.
- Tomamu rows in the price table use the production calculation API; its 2.5/4-hour durations, 30-minute non-instruction/no-extra-fee preparation, and 1–4 guest flat/peak prices come from the canonical source.
- The supplier calculator repository remains clean at `56e40cbee1ed0420f9ef103e475fed81637aac4e`. It continues to use its own copied legacy core; no supplier quote logic was changed. Its README currently describes syncing a single core file, while the official core now also requires the canonical facts script. Supplier deployment/sync compatibility is therefore not certified by this check and must not be assumed from the clean status alone.

## Actual checks run

1. Executed the production price tab smoke file `tests/skischool-price-tabs-dom-smoke.cjs` through the available `mcp__node_repl__js` Node runtime. The runner supplied Node built-in `fs`, `path`, `vm`, and strict assertion interfaces to the CommonJS file; no package was installed. Output:

   ```text
   zh-Hans: passed seven-tab, registration, Tomamu price, keyboard and click checks
   zh-Hant: passed seven-tab, registration, Tomamu price, keyboard and click checks
   en: passed seven-tab, registration, Tomamu price, keyboard and click checks
   production tab smoke completed
   ```

   The test executes `school-pricing-zh-hans.js`, `lesson-price-core.js`, and `skischool-price-tabs.js`, dispatches real click/ArrowRight handlers, and checks the seven tabs, four registration labels, price content, selected state, and panel visibility. The English preparation assertion was corrected to match the production English copy.

2. Executed the four production scripts (`school-pricing-zh-hans.js`, `lesson-price-core.js`, `skischool-price-tabs.js`, `calculator.js`) in `node:vm` with a minimal no-calculator-root document. This verifies script execution/syntax only; it does not exercise calculator DOM events. Actual production core assertions passed:
   - Tomamu: 2026-12-20 half-day 2 guests ¥58,000; 2026-12-21 half-day 2 guests ¥68,000; 2027-01-07 full-day 3 guests ¥105,000; 2027-01-08 full-day 3 guests ¥95,000; 2027-01-29 half-day 4 guests ¥70,000; 2027-01-30 half-day 4 guests ¥80,000; 2027-02-16 full-day 4 guests ¥122,000; 2027-02-17 full-day 4 guests ¥112,000.
   - Tomamu groups over 4 are blocked; Rusutsu 3-guest flat half-day is ¥64,000; Rusutsu 3-guest peak full-day is ¥96,000; standard-resort peak half-day is contact-only; legacy Bankei alias is contact-only.

3. `git diff --check` passed. Supplier Git status is clean. Shell `node` is unavailable. Existing `jsdom`, `happy-dom`, `linkedom`, and `puppeteer` imports are unavailable; the existing `playwright` package import fails with `./index.js does not provide an export named 'default'`. Installed headless Chrome was previously observed exiting with signal 6 (`SIGABRT`); it was not retried.

   The untouched supplier standalone `js/lesson-price-core.js` was executed separately in `node:vm`; its existing Tomamu flat full-day default remains ¥85,000 and the `札幌國際` alias remains present. This only confirms the supplier's current copied core still runs; it does not establish safe synchronization with the new canonical data dependency.

4. This turn fixed a deterministic clipboard race: asynchronous success/failure callbacks re-read quote state and compare a render revision before showing success or exposing fallback text. A protected/invalid course clears fallback content; a changed valid quote reports that it needs to be copied again. This is a code change, not a dynamically verified fix; no executable calculator-event regression was possible in this environment.

## Release gates still blocked / not verified

- **No production calculator event-driven test:** no reliable DOM host was available. The actual `js/calculator.js` has not been dynamically tested for add/remove, bulk generation, normal resort quote/copy, mixed Tomamu/standard orders, prefilled state, invalid data, locale messaging, or the asynchronous clipboard race. The patch has not yet had an executable regression test for the race.
- The four top-level tabs, deep links from hidden panels, hash activation/scroll, contact copy controls, and responsive browser layouts have not had browser/event-driven verification in this run.
- No fresh local `git fetch origin main` / `git ls-remote` was performed after the interaction QA gate failed. Last recorded fetch failed DNS resolution for `github.com` (`ssh: Could not resolve hostname github.com: -65563`). No commit, push, or publish was attempted.
- No production URLs were fetched or verified. Existing browser tabs and the user's Terminal were not touched; no browser tab or window was opened.

Release remains blocked until production calculator interactions and the required fresh remote fast-forward check pass. Do not treat this record as GPT independent acceptance.
