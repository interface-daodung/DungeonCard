import Item from '../../modules/Item.js';

/**
 * Class Cooldown - Item giảm cooldown của skill
 */
export default class Cooldown extends Item {
    constructor() {
        super(
            'Cooldown',
            'cooldown',
            'cooldown',
            8,      // Power cơ bản
            3,      // Cooldown cơ bản
            'Giảm cooldown của skill',
            7       // Max level cao vì item hỗ trợ
        );
    }

    /**
     * Ghi đè phương thức get power để có logic riêng
     */
    get power() {
        return this._power + (this.level * 5); // Tăng 5 mỗi level
    }

    effect(gameManager) {
        let itemCount = 0;
        gameManager.itemEquipment.forEach(item => {
            console.log(item.item.nameId);
            if (item.cooldown() > 0 && item.item.nameId !== this.nameId) {
                console.log(item.cooldown(), 'item.cooldown giam cooldown',item.item.name);
                item.cooldowninning(this.power);
            } else {
                itemCount++;
            }

        });
        if(itemCount === 3){
            return false;
        }
        gameManager.animationManager.startItemAnimation(this.image, () => {
            console.log(`Sử dụng item: ${this.nameId}`);
        });
        return true;
    }

}
