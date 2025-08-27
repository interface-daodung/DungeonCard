import Item from '../../modules/Item.js';

/**
 * Class HealingPotion - Item hồi phục HP
 */
export default class HealingPotion extends Item {
    constructor() {
        super(
            'Healing Potion',
            'healing-potion',
            'healing-potion',
            50,     // Power cơ bản (HP hồi phục)
            0,      // Cooldown cơ bản
            'Hồi phục 50 HP',
            5       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power * (1 + this.level * 0.15); // Tăng 15% mỗi level
    }
}
