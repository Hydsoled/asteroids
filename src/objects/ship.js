import s from "../index";

export default class Ship {
  constructor(s, p5, assets) {
    this.heading = s.PI / 2;
    this.rotation = 0;
    this.p5 = p5;
    this.r = 20;
    this.vel = s.createVector(0, 0);
    this.pos = s.createVector(s.windowWidth / 2, s.windowHeight / 2);

    this.invincible = false;
    this.appear = true;
    this.assets = assets;
  }

  reset() {
    setTimeout(() => {
      this.invincible = false;
    }, 3000);
  }

  respawn() {
    this.invincible = true;

    let interval = setInterval(() => {
      this.appear = !this.appear;
    }, 100);

    setTimeout(() => {
      this.invincible = false;
      this.appear = true;
      clearInterval(interval);
    }, 3000);
  }

  boost() {
    let force = this.p5.Vector.fromAngle(this.heading);
    this.vel.add(force);
  }

  turn() {
    this.heading += this.rotation;
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  checkHit(asteroid) {
    let d = s.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < this.r / 2 + asteroid.r / 2;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
  }

  render() {
    if (this.appear) {
      s.push();
      let r = this.r;
      s.translate(this.pos.x, this.pos.y);
      s.rotate(this.heading + s.PI / 2);
      s.image(this.assets.ship[0], -r, -r, r * 2, r * 2);
      s.pop();
    }
  }
}
