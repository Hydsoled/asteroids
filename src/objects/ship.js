import s from "../index";
export default class Ship {
    constructor(s,p5) {
        this.heading = s.PI / 2;
        this.rotation = 0;
        this.p5 = p5;
        this.vel = s.createVector(0,0);
        this.pos = s.createVector(s.windowWidth / 2, s.windowHeight / 2,);
    }
    update(){
        this.pos.add(this.vel);
        this.vel.mult(0.96);
    }
    boost(){
        var force = this.p5.Vector.fromAngle(this.heading);
        this.vel.add(force);
    }
    render(){
        let r = 20;
        s.translate(this.pos.x, this.pos.y);
        s.noFill();
        s.rotate(this.heading + s.PI/2);
        s.stroke(255);
        s.triangle(-r, r, r, r, 0, -r);
    }
    turn() {
        this.heading += this.rotation;
    }
    setRotation(angle){
        this.rotation = angle;
    }
}