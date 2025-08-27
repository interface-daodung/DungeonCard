import Item from '../../modules/Item.js';

/**
 * Class Seasoning - Item gia vị để tăng hiệu quả item
 */
export default class Seasoning extends Item {
    constructor() {
        super(
            'Seasoning',
            'seasoning',
            'seasoning',
            0,      // Power cơ bản
            0,      // Cooldown cơ bản
            'Gia vị để tăng hiệu quả item',
            6       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 15); // Tăng 15 mỗi level
    }
}
