import Item from '../../modules/Item.js';

/**
 * Class Sword - Vũ khí mạnh với damage cao
 */
export default class Sword extends Item {
    constructor() {
        super(
            'Sword',
            'sword',
            'sword',
            10,     // Power cơ bản
            1,      // Cooldown cơ bản
            'Vũ khí mạnh với 60 damage',
            5       // Max level
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
        return Math.max(0, this._cooldown - this.level * 0.3); // Giảm 0.3 mỗi level
    }

    /**
  * Ghi đè phương thức get effect để có logic riêng
  */
    effect(gameManager) {
        gameManager.cardManager.CardCharacter.setWeapon({
            default: gameManager.cardManager.cardFactory.weaponClasses[
                Math.floor(Math.random() *
                    gameManager.cardManager.cardFactory.weaponClasses.length)].DEFAULT,
            durability: this.power
        });
        return true;

    }
}
