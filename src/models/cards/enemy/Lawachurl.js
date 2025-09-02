// Lawachurl.js - Thẻ enemy Hilichurl Lawachurl
// Chức năng: Boss Hilichurl mạnh mẽ, có khả năng tấn công và phòng thủ cao

import Enemy from '../../../modules/typeCard/enemy.js';

export default class Lawachurl extends Enemy {
    static DEFAULT = {
        id: 'lawachurl',
        name: 'Lawachurl',
        element: 'geo',
        type: 'enemy',
        description: 'Lawachurl - Boss Hilichurl mạnh mẽ, có khả năng tấn công và phòng thủ cao.',
        clan: 'hilichurl',
        rarity: 5
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Lawachurl.DEFAULT.name,
            Lawachurl.DEFAULT.id,
            Lawachurl.DEFAULT.type);

        this.element = Lawachurl.DEFAULT.element;
        this.description = Lawachurl.DEFAULT.description;
        this.rarity = Lawachurl.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
