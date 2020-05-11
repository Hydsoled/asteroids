import s from "../index";
export default class Laser {
    constructor(ship, heading, p5) {
        this.pos = s.createVector(ship.x,ship.y);
        this.vel = p5.Vector.fromAngle(heading);
        this.vel.mult(10);
    }
    update(){
        this.pos.add(this.vel);
    }
    render(){
        s.push();
        s.stroke(255);
        s.strokeWeight(4);
        s.point(this.pos.x,this.pos.y);
        s.pop();
    }
    hits(asteroid){
        let d = s.dist(this.pos.x, this.pos.y,asteroid.pos.x, asteroid.pos.y);
        return d < asteroid.r;
    }
}