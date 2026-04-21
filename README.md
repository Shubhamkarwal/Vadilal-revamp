# Vadilal — Crafted Since 1926
Luxury redesign concept website for Vadilal Ice Creams.

---

## Project Structure

```
vadilal-site/
├── index.html                  ← Main HTML
├── netlify.toml                ← Netlify deployment config
├── .gitignore
├── css/
│   └── style.css               ← All styles
├── js/
│   └── main.js                 ← All JavaScript
└── images/
    ├── hero/
    │   ├── hero-kesar-pista.png      ← 3840x2160 (generate with Grok)
    │   ├── hero-alphonso-mango.png   ← 3840x2160 (generate with Grok)
    │   └── hero-dark-chocolate.png   ← 3840x2160 (generate with Grok)
    ├── cards/
    │   ├── card-gourmet.jpg          ← 800x1200 (generate with Grok)
    │   ├── card-kulfi.jpg            ← 800x1200 (generate with Grok)
    │   ├── card-fusion.jpg           ← 800x1200 (generate with Grok)
    │   ├── card-novelty.jpg          ← 800x1200 (generate with Grok)
    │   ├── card-takehome.jpg         ← 800x1200 (generate with Grok)
    │   └── card-sundae.jpg           ← 800x1200 (generate with Grok)
    └── backgrounds/
        ├── bg-heritage.jpg           ← 2560x1440 (generate with Grok)
        ├── bg-global.jpg             ← 2560x1440 (generate with Grok)
        ├── bg-parlour.jpg            ← 2560x1440 (generate with Grok)
        └── bg-franchise.jpg          ← 2560x1440 (generate with Grok)
```

---

## Adding Images from Grok

Once you generate images with Grok, place them in the exact folders above.
The site will automatically use them — no code changes needed.

Hero images go in:        images/hero/
Card images go in:        images/cards/
Background images go in:  images/backgrounds/

The site works without images too — it falls back to dark gradient backgrounds.

---

## Deploy to GitHub + Netlify

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Vadilal luxury site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vadilal-site.git
git push -u origin main
```

### Step 2 — Deploy on Netlify
1. Go to https://netlify.com and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your vadilal-site repo
4. Build settings:
   - Build command: (leave blank)
   - Publish directory: . (just a dot)
5. Click "Deploy site"
6. Your site is live in ~30 seconds

### Step 3 — Custom Domain (optional)
In Netlify → Domain settings → Add custom domain
Enter your domain and follow the DNS instructions.

---

## Adding New Images Later

After adding new image files to the images/ folder:
```bash
git add images/
git commit -m "Add hero images from Grok"
git push
```
Netlify auto-deploys on every push. Site updates in ~10 seconds.

---

## Tech Stack
- Pure HTML5, CSS3, Vanilla JavaScript
- No frameworks, no build tools, no dependencies
- Google Fonts (Playfair Display, Cormorant Garamond, DM Sans)
- Fully responsive (mobile, tablet, desktop)
- Netlify-ready out of the box
