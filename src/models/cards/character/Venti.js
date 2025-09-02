// Venti.js - Thẻ nhân vật Venti
// Chức năng: Nhân vật người chơi điều khiển

import Character from '../../../modules/typeCard/character.js';

export default class Venti extends Character {

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

    
        this.element = Venti.DEFAULT.element; // Element 
        this.description = Venti.DEFAULT.description; // Mô tả
       

        this.createCard();
        scene.add.existing(this);
    }
}
