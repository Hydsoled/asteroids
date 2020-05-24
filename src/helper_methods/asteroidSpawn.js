import Asteroids from "../objects/asteroids";
export default class AsteroidSpawn {
  constructor({ p5, ship }) {
    this.p5 = p5;
    this.ship = ship;
    this.asteroids = [];
  }

  spawn() {
    this.asteroids.push(
      new Asteroids(this.p5, undefined, undefined, this.ship)
    );
  }

  checkHit(ship) {
    return false;
  }
}
