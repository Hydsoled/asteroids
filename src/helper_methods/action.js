import s from "../index";

export default class Action {
    constructor(lives,score,ship) {
        this.lives = lives;
        this.ship = ship;
    }
    livesRender(hits,asteroids){
        if (hits){
            this.ship.pos = s.createVector(s.random(s.width), s.random(s.height));
            for (let i = 0; i<asteroids.length; i++){
                if (this.ship.hits(asteroids[i])){
                    this.ship.pos = s.createVector(s.random(s.width), s.random(s.height));
                    i=-1;
                }
            }
            this.lives--;
        }
        s.push();
        s.fill(255);
        s.textSize(s.width*0.03);
        s.text("live: " + this.lives, s.width*0.03, s.height*0.12);
        s.pop();
    }
    scoreRender(score){
        s.push();
        s.fill(255);
        s.textSize(s.width*0.03);
        s.text("score: " + score, s.width*0.03, s.height*0.17);
        s.pop();
    }
}