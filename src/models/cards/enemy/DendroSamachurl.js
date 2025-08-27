// DendroSamachurl.js - Thẻ enemy Hilichurl Dendro Samachurl
// Chức năng: Enemy caster thảo có thể tạo cây và gây poison

import Card from '../../../modules/Card.js';

export default class DendroSamachurl extends Card {
    static DEFAULT = {
        id: 'dendro-samachurl',
        name: 'Dendro Samachurl',
        element: 'dendro',
        type: 'enemy',
        description: 'Dendro Samachurl - Kẻ địch caster thảo có thể tạo cây và gây poison.',
        rarity: 3
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            DendroSamachurl.DEFAULT.name,
            DendroSamachurl.DEFAULT.id,
            DendroSamachurl.DEFAULT.type);

        this.element = DendroSamachurl.DEFAULT.element;
        this.description = DendroSamachurl.DEFAULT.description;
        this.rarity = DendroSamachurl.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
