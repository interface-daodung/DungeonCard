// HydroSamachurl.js - Thẻ enemy Hilichurl Hydro Samachurl
// Chức năng: Enemy caster thủy có thể tạo nước và gây wet effect

import Card from '../../../modules/Card.js';

export default class HydroSamachurl extends Card {
    static DEFAULT = {
        id: 'hydro-samachurl',
        name: 'Hydro Samachurl',
        element: 'hydro',
        type: 'enemy',
        description: 'Hydro Samachurl - Kẻ địch caster thủy có thể tạo nước và gây wet effect.',
        rarity: 3
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            HydroSamachurl.DEFAULT.name,
            HydroSamachurl.DEFAULT.id,
            HydroSamachurl.DEFAULT.type);

        this.element = HydroSamachurl.DEFAULT.element;
        this.description = HydroSamachurl.DEFAULT.description;
        this.rarity = HydroSamachurl.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
