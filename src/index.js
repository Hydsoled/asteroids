import p5 from "p5";
import Ship from "./objects/ship";
import KeyboardHelper from "./helper_methods/keyboardHelper";
import Asteroids from "./objects/asteroids";
import Laser from "./objects/laser";
import AsteroidField from "./helper_methods/asteroidField";
import Action from "./helper_methods/action";

const sketch = (p) => {
    let lasers = [];
    let asteroids = [];
    let button = [];
    let score = 0;
    let lives = 3;
    const keyboardHelper = new KeyboardHelper();
    const ship = new Ship(p,p5);
    const action = new Action(lives,score,ship);
    p.setup = () => {
        p.createCanvas(p.windowWidth-5, p.windowHeight-5);
        for (let i = 0; i < 10; i++){
            asteroids.push(new Asteroids(p5));
        }
    };

    p.draw = () => {
        p.background(0);
        AsteroidField.asteroidMovement(asteroids);
        let k = asteroids.length;
        asteroids = AsteroidField.laserMovement(asteroids,lasers,score);
        if (k-asteroids.length!==0) score++;
        let hits = AsteroidField.shipMovement(ship, asteroids, keyboardHelper, button, action);
        action.livesRender(hits,asteroids);
        action.scoreRender(score);
    };
    p.keyPressed = () => {
        button[p.keyCode] = 1;
        if (p.keyCode === 32){
            lasers.push(new Laser(ship.pos, ship.heading, p5));
        }
    }
    p.keyReleased = () => {
        button[p.keyCode] = 0;
        ship.setRotation(0);
    }
};
const s = new p5(sketch);
export default s;