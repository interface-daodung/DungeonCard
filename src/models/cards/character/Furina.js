// Furina.js - Thẻ nhân vật Furina
// Chức năng: Nhân vật người chơi điều khiển

import Card from '../../../modules/Card.js';

export default class Furina extends Card {

    static DEFAULT = {
        id: 'furina',
        name: 'Furina',
        description: 'Furina – nữ thần của thủy quyền, đại diện cho sự cân bằng giữa lực lượng và tình cảm. Bên ngoài là vị thần đầy sức mạnh, nhưng bên trong là người phụ nữ đầy tình cảm và nhạy cảm.',
        hp: 12,
        element: 'hydro'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Furina.DEFAULT.name, Furina.DEFAULT.id, "character");

        this.level = this.getLevel();
        this.hp = this.getMaxHP(); // HP ban đầu  
        this.element = Furina.DEFAULT.element; // Element 
        this.description = Furina.DEFAULT.description; // Mô tả
        this.weapon = null; // vũ khí

        this.createCard();
        scene.add.existing(this);
    }

}
