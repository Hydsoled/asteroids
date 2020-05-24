import Movement from "../helper_methods/movement";
import Laser from "./laser";

export default class LaserSpawn {
  constructor({ p5 }) {
    this.p5 = p5;
    this.lasers = [];
  }

  shoot(ship) {
    this.lasers.push(new Laser(ship.pos, ship.heading, this.p5));
  }

  update(asteroidSpawn, ship, action) {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      if (Movement.edge(laser.pos)) {
        this.lasers.splice(i, 1);
        continue;
      }

      let asteroids = asteroidSpawn.asteroids;
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (laser.hits(asteroids[j])) {
          action.score++;

          let newAsteroid = asteroids[j].breakUp(asteroids[j].r, ship);

          if (newAsteroid[0]) {
            asteroids = asteroids.concat(newAsteroid);
          }

          asteroids.splice(j, 1);
          this.lasers.splice(i, 1);
          asteroidSpawn.asteroids = asteroids;
          break;
        }
      }
    }
  }

  render() {
    this.lasers.forEach((laser) => {
      laser.update();
      laser.render();
    });
  }
}
