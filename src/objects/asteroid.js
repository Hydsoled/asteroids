import s from "../index";

export default class Asteroids {
  constructor(p5, ship, allAssets, pos, r) {
    this.allAssets = allAssets;

    const radiuses = [25.2, 50.4, 100.8];

    // checks asteroids is passed
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

  update() {
    this.pos.add(this.vel);
  }

  breakUp(r, ship) {
    let newAsteroid = [];
    newAsteroid[0] = new Asteroids(this.p5, ship, this.allAssets, this.pos, r);
    newAsteroid[1] = new Asteroids(this.p5, ship, this.allAssets, this.pos, r);
    return newAsteroid;
  }

  render() {
    if (!this.r) return;
    s.push();
    s.stroke(255);
    s.translate(this.pos.x, this.pos.y);
    s.image(
      this.allAssets.asteroid[0],
      -this.r / 2,
      -this.r / 2,
      this.r,
      this.r
    );
    s.pop();
  }
}
