import Item from '../../modules/Item.js';

/**
 * Class BlackHole - Item tạo hố đen hút tất cả enemy
 */
export default class BlackHole extends Item {
    constructor() {
        super(
            'Black Hole',
            'black-hole',
            'black-hole',
            0,      // Power cơ bản
            2,      // Cooldown cơ bản
            'Tạo hố đen hút tất cả enemy',
            8       // Max level cao hơn vì item mạnh
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power * (1 + this.level * 0.3); // Tăng 30% mỗi level
    }

    /**
     * Ghi đè phương thức get cooldown để có logic riêng
     */
    get cooldown() {
        return Math.max(1, this._cooldown - this.level * 0.8); // Giảm 0.8 mỗi level, tối thiểu 1
    }

    /**
     * Ghi đè phương thức get effect để có logic riêng
     */
    effect(gameManager) {
        gameManager.animationManager.startItemAnimation(this.image, () => {
            console.log(`Sử dụng item: ${this.nameId}`);
        });
        gameManager.animationManager.startShuffleAllCardsAnimation(() => {
            console.log('BlackHole: Shuffle all cards');
        });
        return true;
    }
}   
