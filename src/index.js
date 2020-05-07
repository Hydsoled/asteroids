import p5 from "p5";
import Asteroids from "./objects/asteroids";
const asteroids = new Asteroids();
console.log(asteroids.player);
const sketch = p5 => {
    p5.setup = () => {
        p5.createCanvas(400,400);
    };
    p5.draw = () => {
        p5.background("#111");
        p5.fill(255,255,0);
    };
};

new p5(sketch);

export default sketch;