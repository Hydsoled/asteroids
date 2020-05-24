import s from "../index";

export default class Action {
  constructor({ lives, ship }) {
    this.initLives = lives;
    this.lives = lives;
    this.score = 0;
    this.level = 0;
    this.ship = ship;
    this.hits = false;

    this.spnTimeInterval;
  }

  reset = (asteroidSpawn, assets, img) => {
    this.level = 0;
    this.score = 0;
    this.lives = this.initLives;

    let spnTimeMs = 5000;

    const resetSpawnInterval = (spnTimeMs) => {
      if (this.spnTimeInterval) clearInterval(this.spnTimeInterval);
      this.spnTimeInterval = setInterval(() => {
        asteroidSpawn.spawn();
      }, spnTimeMs);
    };

    const checkLevel = () => {
      setTimeout(() => {
        if (spnTimeMs > 2000) {
          spnTimeMs -= 500;
          if (assets.background[img + 1]) img++;
        } else if (spnTimeMs > 200) spnTimeMs -= 200;

        resetSpawnInterval(spnTimeMs);
        checkLevel();
      }, 1000);
    };

    resetSpawnInterval(spnTimeMs);
    checkLevel();
  };

  livesRender() {
    if (this.hits) {
      this.ship.pos = s.createVector(s.random(s.width), s.random(s.height));
      this.lives--;
      this.hits = false;
    }
    s.push();
    s.fill(255);
    s.textSize(s.width * 0.03);
    s.text("live: " + this.lives, s.width * 0.03, s.height * 0.12);
    s.pop();
  }

  scoreRender() {
    s.push();
    s.fill(255);
    s.textSize(s.width * 0.03);
    s.text("score: " + this.score, s.width * 0.03, s.height * 0.17);
    s.pop();
  }
}
