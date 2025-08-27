// Nahida.js - Thẻ nhân vật Nahida
// Chức năng: Nhân vật người chơi điều khiển

import Card from '../../../modules/Card.js';

export default class Nahida extends Card {

    static DEFAULT = {
        id: 'nahida',
        name: 'Nahida',
        description: 'Nahida – Tiểu Vương Kusanali, vị Thảo Thần bé nhỏ của Sumeru. Với trái tim thuần khiết và trí tuệ hiền hòa, nàng mang khát vọng dẫn dắt nhân loại đến sự khai sáng và tự do.',
        hp: 9,
        element: 'dendro'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Nahida.DEFAULT.name, Nahida.DEFAULT.id, "character");

        this.level = this.getLevel();
        this.hp = this.getMaxHP(); // HP ban đầu  
        this.element = Nahida.DEFAULT.element; // Element 
        this.description = Nahida.DEFAULT.description; // Mô tả
        this.weapon = null; // vũ khí

        this.createCard();
        scene.add.existing(this);
    }

}
