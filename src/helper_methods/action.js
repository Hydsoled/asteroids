import s from "../index";

export default class Action {
    constructor(lives, score, ship) {
        this.lives = lives;
        this.ship = ship;
        this.score = score;
        this.hits = false;
        this.blockHit = true;
        this.shipAppear = true;
    }

    livesRender() {
        if (this.hits) {
            this.ship.pos = s.createVector(s.random(s.width), s.random(s.height));
            this.lives--;
            this.hits = false;
        }
        s.push();
        s.fill(255);
        s.textSize(s.width * 0.03);
        s.text("live: " + this.lives, s.width * 0.03, s.height * 0.12);
        s.pop();
    }

    scoreRender() {
        s.push();
        s.fill(255);
        s.textSize(s.width * 0.03);
        s.text("score: " + this.score, s.width * 0.03, s.height * 0.17);
        s.pop();
    }
}