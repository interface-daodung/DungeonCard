// Mavuika.js - Thẻ nhân vật Mavuika
// Chức năng: Nhân vật người chơi điều khiển

import Card from '../../../modules/Card.js';

export default class Mavuika extends Card {

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

            this.level = this.getLevel();
            this.hp = this.getMaxHP(); // HP ban đầu  
            this.element = Mavuika.DEFAULT.element; // Element 
            this.description = Mavuika.DEFAULT.description; // Mô tả
            this.weapon = null; // vũ khí
    
            this.createCard();
            scene.add.existing(this);
        }
    
    }
    