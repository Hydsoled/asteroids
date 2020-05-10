import p5 from "p5";
import Ship from "./objects/ship";
import KeyboardHelper from "./helper_methods/keyboardHelper";
import Asteroids from "./objects/asteroids";
import Movement from "./helper_methods/movement";
import Laser from "./objects/laser";

const sketch = (p) => {
    var lasers = [];
    var keyboardHelper = new KeyboardHelper(lasers,p5);
    var ship = new Ship(p,p5);
    var asteroids = [];
    let button = [];
    p.setup = () => {
        p.createCanvas(p.windowWidth-5, p.windowHeight-5);
        for (var i = 0; i < 10; i++){
            asteroids.push(new Asteroids(p5));
        }
    };

    p.draw = () => {
        p.background(0);
        ship.render();
        ship.turn();
        keyboardHelper.keyPress(button,ship);
        ship.update();
        Movement.edge(ship,ship.pos,ship.r);
        for (var i = 0; i < asteroids.length; i++){
            asteroids[i].render();
            asteroids[i].update();
            Movement.edge(asteroids[i],asteroids[i].pos,asteroids[i].r);
        }
        for (var i = 0; i < lasers.length; i++){
            lasers[i].render();
            lasers[i].update();
        }
    };
    p.keyPressed = () => {
        button[p.keyCode] = 1;
        if (p.keyCode === 32){
            console.log('sada');
            lasers.push(new Laser(ship.pos, ship.heading, p5));
        }
    }
    p.keyReleased = () => {
        button[p.keyCode] = 0;
        ship.setRotation(0);
    }
};
let s = new p5(sketch);
export default s;