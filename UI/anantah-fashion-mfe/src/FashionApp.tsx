import { FashionRouter } from "./app/router/FashionRouter";
import { AuthProvider } from "./app/providers/AuthProvider";
import "./design-system/tokens.css";
import "./design-system/components.css";
import "./base.css";
import "./fashion.css";

export default function FashionApp() {
  return (
    <AuthProvider>
      <FashionRouter />
    </AuthProvider>
  );
}
