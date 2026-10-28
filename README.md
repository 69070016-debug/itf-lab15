# Savor — Food Picker

A simple single-page food picker built with vanilla HTML, CSS, and JavaScript.

## Features

- Minimal navbar with brand mark
- One food card: image, dish name, description, and price
- Random picker button (also works with the `R` key)
- 5 curated dishes with real Unsplash images
- Responsive layout, custom button, Google Fonts (Fraunces + Manrope)

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
py -m http.server 8123
```

Then visit `http://127.0.0.1:8123`.

## Deploy

This folder is a static site. It can be deployed to Vercel as-is:

```bash
vercel --prod
```

## Files

- `index.html` — page structure
- `styles.css` — styling and responsive layout
- `script.js` — menu data and picker logic
- `vercel.json` — static deployment config
