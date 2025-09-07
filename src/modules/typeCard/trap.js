import Card from '../Card.js';

export default class Trap extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'trap');

    }

    /**
     * Thêm hiển thị UI cho card
     */
    addDisplayHUD() {
        this.damageDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.damage.toString()
        }, 'rightBottom');
    }
}

