import s from "../index";

export default class Asteroids {
    constructor(p5, pos, r, ship) {
        const radiuses = [12.6, 25.2, 50.4];
        if (pos) {
            this.pos = pos.copy();
        } else {
            this.pos = s.createVector(s.random(s.width), s.random(s.height));
        }
        if (!r){
            this.r = radiuses[Math.floor(Math.random() * 3)];
        }else {
            let radiusIndex = radiuses.findIndex((element) => (element === r) || (element === r*1.4));
            if (radiusIndex===0){
                return undefined;
            }
            this.r = radiuses[radiusIndex - 1];
        }
        if (ship && ship.r !==20) this.r/=1.4;
        this.p5 = p5;
        this.vel = this.p5.Vector.random2D();
    }

    render() {
        s.push();
        s.noFill();
        s.stroke(255);
        s.translate(this.pos.x, this.pos.y);
        s.ellipse(0, 0, this.r * 2);
        s.pop();
    }

    update() {
        this.pos.add(this.vel);
    }

    breakUp(r, ship) {
        let newAsteroid = [];
        newAsteroid[0] = new Asteroids(this.p5, this.pos, r, ship);
        newAsteroid[1] = new Asteroids(this.p5, this.pos, r, ship);
        return newAsteroid;
    }
}