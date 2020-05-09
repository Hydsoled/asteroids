import p5 from "p5";
import Ship from "./objects/ship";
import KeyboardHelper from "./helper_methods/keyboardHelper";
const sketch = (p) => {
    var keyboardHelper = new KeyboardHelper();
    var ship = new Ship(p,p5);
    let button = [];
    p.setup = () => {
        p.createCanvas(p.windowWidth-5, p.windowHeight-5);
    };

    p.draw = () => {
        p.background(0);
        ship.render();
        ship.turn();
        keyboardHelper.keyPress(button,ship);
        ship.update();
    };
    p.keyPressed = () => {
        button[p.keyCode] = 1;
    }
    p.keyReleased = () => {
        button[p.keyCode] = 0;
        ship.setRotation(0);
    }
};
let s = new p5(sketch);
export default s;