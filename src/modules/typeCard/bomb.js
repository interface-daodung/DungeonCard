import Card from '../Card.js';

export default class Bomb extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'bomb');
    }

    /**
     * Thêm display HUD cho bomb
     */
    addDisplayHUD() {
        this.countdownDisplay = this.createDisplay({
            fillColor: 0xc57826,
            text: this.countdown.toString()
        }, 'rightTop');
        this.bombDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.damage.toString()
        }, 'rightBottom');
    }

    /**
     * Hiệu ứng khi card được kích hoạt
     */
    CardEffect() {
        this.scene.gameManager.animationManager.startSwapCardsAnimation(this.index,
            this.scene.gameManager.cardManager.getCharacterIndex(), () => {
                console.log('CardEffect: Bomb card effect');
            });
        return true;
    }
}

