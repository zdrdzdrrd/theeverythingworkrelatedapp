# Rodolfo's Workspace on GitHub Pages

Everything in this folder is the whole app. Upload it to a GitHub repository and turn on Pages.

## Put it online

1. On github.com, click **New repository**. Name it, for example, `workspace`. A private repo works only on paid GitHub plans, so pick **Public** if you're on the free plan. The repo only holds the app code; your tasks are never uploaded.
2. In the new repo, click **Add file → Upload files** and drag in everything from this folder: `index.html`, `manifest.webmanifest`, `service-worker.js`, the four icon PNGs, `.nojekyll`, and the `lib` folder. Then click **Commit changes**.
   - If `.nojekyll` or the `lib` folder doesn't come along, it's fine to drag the folder contents again. `lib` must keep its name.
3. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then **Save**.
4. After a minute the page shows your address, like `https://<your-username>.github.io/workspace/`. Open it.

## Install it as an app

- **Chrome or Edge on Windows/Mac:** click the install icon in the address bar.
- **Android (Chrome):** menu → **Install app**.
- **iPhone/iPad (Safari):** Share → **Add to Home Screen**.

After the first visit it opens offline.

## Where your data lives

On GitHub Pages, your workspace is saved **in the browser you use it in** (local storage, about 5 MB). It does not sync between devices, and clearing site data erases it. Use **Backup and import → Save a backup** regularly.

To move what you already have:

- **From the Claude version:** open it, **Backup and import → Save a backup**, then on the GitHub site use **Import a backup** with that file.
- **From the old Work Order app:** save a backup there and import it the same way. Tickets go into a "Work Order" project.

Photos are stored inside the browser too, shrunk to about 1024 px, so they use up the 5 MB quickly. The Backup window shows how much is used.

## Updating later

Replace `index.html` and `service-worker.js` in the repo with the new ones. The app picks up the new version the next time it opens online.
