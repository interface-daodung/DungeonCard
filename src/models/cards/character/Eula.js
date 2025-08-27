// Eula.js - Thẻ nhân vật Eula
// Chức năng: Nhân vật người chơi điều khiển

import Card from '../../../modules/Card.js';

export default class Eula extends Card {

    static DEFAULT = {
        id: 'eula',
        name: 'Eula',
        description: 'Eula – nữ thần của thủy quyền, đại diện cho sự cân bằng giữa lực lượng và tình cảm. Bên ngoài là vị thần đầy sức mạnh, nhưng bên trong là người phụ nữ đầy tình cảm và nhạy cảm.',
        hp: 10,
        element: 'cryo'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Eula.DEFAULT.name, Eula.DEFAULT.id, "character");

        this.level = this.getLevel();
        this.hp = this.getMaxHP(); // HP ban đầu  
        this.element = Eula.DEFAULT.element; // Element 
        this.description = Eula.DEFAULT.description; // Mô tả
        this.weapon = null; // vũ khí

        this.createCard();
        scene.add.existing(this);
    }

}
