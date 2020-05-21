import Movement from "./movement";

export default class ObjectMovement {
    constructor() {
    }

    static asteroidMovement(asteroids, asset) {
        for (let i = 0; i < asteroids.length; i++) {
            asteroids[i].render(asset);
            asteroids[i].update();
            Movement.edge(asteroids[i], asteroids[i].pos, asteroids[i].r);
        }
    }

    //renders lasers and checks if asteroids is trigger by laser
    static laserMovement(asteroids, lasers, ship, action) {
        for (let i = lasers.length - 1; i >= 0; i--) {
            lasers[i].render();
            lasers[i].update();
            if (Movement.edge(lasers[i], lasers[i].pos)) {
                lasers.splice(i, 1);
                continue;
            }
            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    action.score++;
                    let newAsteroids = asteroids[j].breakUp(asteroids[j].r, ship);
                    if (newAsteroids[0]) {
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    break;
                }
            }
        }
        return asteroids;
    }

    //renders ship and checks if asteroids is trigger by ship
    static shipMovement(ship, asteroids, keyboardHelper, button, action, asset) {
        if (action.lives === 0) return false;
        for (let i = asteroids.length - 1; i >= 0; i--) {
            //blink effect start
            if (ship.hits(asteroids[i]) && !action.blockHit) {
                action.blockHit = true;
                let interaval = setInterval(()=>{
                    action.shipAppear = !action.shipAppear;
                },100);
                setTimeout(()=>{
                   action.blockHit = false;
                   action.shipAppear = true;
                   clearInterval(interaval);
                },3000);
                action.hits = true;
            }
            //blink effect end
        }
        if (action.shipAppear){
            ship.render(asset);
        }
        ship.turn();
        keyboardHelper.keyPress(button, ship);
        ship.update();
        Movement.edge(ship, ship.pos, ship.r);
    }
}