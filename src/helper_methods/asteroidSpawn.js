import Asteroids from "../objects/asteroids";
export default class AsteroidSpawn {
    spawn(asteroids,p,ship){
        asteroids.push(new Asteroids(p,undefined,undefined,ship));
    }
}
