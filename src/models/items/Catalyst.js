import Item from '../../modules/Item.js';

/**
 * Class Catalyst - Item tăng sức mạnh phép thuật
 */
export default class Catalyst extends Item {
    constructor() {
        super(
            'Catalyst',
            'catalyst',
            'catalyst',
            25,     // Power cơ bản
            0,      // Cooldown cơ bản
            'Tăng sức mạnh phép thuật',
            6       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power * (1 + this.level * 0.25); // Tăng 25% mỗi level
    }
}
