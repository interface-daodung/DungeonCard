// Venti.js - Thẻ nhân vật Venti
// Chức năng: Nhân vật người chơi điều khiển

import Card from '../../../modules/Card.js';

export default class Venti extends Card {

    static DEFAULT = {
        id: 'venti',
        name: 'Venti',
        description: 'Venti – nhà thơ du ca tự do, chính là Phong Thần Mondstadt. Dáng vẻ nghịch ngợm và phóng khoáng, nhưng bên trong là vị thần nhân từ luôn dùng âm nhạc để xoa dịu lòng người.',
        hp: 8,
        element: 'anemo'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Venti.DEFAULT.name, Venti.DEFAULT.id, "character");

        this.level = this.getLevel();
        this.hp = this.getMaxHP(); // HP ban đầu  
        this.element = Venti.DEFAULT.element; // Element 
        this.description = Venti.DEFAULT.description; // Mô tả
        this.weapon = null; // vũ khí

        this.createCard();
        scene.add.existing(this);
    }
}
