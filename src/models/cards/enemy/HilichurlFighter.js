// HilichurlFighter.js - Thẻ enemy Hilichurl Fighter
// Chức năng: Enemy cơ bản có thể tấn công người chơi

import Enemy from '../../../modules/typeCard/enemy.js';

export default class HilichurlFighter extends Enemy {
    static DEFAULT = {
        id: 'fighter',
        name: 'Hilichurl Fighter',
        element: 'physical',
        type: 'enemy',
        description: 'Hilichurl Fighter - Kẻ địch cơ bản có thể tấn công người chơi.',
        clan: 'hilichurl',
        rarity: 4
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            HilichurlFighter.DEFAULT.name,
            HilichurlFighter.DEFAULT.id,
            HilichurlFighter.DEFAULT.type);

        this.element = HilichurlFighter.DEFAULT.element;
        this.description = HilichurlFighter.DEFAULT.description;
        this.rarity = HilichurlFighter.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
