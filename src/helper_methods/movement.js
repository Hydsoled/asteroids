import s from "../index";

export default class Movement {
    static edge(obj, pos, r) {
        if (r) {
            if (pos.x > s.width + r) {
                pos.x = -r;
            } else if (pos.x < -r) {
                pos.x = s.width + r;
            } else if (pos.y > s.height + r) {
                pos.y = -r;
            } else if (pos.y < -r) {
                pos.y = s.height + r;
            }
        } else if (pos.x > s.width || pos.x < 0 || pos.y > s.height || pos.y < 0) {
            return true;
        }
        return false;
    }
}