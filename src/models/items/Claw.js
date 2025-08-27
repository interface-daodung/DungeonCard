import Item from '../../modules/Item.js';

/**
 * Class Claw - Item tấn công với damage
 */
export default class Claw extends Item {
    constructor() {
        super(
            'Claw',
            'claw',
            'claw',
            40,     // Power cơ bản
            1,      // Cooldown cơ bản
            'Tấn công với 40 damage',
            5       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power * (1 + this.level * 0.2); // Tăng 20% mỗi level
    }

    /**
     * Ghi đè phương thức get cooldown để có logic riêng
     */
    get cooldown() {
        return Math.max(0, this._cooldown - this.level * 0.2); // Giảm 0.2 mỗi level
    }
}
