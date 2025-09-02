// SwordSteampunk.js - Thẻ vũ khí kiếm Steampunk
// Chức năng: Thẻ vũ khí kiếm Steampunk tăng sức mạnh tấn công

import Weapon from '../../../modules/typeCard/weapon.js';

export default class SwordSteampunk extends Weapon {
    static DEFAULT = {
        id: 'sword-steampunk',
        name: 'Sword Steampunk',
        type: 'weapon',
        description: 'Sword Steampunk - Kiếm huy hoàng quý giá tăng sức mạnh và may mắn.',
        category: 'sword',
        rarity: 4
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            SwordSteampunk.DEFAULT.name,
            SwordSteampunk.DEFAULT.id,
            SwordSteampunk.DEFAULT.type);

        this.rarity = SwordSteampunk.DEFAULT.rarity;
        this.description = SwordSteampunk.DEFAULT.description;

        this.durability = this.GetRandom(3, 12);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}