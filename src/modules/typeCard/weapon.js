import Card from '../Card.js';

export default class Weapon extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'weapon');
 
    }
    addDisplayHUD() {
        this.durabilityDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.durability
        }, 'rightBottom');
    }
    /**
     * Hiệu ứng khi card được kích hoạt
     */
    CardEffect() {
        console.log(this.name + ' đang chạy hiệu ứng...');
        // Logic khi card được kích hoạt (nếu có)
        this.scene.gameManager.cardManager.CardCharacter.setWeapon({
            default: this.constructor.DEFAULT,
            durability: this.durability
        });
        return false;
    }
}

