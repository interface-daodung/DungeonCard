// Lawachurl.js - Thẻ enemy Hilichurl Lawachurl
// Chức năng: Boss Hilichurl mạnh mẽ, có khả năng tấn công và phòng thủ cao

import Card from '../../../modules/Card.js';

export default class Lawachurl extends Card {
    static DEFAULT = {
        id: 'lawachurl',
        name: 'Lawachurl',
        element: 'geo',
        type: 'enemy',
        description: 'Lawachurl - Boss Hilichurl mạnh mẽ, có khả năng tấn công và phòng thủ cao.',
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
