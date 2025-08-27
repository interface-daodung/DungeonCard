// IceShieldwall.js - Thẻ enemy Hilichurl Ice Shieldwall
// Chức năng: Enemy tường băng, có khả năng phòng thủ cao và làm chậm người chơi

import Card from '../../../modules/Card.js';

export default class IceShieldwall extends Card {
    static DEFAULT = {
        id: 'ice-shieldwall',
        name: 'Ice Shieldwall',
        element: 'cryo',
        type: 'enemy',
        description: 'Ice Shieldwall - Kẻ địch tường băng, có khả năng phòng thủ cao và làm chậm người chơi.',
        rarity: 4
    }
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            IceShieldwall.DEFAULT.name,
            IceShieldwall.DEFAULT.id,
            IceShieldwall.DEFAULT.type);

        this.element = IceShieldwall.DEFAULT.element;
        this.description = IceShieldwall.DEFAULT.description;
        this.rarity = IceShieldwall.DEFAULT.rarity;

        this.health = this.GetRandom(3, 10); // Máu từ 12-20 (yếu hơn fighter)

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
