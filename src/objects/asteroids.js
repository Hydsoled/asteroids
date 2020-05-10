import s from "../index";

export default class Asteroids {
    constructor(p5) {
        this.pos = s.createVector(s.random(s.width), s.random(s.height));
        this.r = 50;
        this.p5 = p5;
        this.vel = this.p5.Vector.random2D();
    }
    render(){
        s.push();
        s.noFill();
        s.stroke(255);
        s.translate(this.pos.x,this.pos.y);
        s.ellipse(0,0,this.r*2);
        s.pop();
    }
    update(){
        this.pos.add(this.vel);
    }
}