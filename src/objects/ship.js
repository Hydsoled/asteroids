import Movement from "../helper_methods/movement";
import s from "../index";

export default class Ship {
  constructor({ p, p5, allAssets }) {
    this.heading = p.PI / 2;
    this.rotation = 0;
    this.p5 = p5;
    this.r = 20;
    this.vel = p.createVector(0, 0);
    this.pos = p.createVector(p.windowWidth / 2, p.windowHeight / 2);
    this.invincible = false;
    this.appear = true;
    this.allAssets = allAssets;
  }

  reset() {
    this.respawn();
    this.pos = s.createVector(s.width / 2, s.height / 2);
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

  // Separate from handleKeyPress because
  // we need to call this function from mobile touch
  move(direction) {
    let rotation = 0;

    if (direction === "RIGHT") {
      rotation = 0.1;
    } else if (direction === "LEFT") {
      rotation = -0.1;
    } else if (direction === "FORWARD") {
      this.vel.mult(0.9);
      this.boost();
    }

    this.heading += rotation;
  }

  handleKeyPress() {
    if (s.keyIsDown(s.RIGHT_ARROW)) {
      this.move("RIGHT");
    } else if (s.keyIsDown(s.LEFT_ARROW)) {
      this.move("LEFT");
    } else if (s.keyIsDown(s.UP_ARROW)) {
      this.move("FORWARD");
    }
  }

  checkHit(asteroid) {
    let d = s.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < this.r / 2 + asteroid.r / 2;
  }

  update(action) {
    if (action.lives === 0) return false;

    this.handleKeyPress();

    this.pos.add(this.vel);
    this.vel.mult(0.95);

    Movement.edge(this.pos, this.r);
  }

  render(action) {
    if (action.lives === 0) return false;

    if (this.appear) {
      s.push();
      let r = this.r;
      s.translate(this.pos.x, this.pos.y);
      s.rotate(this.heading + s.PI / 2);
      s.image(this.allAssets.ship[0], -r, -r, r * 2, r * 2);
      s.pop();
    }
  }
}
