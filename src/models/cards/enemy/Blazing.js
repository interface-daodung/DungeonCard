// Blazing.js - Thẻ enemy Hilichurl Blazing
// Chức năng: Enemy cháy liên tục, gây damage theo thời gian cho người chơi gần đó

import Enemy from '../../../modules/typeCard/enemy.js';

export default class Blazing extends Enemy {
    static DEFAULT = {
        id: 'blazing',
        name: 'Blazing',
        element: 'pyro',
        type: 'enemy',
        description: 'Blazing - Kẻ địch cháy liên tục, gây damage theo thời gian cho người chơi gần đó.',
        clan: 'hilichurl',
        rarity: 3
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Blazing.DEFAULT.name,
            Blazing.DEFAULT.id,
            Blazing.DEFAULT.type);

        this.element = Blazing.DEFAULT.element;
        this.description = Blazing.DEFAULT.description;
        this.rarity = Blazing.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
