import s from "../index";
export default class Ship {
    constructor(pi) {
        this.heading = pi / 2;
    }
    render(){
        let pos = s.createVector(s.width / 2, s.height / 2,);
        let r = 20;
        s.translate(pos.x, pos.y);
        s.noFill();
        s.rotate(this.heading);
        s.stroke(255);
        s.triangle(-r, r, r, r, 0, -r);
    }
    // turn(angle){
    //     this.heading += angle;
    // }
}