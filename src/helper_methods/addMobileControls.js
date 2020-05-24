import Hammer from "hammerjs";

export default function addMobileControls(ship, laserSpawn) {
  const canvasRef = document.querySelector(".p5Canvas");
  let hammer = new Hammer(canvasRef, {
    recognizers: [
      [Hammer.Tap],
      [Hammer.Pan],
      [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
    ],
  });

  hammer.on("tap", () => {
    laserSpawn.shoot(ship);
  });

  hammer.on("panright", (el) => {
    ship.move("RIGHT");
  });

  hammer.on("panleft", (el) => {
    ship.move("LEFT");
  });

  hammer.on("panup", (el) => {
    ship.move("FORWARD");
  });
}
