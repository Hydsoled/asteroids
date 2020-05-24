import p5 from "p5";
import mc from "./helper_methods/addMobileControls";
import Ship from "./objects/ship";
import KeyboardHelper from "./helper_methods/keyboardHelper";
import Laser from "./objects/laser";
import ObjectMovement from "./helper_methods/objectMovement";
import Action from "./helper_methods/action";
import CanvasCreate from "./helper_methods/canvasCreate";
import AsteroidSpawn from "./helper_methods/asteroidSpawn";
import canvasCreate from "./helper_methods/canvasCreate";
let assets = require("./objects/assets");

const sketch = (p) => {
  let lasers = [];
  let asteroids = [];
  let button = [];
  let allAssets = {};
  let score = 0;
  let lives = 3;
  let img = 0;
  let timer;
  let spnTime;
  let spnTimeSec;

  const keyboardHelper = new KeyboardHelper();
  let ship = new Ship(p, p5, allAssets);
  const action = new Action(lives, score, ship);
  const createCanvas = new CanvasCreate();
  const asteroidSpawn = new AsteroidSpawn({ p5, ship });

  p.setup = () => {
    if (window.innerWidth < 450 && window.innerWidth !== s.width) {
      s.createCanvas(window.innerWidth - 5, (window.innerWidth - 5) * 1.5);
      ship.r /= 1.4;
    } else {
      s.createCanvas(450, 600);
    }
    p.resetFunction();
    mc(ship, lasers, p5, action);
  };

  p.draw = () => {
    p.background(allAssets.background[img]);

    ObjectMovement.asteroidMovement(
      asteroidSpawn.asteroids,
      allAssets.asteroid[0]
    );

    ObjectMovement.laserMovement(asteroidSpawn, lasers, ship, action);

    asteroidSpawn.checkHit(ship);

    ObjectMovement.shipMovement(
      ship,
      asteroids,
      keyboardHelper,
      button,
      action
    );

    ship.render();

    action.livesRender();
    action.scoreRender();
  };

  p.keyPressed = () => {
    button[p.keyCode] = 1;

    if (p.keyCode === 32 && action.lives > 0) {
      lasers.push(new Laser(ship.pos, ship.heading, p5));
    }

    if (p.keyCode === 32 && action.lives === 0) {
      p.resetFunction();
    }
  };

  p.keyReleased = () => {
    button[p.keyCode] = 0;
    ship.setRotation(0);
  };

  p.windowResized = () => {
    createCanvas.canvasRes(ship, asteroids);
  };

  p.preload = () => {
    allAssets.background = [];
    allAssets.asteroid = [];
    allAssets.ship = [];
    for (let i = 0; i < assets.background.length; i++) {
      allAssets.background.push(s.loadImage(assets.background[i]));
    }
    for (let i = 0; i < assets.asteroid.length; i++) {
      allAssets.asteroid.push(s.loadImage(assets.asteroid[i]));
    }
    allAssets.ship.push(s.loadImage(assets.ship[0]));
  };

  p.resetFunction = () => {
    action.lives = 3;
    action.score = 0;
    asteroids = [];
    img = 0;

    let interaval = setInterval(() => {
      action.shipAppear = !action.shipAppear;
    }, 100);

    ship.reset();

    setTimeout(() => {
      action.shipAppear = true;
      clearInterval(interaval);
    }, 3000);

    ship.pos = s.createVector(s.width / 2, s.height / 2);

    spnTimeSec = 4000;

    clearInterval(spnTime);

    clearInterval(timer);

    spnTime = setInterval(() => {
      asteroidSpawn.spawn();
    }, spnTimeSec);

    timer = setInterval(() => {
      if (spnTimeSec > 2000) {
        spnTimeSec -= 1000;
        if (assets.background[img + 1]) {
          img++;
        }
      } else if (spnTimeSec > 1000) spnTimeSec -= 200;
      clearInterval(spnTime);
      spnTime = setInterval(() => {
        asteroidSpawn.spawn();
      }, spnTimeSec);
    }, 10000);
  };
};

const s = new p5(sketch);
export default s;
