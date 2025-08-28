// Shooter.js - Thẻ enemy Hilichurl Shooter
// Chức năng: Enemy bắn cung từ xa, tấn công cơ bản

import Card from '../../../modules/Card.js';

export default class Shooter extends Card {
    static DEFAULT = {
        id: 'shooter',
        name: 'Shooter',
        element: 'physical',
        type: 'enemy',
        description: 'Shooter - Kẻ địch bắn cung từ xa, tấn công cơ bản.',
        rarity: 2
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Shooter.DEFAULT.name,
            Shooter.DEFAULT.id,
            Shooter.DEFAULT.type);

        this.element = Shooter.DEFAULT.element;
        this.description = Shooter.DEFAULT.description;
        this.rarity = Shooter.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
