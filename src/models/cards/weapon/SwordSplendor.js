// SwordSplendor.js - Thẻ vũ khí kiếm Splendor
// Chức năng: Thẻ vũ khí kiếm Huy Hoàng tăng sức mạnh và may mắn

import Weapon from '../../../modules/typeCard/weapon.js';

export default class SwordSplendor extends Weapon {
    static DEFAULT = {
        id: 'sword-splendor',
        name: 'Sword Splendor',
        type: 'weapon',
        description: 'Sword Splendor - Kiếm huy hoàng quý giá tăng sức mạnh và may mắn.',
        category: 'sword',
        rarity: 4
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            SwordSplendor.DEFAULT.name,
            SwordSplendor.DEFAULT.id,
            SwordSplendor.DEFAULT.type);

        this.rarity = SwordSplendor.DEFAULT.rarity;
        this.description = SwordSplendor.DEFAULT.description;

        this.durability = this.GetRandom(3, 12);
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}