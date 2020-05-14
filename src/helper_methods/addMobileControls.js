import hammer from "hammerjs";
import Laser from "../objects/laser";

export default function addMobileControls(ship, lasers, p5) {
    const canvasRef = document.querySelector(".p5Canvas");
    let hammer = new Hammer(canvasRef, {
        recognizers: [
            [Hammer.Tap],
            [Hammer.Pan],
            [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
        ],
    });

    hammer.on("tap", () => {
        lasers.push(new Laser(ship.pos, ship.heading, p5));
    });
    hammer.on("panright", (el) => {
        ship.setRotation(0.1);
    });
    hammer.on("panleft", (el) => {
        ship.setRotation(-0.1);
    });
    hammer.on("panend", (el) => {
        console.log('up');
        ship.setRotation(0);
    });
    hammer.on("panup", (el) => {
        ship.vel.mult(0.9);
        ship.boost();
    });

}
