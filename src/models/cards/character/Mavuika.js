// Mavuika.js - Thẻ nhân vật Mavuika
// Chức năng: Nhân vật người chơi điều khiển

import Character from '../../../modules/typeCard/character.js';

export default class Mavuika extends Character   {

    static DEFAULT = {
        id: 'mavuika',
        name: 'Mavuika',
        description: 'Mavuika – Hỏa Thần Natlan, biểu tượng của sức mạnh và ý chí bất khuất. Ngọn lửa trong nàng cháy rực như tinh thần chiến binh, soi sáng con đường tự do và khát vọng vĩnh cửu.',
        hp: 11,
        element: 'pyro'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Mavuika.DEFAULT.name, Mavuika.DEFAULT.id, "character");

         
            this.element = Mavuika.DEFAULT.element; // Element 
            this.description = Mavuika.DEFAULT.description; // Mô tả
 
    
            this.createCard();
            scene.add.existing(this);
        }
    
    }
    