import s from "../index"
import Asteroids from "../objects/asteroids";
import p5 from "p5";

export default class CanvasCreate {
    canvasSetup(ship, asteroids,action) {
        let interaval = setInterval(()=>{
            action.shipAppear = !action.shipAppear;
        },100);
        setTimeout(()=>{
            action.blockHit = false;
            action.shipAppear = true;
            clearInterval(interaval);
        },3000);
        if (window.innerWidth < 450 && window.innerWidth !== s.width) {
            s.createCanvas(window.innerWidth - 5, (window.innerWidth - 5) * 1.5);
            ship.pos = s.createVector(s.width / 2, s.height / 2);
            for (let i = 0; i < 5; i++) {
                asteroids.push(new Asteroids(p5));
            }
            if (ship.r === 20) {
                ship.r /= 1.4;
                for (let i = asteroids.length; i >= 0; i--) {
                    if (asteroids[i]) {
                        asteroids[i].r /= 1.4;
                    }
                }
            }
        } else {
            s.createCanvas(450, 600);
            ship.pos = s.createVector(s.width / 2, s.height / 2);
            for (let i = 0; i < 5; i++) {
                asteroids.push(new Asteroids(p5));
            }
            if (ship.r !== 20) {
                ship.r *= 1.4;
                for (let i = asteroids.length; i >= 0; i--) {
                    if (asteroids[i]) {
                        asteroids[i].r *= 1.4;
                    }
                }
            }
        }
    }

    canvasRes(ship, asteroids) {
        if (window.innerWidth < 450 && window.innerWidth !== s.width) {
            if (ship.r === 20) {
                ship.r /= 1.4;
                for (let i = asteroids.length; i >= 0; i--) {
                    if (asteroids[i]) {
                        asteroids[i].r /= 1.4;
                    }
                }
            }
            s.resizeCanvas(window.innerWidth - 20, (window.innerWidth - 20) * 1.5);
        } else {
            if (ship.r !== 20) {
                ship.r *= 1.4;
                for (let i = asteroids.length; i >= 0; i--) {
                    if (asteroids[i]) {
                        asteroids[i].r *= 1.4;
                    }
                }
            }
            s.resizeCanvas(450, 600);
        }
    }
}