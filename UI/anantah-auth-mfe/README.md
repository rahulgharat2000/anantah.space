# Anantah Auth MFE

Independent React micro-frontend for sign in, account creation, and password recovery.

```powershell
npm install
npm run dev
```

Open `http://localhost:4174/auth/login`.

Demo credentials:

```text
hello@anantah.dev
anantah123
```

The MFE exposes `./AuthApp` through `remoteEntry.js`. Authentication currently uses a typed mock adapter in `src/lib/platform.ts`; replace that adapter with the future OIDC/API implementation without changing the forms.

```powershell
npm run build
npm run typecheck
```