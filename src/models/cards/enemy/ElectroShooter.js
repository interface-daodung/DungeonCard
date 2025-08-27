// ElectroShooter.js - Thẻ enemy Hilichurl Electro Shooter
// Chức năng: Enemy bắn điện từ xa, có thể gây shock và làm chậm người chơi

import Card from '../../../modules/Card.js';

export default class ElectroShooter extends Card {
    static DEFAULT = {
        id: 'electro-shooter',
        name: 'Electro Shooter',
        element: 'electro',
        type: 'enemy',
        description: 'Electro Shooter - Kẻ địch bắn điện từ xa, có thể gây shock và làm chậm người chơi.',
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

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
