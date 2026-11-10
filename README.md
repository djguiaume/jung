# Boussole des Énergies Jungiennes

Static web app (Vue 3 from CDN, no build step, no backend), deployed at https://galan.cloud/jung/. Open `index.html` through any static server to run it.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page markup and Vue templates |
| `css/app.css` | Styles, including the print (PDF) layout |
| `js/engine.js` | Questionnaire, 0–6 scoring, wheel placement (72 positions), report assembly |
| `js/app.js` | Vue app: questionnaire flow, report screen, print, JSON export and group comparison |
| `texts/profile-texts.fr.js` | Report text (`window.JungTexts`), written separately |
| `js/texts-fallback.js` | Minimal text used only when `texts/profile-texts.fr.js` is missing |

## Scoring and wheel

- Each colour's raw total (18 to 72) maps to a 0–6 score with `(raw − 18) / 9`; the four scores add up to 12.
- The wheel position comes from two axes: extraversion (red + yellow) against introversion (blue + green), and thinking (blue + red) against feeling (green + yellow). The direction gives one of eight types, the stronger neighbouring colour gives the half-type, and the vector's length gives the ring (Focalisé, Classique, Accommodant). Mixed types also have Créatif positions on their edges.
- Positions are numbered 1–16 (outer ring), 21–36 (middle), 41–56 (inner) and 101–156 (créatif).

## Text API

`window.JungTexts.compose({ firstName, conscious, lessConscious })`, where each profile is `{ type, lean, ring, scores }` with type keys `reformateur, directeur, motivateur, inspirateur, conseiller, supporteur, coordinateur, observateur` and scores on 0–6. It returns the report text (`howToRead`, `summary`, `overview`, `underPressure`, lists such as `strengths`, `opposite`, and so on). `window.JungTexts.types[key].summary` gives a short description of each type.

## Deploy

Publishing a GitHub release uploads the files over FTPS (`.github/workflows/deploy.yml`).
