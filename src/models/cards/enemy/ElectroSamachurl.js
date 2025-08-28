// ElectroSamachurl.js - Thẻ enemy Hilichurl Electro Samachurl
// Chức năng: Enemy caster điện có thể gây shock và làm chậm người chơi

import Card from '../../../modules/Card.js';

export default class ElectroSamachurl extends Card {
    static DEFAULT = {
        id: 'electro-samachurl',
        name: 'Electro Samachurl',
        element: 'electro',
        type: 'enemy',
        description: 'Electro Samachurl - Kẻ địch caster điện có thể gây shock và làm chậm người chơi.',
        rarity: 3
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            ElectroSamachurl.DEFAULT.name,
            ElectroSamachurl.DEFAULT.id,
            ElectroSamachurl.DEFAULT.type);

        this.element = ElectroSamachurl.DEFAULT.element;
        this.description = ElectroSamachurl.DEFAULT.description;
        this.rarity = ElectroSamachurl.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
