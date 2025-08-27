import Item from '../../modules/Item.js';

/**
 * Class Repair - Item sửa chữa item bị hỏng
 */
export default class Repair extends Item {
    constructor() {
        super(
            'Repair',
            'repair',
            'repair',
            0,      // Power cơ bản
            0,      // Cooldown cơ bản
            'Sửa chữa item bị hỏng',
            5       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 20); // Tăng 20 mỗi level
    }
}
