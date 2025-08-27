import Item from '../../modules/Item.js';

/**
 * Class TaxWaiver - Item miễn thuế cho item
 */
export default class TaxWaiver extends Item {
    constructor() {
        super(
            'Tax Waiver',
            'tax-waiver',
            'tax-waiver',
            0,      // Power cơ bản
            0,      // Cooldown cơ bản
            'Miễn thuế cho item',
            5       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 25); // Tăng 25 mỗi level
    }
}
