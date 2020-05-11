import Movement from "./movement";

export default class AsteroidField {
    constructor() {
    }
    static asteroidMovement(asteroids){
        for (let i = 0; i < asteroids.length; i++){
            asteroids[i].render();
            asteroids[i].update();
            Movement.edge(asteroids[i],asteroids[i].pos,asteroids[i].r);
        }
    }

    static laserMovement(asteroids, lasers){
        for (let i = lasers.length-1; i >=0 ; i--){
            lasers[i].render();
            lasers[i].update();
            if (Movement.edge(lasers[i],lasers[i].pos)){
                lasers.splice(i,1);
                continue;
            }
            for (let j = asteroids.length-1; j >= 0; j--){
                if (lasers[i].hits(asteroids[j])){
                    let newAsteroids = asteroids[j].breakUp(asteroids[j].r);
                    if (newAsteroids[0]){
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j,1);
                    lasers.splice(i,1);
                    break;
                }
            }
        }
        return asteroids;
    }
    static shipMovement(ship, asteroids, keyboardHelper, button, points){
        for (let i = asteroids.length -1 ; i>=0; i--){
            if (ship.hits(asteroids[i])){
                return true;
            }
        }
        if (points.lives === 0) return false;
        ship.render();
        ship.turn();
        keyboardHelper.keyPress(button,ship);
        ship.update();
        Movement.edge(ship,ship.pos,ship.r);
        return false;
    }
}