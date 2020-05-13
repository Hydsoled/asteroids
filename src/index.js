import p5 from "p5";
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
    let lives = 15;
    const keyboardHelper = new KeyboardHelper();
    const ship = new Ship(p, p5);
    const action = new Action(lives, score, ship);
    const createCanvas = new CanvasCreate();
    p.setup = () => {
        for (let i = 0; i < 10; i++) {
            asteroids.push(new Asteroids(p5));
            createCanvas.canvasSetup(ship,asteroids);
        }
    };
    p.draw = () => {
        p.background(0);
        AsteroidField.asteroidMovement(asteroids);
        let k = asteroids.length;
        asteroids = AsteroidField.laserMovement(asteroids, lasers, score);
        if (k - asteroids.length !== 0) score++;
        let hits = AsteroidField.shipMovement(ship, asteroids, keyboardHelper, button, action);
        action.livesRender(hits, asteroids);
        action.scoreRender(score);
    };
    p.keyPressed = () => {
        button[p.keyCode] = 1;
        if (p.keyCode === 32) {
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