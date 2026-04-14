# 🚀 Deploy Guide — Sahil Sharma Portfolio

## Step 1: Create a GitHub Repository

1. Go to **github.com** → click **"New repository"** (top right **+** button)
2. Name it exactly: `your-username.github.io`
   - e.g. if your GitHub username is `sahilsharma`, name it `sahilsharma.github.io`
   - This makes your site live at `https://sahilsharma.github.io`
3. Set it to **Public**
4. Click **"Create repository"**

---

## Step 2: Upload the Website Files

### Option A — Drag & Drop (Easiest)
1. Open your new repository on GitHub
2. Click **"uploading an existing file"** or drag files
3. Upload ALL files maintaining this structure:

```
your-username.github.io/
├── index.html          ← Homepage
├── css/
│   └── main.css
├── js/
│   ├── main.js
│   └── components.js
└── pages/
    ├── about.html
    ├── experience.html
    ├── research.html
    ├── achievements.html
    └── contact.html
```

4. Scroll down → click **"Commit changes"**

### Option B — GitHub Desktop (Recommended for future updates)
1. Download GitHub Desktop: https://desktop.github.com
2. Clone your repository
3. Copy all portfolio files into the cloned folder
4. Commit & Push

---

## Step 3: Enable GitHub Pages

1. Go to your repository → click **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Source**, select **"Deploy from a branch"**
4. Branch: **main**, folder: **/ (root)**
5. Click **Save**
6. Wait 1–2 minutes → your site is live at `https://your-username.github.io`

---

## Step 4: Personalise the Site

### Update your email address
In all files, replace `sahilsharma@iitj.ac.in` with your real email.

### Update your GitHub, Twitter links
In `js/components.js`, find the social links section and replace the placeholder URLs.

### Add your profile photo
Simply visit your live site → click the camera icon on the profile card → upload your photo.
It saves automatically in your browser (localStorage).

> **For a permanent photo:** Save your photo as `assets/profile.jpg`, upload it to GitHub,
> then in `index.html` change the `<img>` tag's default `src` to `assets/profile.jpg`.

---

## Adding New Pages (Future)

### Method 1: Use the built-in UI
1. Click **"+ Add page"** in the nav bar on your live site
2. Fill in the title, section, content, and icon
3. The page appears immediately in navigation

### Method 2: Duplicate a page file
1. Copy any file from `/pages/`, e.g. `about.html`
2. Rename it, e.g. `projects.html`
3. Edit the content
4. Add a link to it in `js/components.js` in the `getNavHTML()` function
5. Upload to GitHub → changes appear in minutes

---

## Custom Domain (Optional)

1. Buy a domain at Namecheap, GoDaddy, etc.
2. In your repo → Settings → Pages → Custom domain
3. Enter your domain and follow the DNS instructions

---

## Features Summary

| Feature | How it works |
|---|---|
| Profile photo | Click avatar on homepage → upload → saved in browser |
| Add new page | Click "+ Add page" in nav → fill form |
| Custom cursor | Automatic — AI-styled cursor throughout |
| Neural network bg | Animated canvas on every page |
| Particle clicks | Click anywhere → particle burst effect |
| Typing animation | Homepage hero — cycles through roles |
| Scroll reveals | Content fades in as you scroll |
| Tooltips | Hover over icons to see labels |
| Contact form | Works on contact page — shows success state |
| Dark theme | Default — no toggle needed |

---

*Built with HTML, CSS, and vanilla JS — no build tools required. Just upload and go.*
