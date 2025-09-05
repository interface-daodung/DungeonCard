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
            2,     // Power cơ bản (HP hồi phục)
            18,      // Cooldown cơ bản
            'Hồi phục 2 HP',
            10       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power * (1 + this.level * 0.15); // Tăng 15% mỗi level
    }
    /**
     * Ghi đè phương thức effect để có logic riêng
     */
    effect(gameManager) {
        if(gameManager.cardManager.CardCharacter.hp >= gameManager.cardManager.CardCharacter.getMaxHP()) {
            return false;
        }
        gameManager.animationManager.startItemAnimation(this.image, () => {
            console.log(`Sử dụng item: ${this.nameId}`);
            gameManager.cardManager.CardCharacter.heal(this.power);
        });
        return true;
    }
}
