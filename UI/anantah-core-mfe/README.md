# Anantah Core MFE

Independent React micro-frontend for the core Anantah experience, currently including the landing and product discovery page.

```powershell
npm install
npm run dev
```

Open `http://localhost:4175`. The MFE exposes `./CoreApp` through `remoteEntry.js`.

## Configure the landing page

All frequently changed landing-page values are in `src/content.ts` under `siteConfig`:

- `brand`: product name and public domain label
- `landing`: hero copy, primary action, hero image, and image description
- `projectsSection`: project-section heading and description
- `projects`: card copy, space image URLs, accessible descriptions, and accent names
- `actions`, `closing`, and `footer`: remaining calls to action and closing copy

Change imagery by replacing the relevant `heroImage` or project `image` URL. Keep the matching `heroImageAlt` or `imageAlt` current so the visual remains accessible.

The page's layout and visual tokens live in `src/landing.css` and `src/base.css`. The content component in `src/CoreApp.tsx` normally does not need to change when updating the brand copy or images.

## Validate the MFE

```powershell
npm run build
npm run typecheck
```