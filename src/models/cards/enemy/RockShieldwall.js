// RockShieldwall.js - Thẻ enemy Hilichurl Rock Shieldwall
// Chức năng: Enemy tường đá, có khả năng phòng thủ rất cao và chống đỡ tốt

import Enemy from '../../../modules/typeCard/enemy.js';

export default class RockShieldwall extends Enemy {
    static DEFAULT = {
        id: 'rock-shieldwall',
        name: 'Rock Shieldwall',
        element: 'geo',
        type: 'enemy',
        description: 'Rock Shieldwall - Kẻ địch tường đá, có khả năng phòng thủ rất cao và chống đỡ tốt.',
        clan: 'hilichurl',
        rarity: 4
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            RockShieldwall.DEFAULT.name,
            RockShieldwall.DEFAULT.id,
            RockShieldwall.DEFAULT.type);

        this.element = RockShieldwall.DEFAULT.element;
        this.description = RockShieldwall.DEFAULT.description;
        this.rarity = RockShieldwall.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
