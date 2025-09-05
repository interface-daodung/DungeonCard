import Item from '../../modules/Item.js';

/**
 * Class Corruption - Item gây corruption damage
 */
export default class Corruption extends Item {
    constructor() {
        super(
            'Corruption',
            'corruption',
            'corruption',
            8,     // Power cơ bản
            3,      // Cooldown cơ bản
            'Gây corruption 80 damage',
            6       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power * (1 + this.level * 0.25); // Tăng 25% mỗi level
    }

    /**
     * Ghi đè phương thức get cooldown để có logic riêng
     */
    get cooldown() {
        return Math.max(1, this._cooldown - this.level * 0.5); // Giảm 0.5 mỗi level, tối thiểu 1
    }
}
