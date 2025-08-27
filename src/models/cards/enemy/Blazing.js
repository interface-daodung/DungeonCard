// Blazing.js - Thẻ enemy Hilichurl Blazing
// Chức năng: Enemy cháy liên tục, gây damage theo thời gian cho người chơi gần đó

import Card from '../../../modules/Card.js';

export default class Blazing extends Card {
    static DEFAULT = {
        id: 'blazing',
        name: 'Blazing',
        element: 'pyro',
        type: 'enemy',
        description: 'Blazing - Kẻ địch cháy liên tục, gây damage theo thời gian cho người chơi gần đó.',
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

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
