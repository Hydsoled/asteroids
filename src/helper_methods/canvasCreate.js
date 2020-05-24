import s from "../index";

export default class CanvasCreate {
  canvasRes(ship, asteroids) {
    if (window.innerWidth < 450 && window.innerWidth !== s.width) {
      if (ship.r === 20) {
        ship.r /= 1.4;
        for (let i = asteroids.length; i >= 0; i--) {
          if (asteroids[i]) {
            asteroids[i].r /= 1.4;
          }
        }
      }
      s.resizeCanvas(window.innerWidth - 5, (window.innerWidth - 5) * 1.5);
    } else {
      if (ship.r !== 20) {
        ship.r *= 1.4;
        for (let i = asteroids.length; i >= 0; i--) {
          if (asteroids[i]) {
            asteroids[i].r *= 1.4;
          }
        }
      }
      s.resizeCanvas(450, 600);
    }
  }
}
