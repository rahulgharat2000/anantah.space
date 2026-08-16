import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";

type GameStatus = "ready" | "running" | "game-over";

type DragonJumpGameProps = {
  onExit: () => void;
};

type SceneStateHandler = (status: GameStatus, score: number, bestScore: number) => void;

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const GROUND_Y = 432;

class DragonJumpScene extends Phaser.Scene {
  private dragon!: Phaser.Physics.Arcade.Sprite;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private bestText!: Phaser.GameObjects.Text;
  private promptText!: Phaser.GameObjects.Text;
  private spawnTimer?: Phaser.Time.TimerEvent;
  private status: GameStatus = "ready";
  private score = 0;
  private bestScore = Number(localStorage.getItem("anantah-dragon-jump-best") ?? 0);
  private runStartedAt = 0;
  private speed = 390;
  private readonly onStateChange: SceneStateHandler;

  constructor(onStateChange: SceneStateHandler) {
    super("DragonJumpScene");
    this.onStateChange = onStateChange;
  }

  create() {
    this.createTextures();
    this.createWorld();

    this.dragon = this.physics.add.sprite(150, GROUND_Y - 42, "dragon");
    this.dragon.setOrigin(0.5, 1).setDepth(5);
    this.dragon.setCollideWorldBounds(true);
    this.dragon.body?.setSize(48, 40).setOffset(8, 12);

    const ground = this.physics.add.staticImage(GAME_WIDTH / 2, GROUND_Y + 20, "ground");
    ground.setDepth(4);
    this.physics.add.collider(this.dragon, ground);

    this.obstacles = this.physics.add.group({ allowGravity: false, immovable: true });
    this.physics.add.collider(this.dragon, this.obstacles, () => this.endRun());

    this.scoreText = this.add.text(40, 32, "00000", {
      color: "#f7fbff",
      fontFamily: "Barlow Condensed, sans-serif",
      fontSize: "38px",
      fontStyle: "bold",
    }).setDepth(10);
    this.bestText = this.add.text(GAME_WIDTH - 40, 38, `BEST ${this.padScore(this.bestScore)}`, {
      color: "#87a9d8",
      fontFamily: "Manrope, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
    }).setOrigin(1, 0).setDepth(10);
    this.promptText = this.add.text(GAME_WIDTH / 2, 210, "PRESS SPACE OR TAP TO LAUNCH", {
      align: "center",
      color: "#ffffff",
      fontFamily: "Barlow Condensed, sans-serif",
      fontSize: "30px",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(10);

    this.input.keyboard?.on("keydown-SPACE", this.handleAction, this);
    this.input.keyboard?.on("keydown-UP", this.handleAction, this);
    this.input.on("pointerdown", this.handleAction, this);
    this.events.on("external-jump", this.handleAction, this);
    this.events.on("external-restart", this.restartRun, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeListeners, this);
    this.onStateChange(this.status, this.score, this.bestScore);
  }

  update() {
    if (this.status !== "running") return;

    this.score = Math.floor((this.time.now - this.runStartedAt) / 100);
    this.speed = Math.min(720, 390 + this.score * 1.45);
    this.scoreText.setText(this.padScore(this.score));
    this.dragon.setAngle(Phaser.Math.Clamp(this.dragon.body?.velocity.y ?? 0, -500, 700) * 0.018);

    for (const obstacle of this.obstacles.getChildren()) {
      const sprite = obstacle as Phaser.Physics.Arcade.Sprite;
      sprite.setVelocityX(-this.speed);
      if (sprite.x < -80) sprite.destroy();
    }
  }

  private createTextures() {
    const graphics = this.make.graphics({ x: 0, y: 0 });

    graphics.fillStyle(0x193765).fillRect(0, 0, GAME_WIDTH, 40);
    graphics.fillStyle(0x2f5b91).fillRect(0, 0, GAME_WIDTH, 4);
    graphics.generateTexture("ground", GAME_WIDTH, 40);
    graphics.clear();

    graphics.fillStyle(0x6ee7b7);
    graphics.fillTriangle(6, 34, 22, 12, 31, 38);
    graphics.fillTriangle(25, 38, 42, 5, 52, 39);
    graphics.fillTriangle(46, 39, 59, 18, 66, 42);
    graphics.fillStyle(0x2dd4bf);
    graphics.fillTriangle(22, 12, 31, 38, 27, 34);
    graphics.fillTriangle(42, 5, 52, 39, 46, 35);
    graphics.generateTexture("crystal", 72, 46);
    graphics.clear();

    graphics.fillStyle(0x71d1c8).fillEllipse(31, 31, 45, 29);
    graphics.fillStyle(0x45a9b8).fillTriangle(12, 32, 0, 17, 19, 23);
    graphics.fillTriangle(20, 20, 26, 2, 35, 21);
    graphics.fillTriangle(39, 21, 48, 5, 49, 27);
    graphics.fillStyle(0x8ce7d7).fillEllipse(52, 24, 27, 23);
    graphics.fillStyle(0x07142d).fillCircle(58, 20, 3);
    graphics.fillStyle(0xd8fff6).fillCircle(59, 19, 1);
    graphics.fillStyle(0x71d1c8).fillTriangle(62, 29, 70, 34, 59, 35);
    graphics.fillStyle(0x45a9b8).fillTriangle(22, 36, 9, 48, 31, 42);
    graphics.fillTriangle(41, 37, 50, 50, 53, 38);
    graphics.generateTexture("dragon", 72, 52);
    graphics.destroy();
  }

  private createWorld() {
    this.cameras.main.setBackgroundColor("#07142d");
    for (let index = 0; index < 70; index += 1) {
      const size = Phaser.Math.Between(1, 3);
      this.add.circle(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(20, GROUND_Y - 60),
        size,
        index % 8 === 0 ? 0x6ee7b7 : 0x91acd2,
        Phaser.Math.FloatBetween(0.25, 0.75),
      );
    }

    this.add.circle(760, 162, 102, 0x152e59, 0.9);
    this.add.circle(730, 135, 13, 0x0d2144, 0.7);
    this.add.circle(792, 190, 22, 0x0d2144, 0.62);
    this.add.rectangle(GAME_WIDTH / 2, GROUND_Y - 2, GAME_WIDTH, 2, 0x6f91c1, 0.55);
  }

  private handleAction() {
    if (this.status === "game-over") {
      this.restartRun();
      return;
    }

    if (this.status === "ready") this.startRun();

    const body = this.dragon.body as Phaser.Physics.Arcade.Body;
    if (body.blocked.down || body.touching.down) {
      this.dragon.setVelocityY(-690);
      this.tweens.add({ targets: this.dragon, scaleX: 1.08, scaleY: 0.94, duration: 90, yoyo: true });
    }
  }

  private startRun() {
    this.status = "running";
    this.score = 0;
    this.speed = 390;
    this.runStartedAt = this.time.now;
    this.promptText.setVisible(false);
    this.spawnTimer = this.time.addEvent({
      delay: 1350,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });
    this.time.delayedCall(850, this.spawnObstacle, [], this);
    this.onStateChange(this.status, this.score, this.bestScore);
  }

  private spawnObstacle() {
    if (this.status !== "running") return;
    const obstacle = this.obstacles.create(GAME_WIDTH + 50, GROUND_Y, "crystal") as Phaser.Physics.Arcade.Sprite;
    const scale = Phaser.Math.FloatBetween(0.78, 1.18);
    obstacle.setOrigin(0.5, 1).setScale(scale).setDepth(5).setVelocityX(-this.speed);
    obstacle.body?.setSize(48, 39).setOffset(11, 5);
  }

  private endRun() {
    if (this.status !== "running") return;
    this.status = "game-over";
    this.physics.pause();
    this.spawnTimer?.remove(false);
    this.dragon.setTint(0xff8f86).setAngle(12);

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem("anantah-dragon-jump-best", String(this.bestScore));
      this.bestText.setText(`BEST ${this.padScore(this.bestScore)}`);
    }

    this.promptText.setText(`RUN ENDED  ·  ${this.padScore(this.score)}\nTAP OR PRESS SPACE TO RESTART`).setVisible(true);
    this.onStateChange(this.status, this.score, this.bestScore);
  }

  private restartRun() {
    if (this.status !== "game-over") return;
    this.physics.resume();
    this.obstacles.clear(true, true);
    this.dragon.clearTint().setAngle(0).setPosition(150, GROUND_Y - 42).setVelocity(0, 0);
    this.status = "ready";
    this.score = 0;
    this.speed = 390;
    this.scoreText.setText(this.padScore(this.score));
    this.promptText.setText("PRESS SPACE OR TAP TO LAUNCH").setVisible(true);
    this.onStateChange(this.status, this.score, this.bestScore);
  }

  private removeListeners() {
    this.input.keyboard?.off("keydown-SPACE", this.handleAction, this);
    this.input.keyboard?.off("keydown-UP", this.handleAction, this);
    this.input.off("pointerdown", this.handleAction, this);
    this.events.off("external-jump", this.handleAction, this);
    this.events.off("external-restart", this.restartRun, this);
  }

  private padScore(value: number) {
    return String(value).padStart(5, "0");
  }
}

export default function DragonJumpGame({ onExit }: DragonJumpGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem("anantah-dragon-jump-best") ?? 0));

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.replaceChildren();

    const scene = new DragonJumpScene((nextStatus, nextScore, nextBestScore) => {
      setStatus(nextStatus);
      setScore(nextScore);
      setBestScore(nextBestScore);
    });
    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      backgroundColor: "#07142d",
      physics: { default: "arcade", arcade: { gravity: { x: 0, y: 1750 }, debug: false } },
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene,
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
      container.replaceChildren();
    };
  }, []);

  const emitToScene = (eventName: "external-jump" | "external-restart") => {
    gameRef.current?.scene.getScene("DragonJumpScene")?.events.emit(eventName);
  };

  return (
    <section className="dragon-game" aria-label="Dragon Jump game">
      <header className="dragon-game__header">
        <button type="button" onClick={onExit} aria-label="Return to game library">←</button>
        <div><p>ANANTAH SPACE PLAY</p><h1>Dragon Jump</h1></div>
        <div className="dragon-game__score" aria-live="polite"><span>Run {score}</span><span>Best {bestScore}</span></div>
      </header>
      <div className="dragon-game__stage" ref={containerRef} />
      <div className="dragon-game__controls">
        <p>{status === "game-over" ? "Your flight ended. Try the route again." : "Jump over the crystal fields and keep flying."}</p>
        <div>
          <span><kbd>Space</kbd> or <kbd>↑</kbd></span>
          <button type="button" onClick={() => emitToScene(status === "game-over" ? "external-restart" : "external-jump")}>
            {status === "game-over" ? "Restart" : status === "ready" ? "Launch" : "Jump"}
          </button>
        </div>
      </div>
    </section>
  );
}