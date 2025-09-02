import Card from '../Card.js';
import { SpritesheetWrapper } from '../../utils/SpritesheetWrapper.js';

export default class Enemy extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'enemy');

    }

    /**
    * Thêm hiển thị UI cho card
    */
    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.hpDisplay = this.createDisplay({
            fillColor: 0xFF0000,
            text: this.health.toString()
        }, 'rightTop');
    }
    /**
     * Nhận damage từ người chơi
     * @param {number} damage - Lượng damage nhận vào
     */
    takeDamage(damage, type) {
        super.takeDamage(damage,type);
        this.health -= damage;
        this.hpDisplay.updateText(this.health.toString());
        if (type === 'slash') {
            SpritesheetWrapper.animationSlash(this.scene, this.x, this.y);
            this.scene.sound.play('sword-sound');
        }
        if (this.health <= 0) {
            this.die();
        }
        return damage;
    }
    /**
     * Hiệu ứng khi card được kích hoạt
     */
    CardEffect() {
        console.log(this.name + ' đang chạy hiệu ứng...');
        console.log('this.scene.gameManager.cardManager.CardCharacter.weapon---------', this.scene.gameManager.cardManager.CardCharacter.weapon);
        if (this.scene.gameManager.cardManager.CardCharacter.weapon?.durability > 0) {
            const actualDamage = Math.min(this.scene.gameManager.cardManager.CardCharacter.weapon.durability, this.health);
            this.scene.gameManager.cardManager.CardCharacter.reduceDurability(actualDamage);
            this.takeDamage(actualDamage, 'slash');
            return true;
        }
        // Logic khi card được kích hoạt (nếu có)
        this.scene.gameManager.addCoin(this.score);
        if (this.scene.gameManager.cardManager.CardCharacter.takeDamage(this.health) === 0) {
            return true;
        }
        return false;
    }
}

