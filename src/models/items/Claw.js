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
            5,     // Power cơ bản
            2,      // Cooldown cơ bản
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


    effect(gameManager) {
        let enemy = 0;
        gameManager.cardManager.getAllCards().forEach(card => {
            if (card.type === 'enemy') {
                enemy++;
            }
        });
        if (enemy === 0) {
            return false;
        }
        gameManager.animationManager.startItemAnimation(this.image, () => {
            console.log(`Sử dụng item: ${this.nameId}`);
            gameManager.cardManager.getAllCards().forEach(card => {
                if (card.type === 'enemy') {
                    card.takeDamage(this.power);
                }
            });
        });
        return true;
    }
}
