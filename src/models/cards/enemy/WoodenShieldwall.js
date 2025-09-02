// WoodenShieldwall.js - Thẻ enemy Hilichurl Wooden Shieldwall
// Chức năng: Enemy tường gỗ, có khả năng phòng thủ trung bình và dễ bị cháy

import Enemy from '../../../modules/typeCard/enemy.js';

export default class WoodenShieldwall extends Enemy {
    static DEFAULT = {
        id: 'wooden-shieldwall',
        name: 'Wooden Shieldwall',
        element: 'dendro',
        type: 'enemy',
        description: 'Wooden Shieldwall - Kẻ địch tường gỗ, có khả năng phòng thủ trung bình và dễ bị cháy.',
        clan: 'hilichurl',
        rarity: 3
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            WoodenShieldwall.DEFAULT.name,
            WoodenShieldwall.DEFAULT.id,
            WoodenShieldwall.DEFAULT.type);

        this.element = WoodenShieldwall.DEFAULT.element;
        this.description = WoodenShieldwall.DEFAULT.description;
        this.rarity = WoodenShieldwall.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
