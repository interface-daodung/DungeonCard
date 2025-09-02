// Zhongli.js - Thẻ nhân vật Zhongli
// Chức năng: Nhân vật người chơi điều khiển

import Character from '../../../modules/typeCard/character.js';

export default class Zhongli extends Character {

    static DEFAULT = {
        id: 'zhongli',
        name: 'Zhongli',
        description: 'Zhongli – hiền giả tao nhã, thực chất là Nham Thần Liyue. Với trí tuệ hàng ngàn năm và phong thái điềm tĩnh, ông là hiện thân của vững bền, mang gánh nặng lịch sử nặng nề.',
        hp: 10,
        element: 'geo'
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Zhongli.DEFAULT.name, Zhongli.DEFAULT.id, "character");

    
        this.element = Zhongli.DEFAULT.element; // Element 
        this.description = Zhongli.DEFAULT.description; // Mô tả
   

        this.createCard();
        scene.add.existing(this);
    }
}
