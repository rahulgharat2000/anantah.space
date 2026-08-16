import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any


HOST = os.getenv("ANANTAH_INTELLIGENCE_HOST", "127.0.0.1")
PORT = int(os.getenv("ANANTAH_INTELLIGENCE_PORT", "5171"))


def create_preview_response(message: str) -> str:
    normalized = message.strip()
    if not normalized:
        return "Please enter a message so we can think through it together."

    return (
        f'I received: "{normalized}". The Python Intelligence service is online. '
        "A model provider is not configured yet, so this is a safe local preview response."
    )


class IntelligenceHandler(BaseHTTPRequestHandler):
    server_version = "AnantahIntelligence/0.1"

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/v1/intelligence/health":
            self._write_json(200, {"service": "anantah-space-intelligence", "status": "ok", "runtime": "python"})
            return

        self._write_json(404, {"message": "Route not found"})

    def do_POST(self) -> None:
        if self.path != "/api/v1/intelligence/chat":
            self._write_json(404, {"message": "Route not found"})
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(content_length) or b"{}")
            message = payload.get("message", "")

            if not isinstance(message, str):
                self._write_json(400, {"message": "The message field must be text"})
                return

            self._write_json(200, {"role": "assistant", "content": create_preview_response(message)})
        except (json.JSONDecodeError, ValueError):
            self._write_json(400, {"message": "Request body must be valid JSON"})

    def log_message(self, format: str, *args: Any) -> None:
        print(f"{self.address_string()} - {format % args}")

    def _write_json(self, status_code: int, payload: dict[str, Any]) -> None:
        content = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def _send_cors_headers(self) -> None:
        origin = self.headers.get("Origin", "")
        allowed_origins = {"http://localhost:4173", "http://localhost:4177"}
        if origin in allowed_origins:
            self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), IntelligenceHandler)
    print(f"Anantah Space Intelligence listening on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Stopping Anantah Space Intelligence")
    finally:
        server.server_close()