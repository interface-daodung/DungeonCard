// Berserker.js - Thẻ enemy Hilichurl Berserker
// Chức năng: Enemy điên cuồng, tấn công mạnh hơn khi máu thấp

import Card from '../../../modules/Card.js';

export default class Berserker extends Card {

    static DEFAULT = {
        id: 'berserker',
        name: 'Berserker',
        element: 'pyro',
        type: 'enemy',
        description: 'Berserker - Kẻ địch điên cuồng, tấn công mạnh hơn khi máu thấp.',
        rarity: 4
    }

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Berserker.DEFAULT.name,
            Berserker.DEFAULT.id,
            Berserker.DEFAULT.type);

        this.element = Berserker.DEFAULT.element;
        this.description = Berserker.DEFAULT.description;
        this.rarity = Berserker.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
