import Item from '../../modules/Item.js';

/**
 * Class Toxic - Item gây độc damage mỗi turn
 */
export default class Toxic extends Item {
    constructor() {
        super(
            'Toxic',
            'toxic',
            'toxic',
            30,     // Power cơ bản
            2,      // Cooldown cơ bản
            'Gây độc 30 damage mỗi turn trong 2 turn',
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
        return Math.max(1, this._cooldown - this.level * 0.2); // Giảm 0.2 mỗi level, tối thiểu 1
    }
}
