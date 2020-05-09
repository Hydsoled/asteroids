import s from "../index";

export default class KeyboardHelper {

    keyPress(button, ship) {
        if (s.keyIsPressed) {
            if (button[s.RIGHT_ARROW] === 1) {
                ship.setRotation(0.1);
            } else if (button[s.LEFT_ARROW] === 1) {
                ship.setRotation(-0.1);
            } else if (button[s.UP_ARROW] === 1) {
                ship.boost();
            }
        }
    }
}