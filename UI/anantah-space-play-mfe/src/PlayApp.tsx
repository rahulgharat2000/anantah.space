import { lazy, Suspense, useState } from "react";
import dragonJumpKeyArt from "./assets/dragon-jump-key-art.svg";
import "./styles.css";

const DragonJumpGame = lazy(() => import("./DragonJumpGame"));

const filters = ["All games", "Adventure", "Strategy", "Arcade", "Puzzle"];

const games = [
  {
    name: "Dragon Jump",
    category: "Arcade",
    status: "Play now",
    image: dragonJumpKeyArt,
    players: "1 player",
  },
  {
    name: "Orbit Tactician",
    category: "Strategy",
    status: "In development",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1200&q=88",
    players: "1-4 players",
  },
  {
    name: "Signal Lost",
    category: "Adventure",
    status: "Coming soon",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=88",
    players: "1 player",
  },
  {
    name: "Gravity Grid",
    category: "Puzzle",
    status: "Prototype",
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1200&q=88",
    players: "1 player",
  },
  {
    name: "Nebula Arena",
    category: "Arcade",
    status: "Concept",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88",
    players: "2-8 players",
  },
  {
    name: "Moonbase Assembly",
    category: "Strategy",
    status: "Coming soon",
    image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=1200&q=88",
    players: "1-2 players",
  },
];

export default function PlayApp() {
  const [activeFilter, setActiveFilter] = useState("All games");
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const visibleGames = activeFilter === "All games"
    ? games
    : games.filter((game) => game.category === activeFilter);

  if (activeGame === "Dragon Jump") {
    return (
      <Suspense fallback={<div className="game-loading">Preparing Dragon Jump...</div>}>
        <DragonJumpGame onExit={() => setActiveGame(null)} />
      </Suspense>
    );
  }

  return (
    <main className="play-page">
      <header className="play-header">
        <a className="play-brand" href="/" aria-label="Anantah home">
          <span aria-hidden="true">A</span>
          <div><strong>ANANTAH</strong><small>SPACE PLAY</small></div>
        </a>
        <nav aria-label="Play navigation">
          <a href="#library">Browse</a>
          <a href="#library">My games</a>
          <a href="#community">Community</a>
        </nav>
        <button type="button" aria-label="Open player profile" title="Player profile">RB</button>
      </header>

      <section className="play-hero">
        <img src={games[0].image} alt="Luminous dragon jumping over crystal obstacles in deep space" />
        <div className="play-hero__shade" />
        <div className="play-hero__content">
          <p>FEATURED MISSION</p>
          <h1>Dragon Jump</h1>
          <span>Leap across the crystal fields, outrun the horizon, and set a new flight record.</span>
          <div>
            <button type="button" onClick={() => setActiveGame("Dragon Jump")}>Play now</button>
            <small>Arcade · Single player</small>
          </div>
        </div>
      </section>

      <section className="game-library" id="library">
        <header>
          <div>
            <p>THE LIBRARY</p>
            <h2>Choose your next world</h2>
          </div>
          <span>{visibleGames.length} titles</span>
        </header>

        <div className="game-filters" role="tablist" aria-label="Game categories">
          {filters.map((filter) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={activeFilter === filter ? "active" : ""}
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="play-grid">
          {visibleGames.map((game) => (
            <article key={game.name}>
              <div className="game-card__media">
                <img src={game.image} alt="" loading="lazy" />
                <span>{game.category}</span>
              </div>
              <div className="game-card__body">
                <h3>{game.name}</h3>
                <p>{game.status}</p>
                <div>
                  <span>{game.players}</span>
                  <button
                    type="button"
                    aria-label={game.name === "Dragon Jump" ? `Play ${game.name}` : `Open ${game.name}`}
                    title={game.name === "Dragon Jump" ? `Play ${game.name}` : `Open ${game.name}`}
                    onClick={() => game.name === "Dragon Jump" && setActiveGame(game.name)}
                  >→</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="play-community" id="community">
        <div><p>PLAYER NETWORK</p><h2>Play together across every world.</h2></div>
        <span>Profiles, achievements, leaderboards, and multiplayer services will connect here as each game becomes playable.</span>
      </section>

      <footer className="play-footer"><strong>ANANTAH SPACE PLAY</strong><span>© 2026 Anantah.space</span></footer>
    </main>
  );
}
