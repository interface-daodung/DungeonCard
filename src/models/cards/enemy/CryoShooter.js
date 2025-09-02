// CryoShooter.js - Thẻ enemy Hilichurl Cryo Shooter
// Chức năng: Enemy bắn băng từ xa, có thể làm chậm và đóng băng người chơi

import Enemy from '../../../modules/typeCard/enemy.js';

export default class CryoShooter extends Enemy {
    static DEFAULT = {
        id: 'cryo-shooter',
        name: 'Cryo Shooter',
        element: 'cryo',
        type: 'enemy',
        description: 'Cryo Shooter - Kẻ địch bắn băng từ xa, có thể làm chậm và đóng băng người chơi.',
        clan: 'hilichurl',
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
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
