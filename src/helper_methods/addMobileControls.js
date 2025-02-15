import hammer from "hammerjs";
import Laser from "../objects/laser";

export default function addMobileControls(ship, lasers, p5, action) {
    const canvasRef = document.querySelector(".p5Canvas");
    let hammer = new Hammer(canvasRef, {
        recognizers: [
            [Hammer.Tap],
            [Hammer.Pan],
            [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
        ],
    });
    hammer.on("tap", () => {
        if (action.lives > 0){
            lasers.push(new Laser(ship.pos, ship.heading, p5));
        }
    });
    hammer.on("panright", (el) => {
        ship.setRotation(0.1);
    });
    hammer.on("panleft", (el) => {
        ship.setRotation(-0.1);
    });
    hammer.on("panend", (el) => {
        ship.setRotation(0);
    });
    hammer.on("panup", (el) => {
        ship.vel.mult(0.9);
        ship.boost();
    });
}
