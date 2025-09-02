// Raiden.js - Thẻ nhân vật Raiden
// Chức năng: Nhân vật người chơi điều khiển

import Character from '../../../modules/typeCard/character.js';

export default class Raiden extends Character {

    static DEFAULT = {
        id: 'raiden',
        name: 'Raiden',
        description: 'Raiden Shogun – vĩnh hằng thống trị Inazuma, kiếm thần uy nghiêm với quyết tâm bất diệt. Bên ngoài lạnh lùng nhưng ẩn sâu là khát vọng giữ trọn lời hứa và bảo vệ thần dân.',
        hp: 10,
        element: 'electro'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Raiden.DEFAULT.name, Raiden.DEFAULT.id, "character");
 
        this.element = Raiden.DEFAULT.element; // Element 
        this.description = Raiden.DEFAULT.description; // Mô tả
    

        this.createCard();
        scene.add.existing(this);
    }
}