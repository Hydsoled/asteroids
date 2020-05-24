import Movement from "./movement";

export default class ObjectMovement {
  constructor() {}

  static asteroidMovement(asteroids, asset) {
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].render(asset);
      asteroids[i].update();
      Movement.edge(asteroids[i], asteroids[i].pos, asteroids[i].r);
    }
  }

  //renders lasers and checks if asteroids is trigger by laser
  static laserMovement(asteroidSpawn, lasers, ship, action) {
    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();

      if (Movement.edge(lasers[i], lasers[i].pos)) {
        lasers.splice(i, 1);
      } else {
        console.log(lasers[i]);

        asteroidSpawn.asteroids.forEach((asteroid, j) => {
          if (lasers[i].hits(asteroid)) {
            action.score++;
            let newAsteroids = asteroid.breakUp(asteroid.r, ship);
            if (newAsteroids[0]) {
              asteroidSpawn.asteroids = asteroidSpawn.asteroids.concat(
                newAsteroids
              );
            }
            asteroidSpawn.asteroids.splice(j, 1);
            lasers.splice(i, 1);
          }
        });
      }
    }
  }

  //renders ship and checks if asteroids is trigger by ship
  static shipMovement(ship, asteroids, keyboardHelper, button, action) {
    if (action.lives === 0) return false;

    asteroids.forEach((asteroid) => {
      if (ship.checkHit(asteroid) && !ship.invincible) {
        ship.respawn();
        action.hits = true;
      }
    });

    ship.turn();
    keyboardHelper.keyPress(button, ship);
    ship.update();
    Movement.edge(ship, ship.pos, ship.r);
  }
}
