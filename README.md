# myportfolio

**Personal portfolio of Titus Kipkoech Ronoh** — Software Engineer &amp; AI/ML Engineer (Nairobi, Kenya).
A modern, fast, dependency-free static site showcasing production APIs, AI/ML projects, experience and two tailored CVs.

**Live:** https://titusronoh.vercel.app/

[![CI](https://github.com/Tyronekrt/myportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Tyronekrt/myportfolio/actions/workflows/ci.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Highlights

- 🎯 **Role-tailored** — SE & AI CVs featured; two CV downloads total
- ⚡ **Zero-dependency** — hand-crafted HTML/CSS/JS, no framework, no build step
- 📱 **Fully responsive** — mobile-first breakpoints, accessible nav &amp; focus states
- ✨ **Modern UI** — dark glass theme, gradient accents, scroll-reveal motion, pointer glow cards
- 🔗 **All links verified** — automated internal-link + external-link CI checks
- 🚀 **Deploy-anywhere** — Vercel (live) and a `render.yaml` Blueprint for Render static hosting

## Tech

| Layer      | Details                                                        |
| ---------- | -------------------------------------------------------------- |
| Markup     | Semantic HTML5, JSON-LD (Person schema), Open Graph / X cards  |
| Style      | Custom CSS — variables, glassmorphism, conic/gorb gradients, `prefers-reduced-motion` |
| Behaviour  | Vanilla JS — IntersectionObserver reveals, counters, scroll progress |
| Assets     | Optimised images (progressive JPEG), inline SVG icons          |
| CI         | GitHub Actions — `html-validate`, internal link check, smoke test |

## Project structure

```
.
├── index.html                    # Single-page portfolio
├── assets/
│   ├── css/style.css             # Full design system
│   ├── js/main.js                # Interactions
│   └── img/                      # Profile photos, OG image, favicon
├── files/                        # Two tailored CVs (SE & AI) - downloadable
├── scripts/check_links.py        # Internal + external link checker
├── .github/workflows/ci.yml      # CI pipeline
├── render.yaml                   # Render static-site Blueprint
├── vercel.json                   # Vercel config (PDF headers)
└── README.md
```

## Run locally

Any static server works — there is no build step:

```bash
# Python
python3 -m http.server 8080

# or Node
npx serve .
```

Open http://localhost:8080

## Deploy

### Vercel (live)

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Other**. Build command: *(empty)*. Output directory: `./`.
3. Deploy — live at https://titusronoh.vercel.app/.
4. Every push to `main` redeploys automatically.

### Render (alternative)

1. Render: **New + → Blueprint**, select the repo — Render reads `render.yaml` automatically.
   *(Or: New + → Static Site, empty build command, publish directory `./`.)*
2. Push to `main` redeploys automatically.

> Canonical/OG URLs in `index.html` are set to `https://titusronoh.vercel.app/` — update them if you switch domains.

## Quality checks

```bash
# Internal links + assets
python3 scripts/check_links.py

# Also verify external URLs (GitHub, LinkedIn, live demos)
python3 scripts/check_links.py --external

# HTML validation
npx html-validate index.html
```

All three run in CI on every push and pull request.

## Links

- **GitHub:** [github.com/Tyronekrt](https://github.com/Tyronekrt)
- **LinkedIn:** [titus-kipkoech-ronoh-56a6082a9](https://www.linkedin.com/in/titus-kipkoech-ronoh-56a6082a9)
- **X:** [@tyrone_krt](https://twitter.com/tyrone_krt)
- **Email:** [tituskiproh02@gmail.com](mailto:tituskiproh02@gmail.com)

## License

MIT © Titus Kipkoech Ronoh
