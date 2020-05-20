import p5 from "p5";
import mc from "./helper_methods/addMobileControls";
import Ship from "./objects/ship";
import KeyboardHelper from "./helper_methods/keyboardHelper";
import Laser from "./objects/laser";
import ObjectMovement from "./helper_methods/objectMovement";
import Action from "./helper_methods/action";
import CanvasCreate from "./helper_methods/canvasCreate";
import AsteroidSpawn from "./helper_methods/asteroidSpawn";
let assets = require('./objects/assets');

const sketch = (p) => {
    let lasers = [];
    let asteroids = [];
    let button = [];
    let allAssets = {};
    let score = 0;
    let lives = 3;
    let img = 0;
    const keyboardHelper = new KeyboardHelper();
    let ship = new Ship(p, p5);
    const action = new Action(lives, score, ship);
    const createCanvas = new CanvasCreate();
    const asteroidSpawn = new AsteroidSpawn();
    p.setup = () => {
        createCanvas.canvasSetup(ship,asteroids,action);
        mc(ship,lasers, p5, action);
        let spnTimeSec = 4000;
        let spnTime = setInterval(()=>{
            asteroidSpawn.spawn(asteroids,p5,ship);
        },spnTimeSec);
        let timer = setInterval(()=> {
            if (spnTimeSec>2000) {
                spnTimeSec-=1000;
                if (assets.background[img+1]){
                    img++;
                }
            }
            else if (spnTimeSec>1000) spnTimeSec-=200;
            clearInterval(spnTime);
            spnTime = setInterval(()=>{
                asteroidSpawn.spawn(asteroids,p5,ship);
            },spnTimeSec);
        },10000);
    };
    p.draw = () => {
        p.background(allAssets.background[img]);
        ObjectMovement.asteroidMovement(asteroids);
        asteroids = ObjectMovement.laserMovement(asteroids, lasers, ship, action);
        ObjectMovement.shipMovement(ship, asteroids, keyboardHelper, button, action);
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
    p.preload = () => {
        allAssets.background = [];
        for (let i = 0; i < assets.background.length; i++){
            allAssets.background.push(s.loadImage(assets.background[i]));
        }
    }
};
const s = new p5(sketch);
export default s;