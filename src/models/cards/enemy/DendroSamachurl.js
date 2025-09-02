// DendroSamachurl.js - Thẻ enemy Hilichurl Dendro Samachurl
// Chức năng: Enemy caster thảo có thể tạo cây và gây poison

import Enemy from '../../../modules/typeCard/enemy.js';

export default class DendroSamachurl extends Enemy {
    static DEFAULT = {
        id: 'dendro-samachurl',
        name: 'Dendro Samachurl',
        element: 'dendro',
        type: 'enemy',
        description: 'Dendro Samachurl - Kẻ địch caster thảo có thể tạo cây và gây poison.',
        clan: 'hilichurl',
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
        this.score = this.GetRandom(1, 9);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
