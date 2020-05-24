import p5 from "p5";
import mc from "./helper_methods/addMobileControls";
import CanvasCreate from "./helper_methods/canvasCreate";
import Ship from "./objects/ship";
import Action from "./objects/action";
import AsteroidSpawn from "./objects/asteroidSpawn";
import LaserSpawn from "./objects/laserSpawn";

const assets = require("./objects/assets");

const sketch = (p) => {
  let lasers = [];
  let allAssets = {};
  let lives = 3;
  let img = 0;

  const ship = new Ship({ p, p5, allAssets });
  const action = new Action({ lives, ship });
  const createCanvas = new CanvasCreate();
  const asteroidSpawn = new AsteroidSpawn({ p5, ship, allAssets });
  const laserSpawn = new LaserSpawn({ p5, ship, allAssets });

  p.preload = () => {
    allAssets.background = [];
    allAssets.asteroid = [];
    allAssets.ship = [];

    assets.background.forEach((img) => {
      allAssets.background.push(s.loadImage(img));
    });

    assets.asteroid.forEach((img) => {
      allAssets.asteroid.push(s.loadImage(img));
    });

    allAssets.ship.push(s.loadImage(assets.ship[0]));
  };

  p.setup = () => {
    if (window.innerWidth < 450 && window.innerWidth !== s.width) {
      s.createCanvas(window.innerWidth - 5, (window.innerWidth - 5) * 1.5);
      ship.r /= 1.4;
    } else s.createCanvas(450, 600);

    mc(ship, lasers, p5, action);

    p.resetGame();
  };

  p.draw = () => {
    console.log(img);
    p.background(allAssets.background[img]);

    laserSpawn.update(asteroidSpawn, ship, action);
    laserSpawn.render();

    asteroidSpawn.checkHit(action, ship);
    asteroidSpawn.render();

    ship.update(action);
    ship.render(action);

    action.livesRender();
    action.scoreRender();
  };

  p.keyPressed = () => {
    if (p.keyCode === 32 && action.lives > 0) {
      laserSpawn.shoot(ship);
    }
    if (p.keyCode === 32 && action.lives === 0) {
      p.resetGame();
    }
  };

  p.windowResized = () => {
    createCanvas.canvasRes(ship, asteroidSpawn.asteroids);
  };

  p.resetGame = () => {
    img = 0;
    ship.reset();
    action.reset(asteroidSpawn, allAssets, img);
  };
};

const s = new p5(sketch);
export default s;
