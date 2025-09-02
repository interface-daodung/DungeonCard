// Furina.js - Thẻ nhân vật Furina
// Chức năng: Nhân vật người chơi điều khiển

import Character from '../../../modules/typeCard/character.js';

export default class Furina extends Character {

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
 
        this.element = Furina.DEFAULT.element; // Element 
        this.description = Furina.DEFAULT.description; // Mô tả
     

        this.createCard();
        scene.add.existing(this);
    }

}
