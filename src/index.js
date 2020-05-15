import p5 from "p5";
import mc from "./helper_methods/addMobileControls";
import Ship from "./objects/ship";
import KeyboardHelper from "./helper_methods/keyboardHelper";
import Asteroids from "./objects/asteroids";
import Laser from "./objects/laser";
import AsteroidField from "./helper_methods/asteroidField";
import Action from "./helper_methods/action";
import CanvasCreate from "./helper_methods/canvasCreate";

const sketch = (p) => {
    let lasers = [];
    let asteroids = [];
    let button = [];
    let score = 0;
    let lives = 3;
    const keyboardHelper = new KeyboardHelper();
    let ship = new Ship(p, p5);
    const action = new Action(lives, score, ship);
    const createCanvas = new CanvasCreate();
    p.setup = () => {
        createCanvas.canvasSetup(ship,asteroids,action);
        mc(ship,lasers, p5, action);
    };
    p.draw = () => {
        p.background(0);
        AsteroidField.asteroidMovement(asteroids);
        asteroids = AsteroidField.laserMovement(asteroids, lasers, ship, action);
        AsteroidField.shipMovement(ship, asteroids, keyboardHelper, button, action);
        action.livesRender();
        action.scoreRender();
    };
    p.keyPressed = () => {
        button[p.keyCode] = 1;
        if (p.keyCode === 32 && action.lives > 0) {
            lasers.push(new Laser(ship.pos, ship.heading, p5));
        }
    }
    p.keyReleased = () => {
        button[p.keyCode] = 0;
        ship.setRotation(0);
    }

    p.windowResized = () => {
        createCanvas.canvasRes(ship, asteroids);
    };
};
const s = new p5(sketch);
export default s;