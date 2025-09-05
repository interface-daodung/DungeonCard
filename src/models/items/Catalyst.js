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
            10,     // Power cơ bản
            10,      // Cooldown cơ bản
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
