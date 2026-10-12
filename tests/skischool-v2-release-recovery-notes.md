# Skischool V2 canonical data and calculator release — local QA record

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
