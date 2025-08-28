// AnemoSamachurl.js - Thẻ enemy Hilichurl Anemo Samachurl
// Chức năng: Enemy caster gió có thể tạo gió và làm chậm người chơi

import Card from '../../../modules/Card.js';

export default class AnemoSamachurl extends Card {
    
    static DEFAULT = {
        id: 'anemo-samachurl',
        name: 'Anemo Samachurl',
        element: 'anemo',
        type: 'enemy',
        description: 'Anemo Samachurl - Kẻ địch caster gió có thể tạo gió và làm chậm người chơi.',
        rarity: 3
    }

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            AnemoSamachurl.DEFAULT.name,
            AnemoSamachurl.DEFAULT.id,
            AnemoSamachurl.DEFAULT.type);


        this.element = AnemoSamachurl.DEFAULT.element;
        this.description = AnemoSamachurl.DEFAULT.description;
        this.rarity = AnemoSamachurl.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
