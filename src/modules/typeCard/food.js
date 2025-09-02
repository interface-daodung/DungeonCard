import Card from '../Card.js';

export default class Food extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'food');

        
    }

    /**
     * Thêm hiển thị UI cho card
     */
    addDisplayHUD() {
        this.foodDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.food.toString()
        }, 'rightBottom');
    }
}

