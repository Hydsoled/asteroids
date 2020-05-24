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
    this.showLevelText = true;
  }

  reset = (asteroidSpawn, updateBackground) => {
    this.level = 0;
    this.score = 0;
    this.lives = this.initLives;

    let spnTimeMs = 5000;

    const showLevelText = () => {
      this.showLevelText = true;
      setTimeout(() => {
        this.showLevelText = false;
      }, 3000);
    };

    const resetSpawnInterval = (spnTimeMs) => {
      if (this.spnTimeInterval) clearInterval(this.spnTimeInterval);
      this.spnTimeInterval = setInterval(() => {
        asteroidSpawn.spawn();
      }, spnTimeMs);
    };

    const checkLevel = () => {
      this.lives > 0 &&
        setTimeout(() => {
          if (spnTimeMs > 2000) spnTimeMs -= 1000;
          else if (spnTimeMs > 200) spnTimeMs -= 200;
          showLevelText();
          updateBackground();
          resetSpawnInterval(spnTimeMs);
          checkLevel();
          this.level += 1;
          this.showLevelText = true;
        }, 6000);
    };

    showLevelText();
    resetSpawnInterval(spnTimeMs);
    checkLevel();
  };

  update() {
    if (this.hits) {
      this.ship.pos = s.createVector(s.random(s.width), s.random(s.height));
      this.lives--;
      this.hits = false;
    }
  }

  render() {
    // Level Info
    if (this.showLevelText && this.lives > 0) {
      s.push();
      s.fill(255);
      s.textSize(s.width * 0.1);
      s.textAlign(s.CENTER, s.CENTER);
      s.text("Level " + (this.level + 1), s.width / 2, s.height / 2);
      s.pop();
    }

    // Lives
    s.push();
    s.fill(255);
    s.textSize(s.width * 0.03);
    s.text("live: " + this.lives, s.width * 0.03, s.height * 0.12);
    s.pop();

    // Score
    s.push();
    s.fill(255);
    s.textSize(s.width * 0.03);
    s.text("score: " + this.score, s.width * 0.03, s.height * 0.17);
    s.pop();
  }
}
