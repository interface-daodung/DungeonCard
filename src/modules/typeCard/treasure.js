import Card from '../Card.js';

export default class Treasure extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'treasure');
  
    }

     // Logic cho treasure cards
     addDisplayHUD() {
        this.durabilityDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.durability.toString()
        }, 'rightBottom');
    }
}

