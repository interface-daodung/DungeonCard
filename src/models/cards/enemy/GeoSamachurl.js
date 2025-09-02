// GeoSamachurl.js - Thẻ enemy Hilichurl Geo Samachurl
// Chức năng: Enemy caster địa có thể tạo tường và gây stun

import Enemy from '../../../modules/typeCard/enemy.js';

export default class GeoSamachurl extends Enemy {
    static DEFAULT = {
        id: 'geo-samachurl',
        name: 'Geo Samachurl',
        element: 'geo',
        type: 'enemy',
        description: 'Geo Samachurl - Kẻ địch caster địa có thể tạo tường và gây stun.',
        clan: 'hilichurl',
        rarity: 3
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            GeoSamachurl.DEFAULT.name,
            GeoSamachurl.DEFAULT.id,
            GeoSamachurl.DEFAULT.type);

        this.element = GeoSamachurl.DEFAULT.element;
        this.description = GeoSamachurl.DEFAULT.description;
        this.rarity = GeoSamachurl.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
