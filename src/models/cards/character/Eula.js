// Eula.js - Thẻ nhân vật Eula
// Chức năng: Nhân vật người chơi điều khiển

import Character from '../../../modules/typeCard/character.js';

export default class Eula extends Character  {

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

  
        this.element = Eula.DEFAULT.element; // Element 
        this.description = Eula.DEFAULT.description; // Mô tả
  

        this.createCard();
        scene.add.existing(this);
    }

}
