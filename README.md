# titus-ronoh-portfolio

**Personal portfolio of Titus Kipkoech Ronoh** — Software Engineer &amp; AI/ML Engineer (Nairobi, Kenya).
A modern, fast, dependency-free static site showcasing production APIs, AI/ML projects, experience and six tailored CVs.

[![CI](https://github.com/Tyronekrt/titus-ronoh-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Tyronekrt/titus-ronoh-portfolio/actions/workflows/ci.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat&logo=render&logoColor=black)

---

## Highlights

- 🎯 **Role-tailored** — SE &amp; AI CVs featured up front; six CV downloads total
- ⚡ **Zero-dependency** — hand-crafted HTML/CSS/JS, no framework, no build step
- 📱 **Fully responsive** — mobile-first breakpoints, accessible nav &amp; focus states
- ✨ **Modern UI** — dark glass theme, gradient accents, scroll-reveal motion, pointer glow cards
- 🔗 **All links verified** — automated internal-link + external-link CI checks
- 🚀 **Render-ready** — `render.yaml` Blueprint for one-click static deployment

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
│   ├── img/                      # Profile photos, OG image, favicon
│   └── cvs/                      # Six tailored CVs (SE & AI featured)
├── scripts/check_links.py        # Internal + external link checker
├── .github/workflows/ci.yml      # CI pipeline
├── render.yaml                   # Render static-site Blueprint
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

## Deploy on Render

### Option A — Blueprint (recommended)

1. Push this repository to GitHub.
2. In Render: **New + → Blueprint**, select the repo.
3. Render reads `render.yaml` and creates the static site automatically.
4. Your site goes live at `https://<service-name>.onrender.com`.

### Option B — Static site wizard

1. Render: **New + → Static Site → Connect a repository**.
2. Build command: *(leave empty)*
3. Publish directory: `./`
4. Deploy. Every push to `main` redeploys automatically.

> Update the canonical/OG URLs in `index.html` (`https://titus-ronoh-portfolio.onrender.com/`) to your final Render domain.

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
