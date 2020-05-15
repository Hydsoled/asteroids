import s from "../index";

export default class Ship {
    constructor(s, p5) {
        this.heading = s.PI / 2;
        this.rotation = 0;
        this.p5 = p5;
        this.r = 20;
        this.vel = s.createVector(0, 0);
        this.pos = s.createVector(s.windowWidth / 2, s.windowHeight / 2);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.mult(0.95);
    }

    boost() {
        let force = this.p5.Vector.fromAngle(this.heading);
        this.vel.add(force);
    }

    render() {
        s.push();
        let r = this.r;
        s.translate(this.pos.x, this.pos.y);
        s.fill(0);
        s.rotate(this.heading + s.PI / 2);
        s.stroke(255);
        s.triangle(-r, r, r, r, 0, -r);
        s.pop();
    }

    turn() {
        this.heading += this.rotation;
    }

    setRotation(angle) {
        this.rotation = angle;
    }
    hits(asteroid){
        let d = s.dist(this.pos.x, this.pos.y , asteroid.pos.x, asteroid.pos.y);
        return d < this.r + asteroid.r;
    }
}