declare module "auth/AuthApp" {
  import type { ComponentType } from "react";
  const AuthApp: ComponentType<{ onAuthenticated?: () => void }>;
  export default AuthApp;
}

declare module "core/CoreApp" {
  import type { ComponentType } from "react";
  const CoreApp: ComponentType;
  export default CoreApp;
}

declare module "fashion/FashionApp" {
  import type { ComponentType } from "react";
  const FashionApp: ComponentType;
  export default FashionApp;
}

declare module "intelligence/IntelligenceApp" {
  import type { ComponentType } from "react";
  const IntelligenceApp: ComponentType;
  export default IntelligenceApp;
}

declare module "play/PlayApp" {
  import type { ComponentType } from "react";
  const PlayApp: ComponentType;
  export default PlayApp;
}