# VAE Fingerprint Detection — Thesis Showcase

Static website showcasing the thesis project: *"CNNs Don't Detect Facial Edits — They Detect the VAE."*

## Local Preview

Open `index.html` directly in your browser, or use a local server:

```bash
cd site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

### Option 1: Dedicated repository (recommended)

1. Create a new GitHub repository (e.g. `vae-fingerprint`).

2. Push the contents of the `site/` folder as the repo root:

   ```bash
   cd site
   git init
   git add .
   git commit -m "Initial commit — thesis showcase site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vae-fingerprint.git
   git push -u origin main
   ```

3. Go to **Settings → Pages** in the repository.

4. Under **Source**, select **Deploy from a branch**, choose `main` and `/ (root)`, then click **Save**.

5. Your site will be live at `https://YOUR_USERNAME.github.io/vae-fingerprint/` within a few minutes.

### Option 2: `docs/` folder in existing repo

1. Copy the `site/` contents into a `docs/` folder at the root of your existing repository.

2. Commit and push.

3. In **Settings → Pages**, set the source to `main` branch, `/docs` folder.

## Project Structure

```
site/
├── index.html              # Main page
├── css/
│   └── style.css           # Styles (dark theme, responsive)
├── js/
│   └── main.js             # Scroll animations, lightbox, counters
├── images/
│   ├── faces/              # Real vs edited face comparisons
│   ├── results/            # Charts and confusion matrices
│   ├── spectral/           # Frequency analysis visualisations
│   └── gradcam/            # GradCAM attention maps
└── README.md               # This file
```

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (no build step required)
- Google Fonts (Inter, JetBrains Mono)
- Intersection Observer API for scroll-triggered animations
- CSS custom properties for theming
- Fully responsive (mobile, tablet, desktop)
