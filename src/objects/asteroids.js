import s from "../index";

export default class Asteroids {
  constructor(p5, pos, r, ship) {
    const radiuses = [25.2, 50.4, 100.8];
    //checks asteroids is passed
    if (pos) {
      this.pos = pos.copy();
      let radiusIndex = radiuses.findIndex(
        (element) => element === r || element === r * 1.4
      );
      if (radiusIndex === 0) {
        return undefined;
      }
      this.r = radiuses[radiusIndex - 1];
    } else {
      this.pos = s.createVector(s.random(s.width), s.random(s.height));
      this.r = radiuses[Math.floor(Math.random() * 3)];
      let k = Math.floor(Math.random() * 2);
      if (k === 0) this.pos.x = 0;
      else this.pos.y = 0;
    }
    if (ship && ship.r !== 20) {
      this.r /= 1.4;
    }
    this.p5 = p5;
    this.vel = this.p5.Vector.random2D();
  }

  render(asset) {
    if (!this.r) return;
    s.push();
    s.stroke(255);
    s.translate(this.pos.x, this.pos.y);
    s.image(asset, -this.r / 2, -this.r / 2, this.r, this.r);
    s.pop();
  }

  checkHit() {}

  update() {
    this.pos.add(this.vel);
  }

  breakUp(r, ship) {
    let newAsteroid = [];
    newAsteroid[0] = new Asteroids(this.p5, this.pos, r, ship);
    newAsteroid[1] = new Asteroids(this.p5, this.pos, r, ship);
    return newAsteroid;
  }
}
