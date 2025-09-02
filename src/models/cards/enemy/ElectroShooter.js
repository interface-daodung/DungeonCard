// ElectroShooter.js - Thẻ enemy Hilichurl Electro Shooter
// Chức năng: Enemy bắn điện từ xa, có thể gây shock và làm chậm người chơi

import Enemy from '../../../modules/typeCard/enemy.js';

export default class ElectroShooter extends Enemy {
    static DEFAULT = {
        id: 'electro-shooter',
        name: 'Electro Shooter',
        element: 'electro',
        type: 'enemy',
        description: 'Electro Shooter - Kẻ địch bắn điện từ xa, có thể gây shock và làm chậm người chơi.',
        clan: 'hilichurl',
        rarity: 2
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            ElectroShooter.DEFAULT.name,
            ElectroShooter.DEFAULT.id,
            ElectroShooter.DEFAULT.type);

        this.element = ElectroShooter.DEFAULT.element;
        this.description = ElectroShooter.DEFAULT.description;
        this.rarity = ElectroShooter.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
