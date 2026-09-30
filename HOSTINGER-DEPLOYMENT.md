# Hostinger Deployment Guide

## ✅ Use This ZIP: `modern-assets-hostinger-v2.zip`

This ZIP is built to match the **exact working deployment pattern** from your build logs.

---

## How It Works (matches your working build log)

```
npm install       → finds only 1 package (instant, no real deps)
npm run build     → runs "echo Build complete" (no-op, dist/ already built)
Syncing dist/     → Hostinger copies dist/ to public_html ✅
```

---

## Hostinger Deployments Settings

| Setting | Value |
|---|---|
| Node.js version | **22** |
| Package manager | **npm** |
| Build command | `npm run build` |
| Output directory | `dist` |
| Entry file | *(leave blank)* |

---

## Steps

1. hPanel → **Node.js** → **Deployments**
2. Upload `modern-assets-hostinger-v2.zip`
3. Use the settings table above
4. Click **Deploy**

The build will complete in ~2 seconds (same as your working log).

---

## ZIP Structure
```
modern-assets-hostinger-v2.zip
├── package.json          ← no-op build: "echo Build complete"
└── dist/                 ← pre-built site (Hostinger syncs this to public_html)
    ├── index.html
    ├── image.png          ← CR Certificate
    ├── assets/
    ├── products/
    └── ...
```
