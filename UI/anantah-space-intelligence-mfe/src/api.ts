type ChatResponse = {
  role: "assistant";
  content: string;
};

const baseUrl = import.meta.env.VITE_INTELLIGENCE_API_URL ?? "http://localhost:5171";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${baseUrl}/api/v1/intelligence/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("The Intelligence service could not complete the request.");
  }

  return (await response.json()) as ChatResponse;
}