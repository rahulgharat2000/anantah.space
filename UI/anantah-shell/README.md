# Anantah Shell

Independent Module Federation host responsible for top-level routing, navigation, session-aware presentation, and remote error boundaries.

## Start the complete site

Install each project's dependencies once, then start all MFEs from this directory:

```powershell
cd ../anantah-auth-mfe
npm install
cd ../anantah-core-mfe
npm install
cd ../anantah-fashion-mfe
npm install
cd ../anantah-space-intelligence-mfe
npm install
cd ../anantah-space-play-mfe
npm install
cd ../anantah-shell
npm install
npm run dev:all
```

Open `http://localhost:4173`. Press `Ctrl+C` once to stop all three development servers.

The individual commands remain available when working on only one MFE:

| App | Command | URL |
| --- | --- | --- |
| Shell | `npm run dev` | `http://localhost:4173` |
| Auth | `npm --prefix ../anantah-auth-mfe run dev` | `http://localhost:4174` |
| Core | `npm --prefix ../anantah-core-mfe run dev` | `http://localhost:4175` |
| Fashion | `npm --prefix ../anantah-fashion-mfe run dev` | `http://localhost:4176` |
| Intelligence | `npm --prefix ../anantah-space-intelligence-mfe run dev` | `http://localhost:4177` |
| Play | `npm --prefix ../anantah-space-play-mfe run dev` | `http://localhost:4178` |

## Configure remotes

For local integration, the shell defaults to remotes on ports `4174` through `4178`. To use deployed development remotes instead, create `.env.local`:

```dotenv
VITE_AUTH_REMOTE_URL=https://identity-dev.example.com/remoteEntry.js
VITE_CORE_REMOTE_URL=https://core-dev.example.com/remoteEntry.js
VITE_FASHION_REMOTE_URL=https://fashion-dev.example.com/remoteEntry.js
VITE_INTELLIGENCE_REMOTE_URL=https://intelligence-dev.example.com/remoteEntry.js
VITE_PLAY_REMOTE_URL=https://play-dev.example.com/remoteEntry.js
```

## Validate the shell

```powershell
npm run build
npm run typecheck
```