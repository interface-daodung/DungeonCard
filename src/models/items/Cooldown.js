import Item from '../../modules/Item.js';

/**
 * Class Cooldown - Item giảm cooldown của skill
 */
export default class Cooldown extends Item {
    constructor() {
        super(
            'Cooldown',
            'cooldown',
            'cooldown',
            0,      // Power cơ bản
            0,      // Cooldown cơ bản
            'Giảm cooldown của skill',
            7       // Max level cao vì item hỗ trợ
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 5); // Tăng 5 mỗi level
    }
}
