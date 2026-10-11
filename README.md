# Zeeshan Haider — Personal Portfolio

A responsive, accessible personal portfolio website built for the **MTech Solutions Frontend Development Internship (Batch 01 · Task 01)**.

**Live site:** https://vercel.com/shadezee/portfolio/BFgve5AZ4faQYrVFPKb1yQGFs4LR

## Features

- Sections: Hero, About, Skills, Projects, Services, Contact, Footer
- Fully responsive (mobile, tablet, desktop) with a mobile hamburger menu
- Dark / light theme toggle (remembers your choice)
- Smooth-scroll navigation with active-section highlighting
- Contact form with frontend validation (opens the visitor's email app with the message prefilled)
- Scroll-reveal animations, animated skill bars, typed hero text (all respect `prefers-reduced-motion`)
- Accessible: skip link, semantic landmarks, keyboard focus styles, ARIA labels, readable contrast

## Technologies

HTML5 · CSS3 (custom properties, Grid, Flexbox) · Vanilla JavaScript (ES6) · Inline SVG icons · Google Fonts (Inter, JetBrains Mono)

No frameworks or build tools.

## Project Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Run Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

**Netlify:** drag-and-drop the project folder at app.netlify.com/drop, or connect the GitHub repo (no build command, publish directory `.`).

**Vercel:** import the GitHub repo, framework preset **Other**, no build command, output directory `.`.

## Author

**Zeeshan Haider** — BS Cybersecurity student, COMSATS University Islamabad
GitHub: [@mrzeeshi](https://github.com/mrzeeshi)
