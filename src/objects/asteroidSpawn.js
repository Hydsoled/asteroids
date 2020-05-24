import Movement from "../helper_methods/movement";
import Asteroids from "./asteroid";

export default class AsteroidSpawn {
  constructor({ p5, ship, allAssets }) {
    this.p5 = p5;
    this.allAssets = allAssets;
    this.ship = ship;
    this.asteroids = [];
  }

  spawn() {
    this.asteroids.push(
      new Asteroids(this.p5, undefined, undefined, this.ship, this.allAssets)
    );
  }

  checkHit(action, ship) {
    if (action.lives === 0) return false;

    this.asteroids.forEach((asteroid) => {
      if (ship.checkHit(asteroid) && !ship.invincible) {
        ship.respawn();
        action.hits = true;
      }
    });
  }

  render() {
    this.asteroids.forEach((asteroid) => {
      asteroid.render();
      asteroid.update();
      Movement.edge(asteroid.pos, asteroid.r);
    });
  }
}
