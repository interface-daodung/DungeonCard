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
            10,      // Power cơ bản
            1,      // Cooldown cơ bản
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

    /**
    * Ghi đè phương thức effect để có logic riêng
    */
    effect(gameManager) {
        // Kiểm tra nhân vật có vũ khí và vũ khí có thể sửa chữa được
        const { weapon } = gameManager.cardManager.CardCharacter;
        if (weapon && weapon.durability > 0) {
            gameManager.animationManager.startItemAnimation(this.image, () => {
                // maxDurability vô hạn hoặc không có, chỉ cần tăng durability
                gameManager.cardManager.CardCharacter.repair(this.power);
            });
            return true;
        }
        return false;
    }
}
