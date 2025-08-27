// GeoSamachurl.js - Thẻ enemy Hilichurl Geo Samachurl
// Chức năng: Enemy caster địa có thể tạo tường và gây stun

import Card from '../../../modules/Card.js';

export default class GeoSamachurl extends Card {
    static DEFAULT = {
        id: 'geo-samachurl',
        name: 'Geo Samachurl',
        element: 'geo',
        type: 'enemy',
        description: 'Geo Samachurl - Kẻ địch caster địa có thể tạo tường và gây stun.',
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

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
