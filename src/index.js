import p5 from "p5";
import Ship from "./objects/ship";

const sketch = p5 => {
    var ship = new Ship(p5.PI);
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
        p5.background(0);
        ship.render();
    };
    // p5.keyPressed = () => {
    //     if (p5.keyCode == p5.RIGHT_ARROW) {
    //         ship.turn(0.1);
    //     }
    //     else if (p5.keyCode == p5.LEFT_ARROW){
    //         ship.turn(-0.1);
    //     }
    // }
};
let s = new p5(sketch);
export default s;