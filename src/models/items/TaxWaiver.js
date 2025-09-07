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
            10,      // Power cơ bản
            0,      // Cooldown cơ bản
            'Miễn thuế cho item',
            5       // Max level
        );
        this.active = false;
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 25); // Tăng 25 mỗi level
    }

    effect(gameManager) {
        if (this.active) {
            return false;
        }
        this.active = true;
        this.gameManager = gameManager;
        gameManager.animationManager.startItemAnimation(this.image, () => {
            console.log(`Sử dụng item: ${this.nameId}`);
            gameManager.emitter
                .on('gameOver', this.TaxWaiverEffect.bind(this), 10)
        });
        return true;
    }

    TaxWaiverEffect() {
        // Tính coin dựa trên power% và làm tròn lên
        const coinBonus = Math.ceil(this.gameManager.coin * (this.power / 100));
        this.gameManager.addCoin(coinBonus);
    }
}
