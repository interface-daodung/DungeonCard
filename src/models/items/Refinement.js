import Item from '../../modules/Item.js';

/**
 * Class Refinement - Item tinh chế để tăng sức mạnh
 */
export default class Refinement extends Item {
    constructor() {
        super(
            'Refinement',
            'refinement',
            'refinement',
            10,      // Power cơ bản
            2,      // Cooldown cơ bản
            'Tinh chế item để tăng sức mạnh',
            6       // Max level
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 10); // Tăng 10 mỗi level
    }

    effect(gameManager) {
        let weapon = 0;
        gameManager.cardManager.getAllCards().forEach(card => {
            if (card.type === 'weapon') {
                weapon++;
            }
        });
        if (weapon === 0) {
            return false;
        }
        gameManager.animationManager.startItemAnimation(this.image, () => {
            console.log(`Sử dụng item: ${this.nameId}`);
            gameManager.cardManager.getAllCards().forEach(card => {
                if (card.type === 'weapon') {
                    card.refinement(this.power);
                }
            });
        });
        return true;
    }
}
