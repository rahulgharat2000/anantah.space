import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        remotes: {
          auth: {
            type: "module",
            name: "auth",
            entry: environment.VITE_AUTH_REMOTE_URL ?? "http://localhost:4174/remoteEntry.js",
          },
          core: {
            type: "module",
            name: "core",
            entry: environment.VITE_CORE_REMOTE_URL ?? "http://localhost:4175/remoteEntry.js",
          },
          fashion: {
            type: "module",
            name: "fashion",
            entry: environment.VITE_FASHION_REMOTE_URL ?? "http://localhost:4176/remoteEntry.js",
          },
          intelligence: {
            type: "module",
            name: "intelligence",
            entry: environment.VITE_INTELLIGENCE_REMOTE_URL ?? "http://localhost:4177/remoteEntry.js",
          },
          play: {
            type: "module",
            name: "play",
            entry: environment.VITE_PLAY_REMOTE_URL ?? "http://localhost:4178/remoteEntry.js",
          },
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
          "react-router-dom": { singleton: true },
        },
      }),
    ],
    build: {
      target: "esnext",
    },
  };
});