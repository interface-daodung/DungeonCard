// HilistrayWater.js - Thẻ enemy Hilichurl Hilistray Water
// Chức năng: Enemy nước, có khả năng chữa lành và tạo hiệu ứng ẩm ướt

import Enemy from '../../../modules/typeCard/enemy.js';

export default class HilistrayWater extends Enemy {
    static DEFAULT = {
        id: 'hilistray-water',
        name: 'Hilistray Water',
        element: 'hydro',
        type: 'enemy',
        description: 'Hilistray Water - Kẻ địch nước, có khả năng chữa lành và tạo hiệu ứng ẩm ướt.',
        clan: 'hilichurl',
        rarity: 2
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            HilistrayWater.DEFAULT.name,
            HilistrayWater.DEFAULT.id,
            HilistrayWater.DEFAULT.type);

        this.element = HilistrayWater.DEFAULT.element;
        this.description = HilistrayWater.DEFAULT.description;
        this.rarity = HilistrayWater.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
