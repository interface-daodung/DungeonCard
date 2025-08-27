// CryoShooter.js - Thẻ enemy Hilichurl Cryo Shooter
// Chức năng: Enemy bắn băng từ xa, có thể làm chậm và đóng băng người chơi

import Card from '../../../modules/Card.js';

export default class CryoShooter extends Card {
    static DEFAULT = {
        id: 'cryo-shooter',
        name: 'Cryo Shooter',
        element: 'cryo',
        type: 'enemy',
        description: 'Cryo Shooter - Kẻ địch bắn băng từ xa, có thể làm chậm và đóng băng người chơi.',
        rarity: 2
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            CryoShooter.DEFAULT.name,
            CryoShooter.DEFAULT.id,
            CryoShooter.DEFAULT.type);

        this.element = CryoShooter.DEFAULT.element;
        this.description = CryoShooter.DEFAULT.description;
        this.rarity = CryoShooter.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
