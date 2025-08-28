// Crackling.js - Thẻ enemy Hilichurl Crackling
// Chức năng: Enemy nổ khi chết, gây damage cho người chơi gần đó

import Card from '../../../modules/Card.js';

export default class Crackling extends Card {

    static DEFAULT = {
        id: 'crackling',
        name: 'Crackling',
        element: 'electro',
        type: 'enemy',
        description: 'Crackling - Kẻ địch nổ khi chết, gây damage cho người chơi gần đó.',
        rarity: 3
    }

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Crackling.DEFAULT.name,
            Crackling.DEFAULT.id,
            Crackling.DEFAULT.type);

        this.element = Crackling.DEFAULT.element;
        this.description = Crackling.DEFAULT.description;
        this.rarity = Crackling.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
