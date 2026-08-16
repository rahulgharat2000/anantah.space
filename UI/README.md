# Anantah UI Projects

The UI is split into six independent React projects. There is no root package, npm workspace, Turborepo configuration, or relative source dependency between them.

```text
anantah-auth-mfe/       Authentication remote and standalone app
anantah-core-mfe/       Core remote and standalone app
anantah-fashion-mfe/    Fashion remote and standalone app
anantah-space-intelligence-mfe/  Intelligence remote and standalone app
anantah-space-play-mfe/ Play remote and standalone app
anantah-shell/          Runtime host and top-level routing
anantah-ui.code-workspace
```

Each project has its own `package.json`, lockfile, dependencies, build, and development server. You can move each folder into a separate Git repository whenever separate ownership or release pipelines are needed.

## Work on one MFE

Run only the project you are changing:

```powershell
Set-Location .\anantah-auth-mfe
npm install
npm run dev
```

Replace the folder with any MFE folder as needed. Feature work on one remote does not require others because each remote includes a standalone browser entry.

| Project | Standalone URL |
| --- | --- |
| Auth | `http://localhost:4174/auth/login` |
| Core | `http://localhost:4175` |
| Fashion | `http://localhost:4176` |
| Intelligence | `http://localhost:4177` |
| Play | `http://localhost:4178` |
| Shell | `http://localhost:4173` |

## Integrated shell

The shell must be able to reach remote entry files when displaying the complete composed application. During local integration testing, run all projects in separate terminals. In shared environments, run only the shell and point it to deployed remotes using `anantah-shell/.env.local`:

```dotenv
VITE_AUTH_REMOTE_URL=https://identity-dev.example.com/remoteEntry.js
VITE_CORE_REMOTE_URL=https://core-dev.example.com/remoteEntry.js
VITE_FASHION_REMOTE_URL=https://fashion-dev.example.com/remoteEntry.js
VITE_INTELLIGENCE_REMOTE_URL=https://intelligence-dev.example.com/remoteEntry.js
VITE_PLAY_REMOTE_URL=https://play-dev.example.com/remoteEntry.js
```

This is an inherent runtime requirement of micro-frontends: independent development does not require every app, but the composed host requires each screen it renders to be available locally or over the network.

## Shared code

Small brand primitives and typed labels currently live inside each owning project to preserve complete independence. When they become substantial, publish a versioned `@anantah/design-system` package to a package registry. Do not reconnect the repositories with `file:../...` dependencies because that recreates monorepo coupling.

Static UI labels should remain typed source content for now. Introduce a CMS/localization provider only when copy must be published independently from application releases.

## VS Code

Open `anantah-ui.code-workspace` to work across all three projects with separate workspace roots, or open any project folder directly when focusing on one MFE.