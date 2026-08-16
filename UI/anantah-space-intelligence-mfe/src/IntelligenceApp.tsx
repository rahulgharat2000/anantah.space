import { useState, type FormEvent } from "react";
import { sendChatMessage } from "./api";
import "./styles.css";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Help me plan a focused week",
  "Explain a difficult idea simply",
  "Draft a product launch outline",
  "Turn my notes into clear actions",
];

export default function IntelligenceApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = prompt.trim();

    if (!content || isSending) {
      return;
    }

    setMessages((current) => [...current, { id: Date.now(), role: "user", content }]);
    setPrompt("");
    setIsSending(true);

    try {
      const response = await sendChatMessage(content);
      setMessages((current) => [...current, { id: Date.now() + 1, role: response.role, content: response.content }]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", content: "I could not reach the Python Intelligence service. Start it on port 5171 and try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="intelligence-page">
      <aside className="chat-sidebar">
        <div className="chat-brand">
          <span aria-hidden="true">A</span>
          <div>
            <strong>ANANTAH</strong>
            <small>SPACE INTELLIGENCE</small>
          </div>
        </div>
        <button className="new-chat" type="button" onClick={() => setMessages([])}>
          <span aria-hidden="true">+</span> New conversation
        </button>
        <nav aria-label="Recent conversations">
          <p>Recent</p>
          <button type="button">Product launch ideas</button>
          <button type="button">Learning roadmap</button>
          <button type="button">Research notes</button>
        </nav>
        <div className="chat-sidebar__footer">
          <span className="status-dot" /> Local preview
        </div>
      </aside>

      <section className="chat-workspace">
        <header className="chat-header">
          <div>
            <strong>Anantah Assistant</strong>
            <span>General reasoning</span>
          </div>
          <button type="button" aria-label="Open account menu" title="Account">RB</button>
        </header>

        <div className="chat-thread" aria-live="polite">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <span className="chat-welcome__mark" aria-hidden="true">A</span>
              <p>ANANTAH SPACE INTELLIGENCE</p>
              <h1>What can we think through?</h1>
              <div className="suggestion-grid">
                {suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => setPrompt(suggestion)}>
                    {suggestion}<span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((message) => (
                <article className={`message message--${message.role}`} key={message.id}>
                  <span>{message.role === "assistant" ? "A" : "You"}</span>
                  <p>{message.content}</p>
                </article>
              ))}
              {isSending && <p className="chat-thinking">Anantah is thinking...</p>}
            </div>
          )}
        </div>

        <form className="chat-composer" onSubmit={sendMessage}>
          <label htmlFor="chat-prompt">Message Anantah Intelligence</label>
          <textarea
            id="chat-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask anything..."
            rows={2}
          />
          <div>
            <button className="attach-button" type="button" aria-label="Attach a file" title="Attach file">+</button>
            <span>AI responses may contain mistakes.</span>
            <button className="send-button" type="submit" aria-label="Send message" title="Send" disabled={isSending}>↑</button>
          </div>
        </form>
      </section>
    </main>
  );
}
