// SwordSkyward.js - Thẻ vũ khí kiếm Skyward
// Chức năng: Thẻ vũ khí kiếm Bầu Trời tăng sức mạnh và tốc độ

import Weapon from '../../../modules/typeCard/weapon.js';

export default class SwordSkyward extends Weapon {
    static DEFAULT = {
        id: 'sword-skyward',
        name: 'Sword Skyward',
        type: 'weapon',
        description: 'Sword Skyward - Kiếm bầu trời thiêng liêng tăng sức mạnh và tốc độ.',
        category: 'sword',
        rarity: 4
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            SwordSkyward.DEFAULT.name,
            SwordSkyward.DEFAULT.id,
            SwordSkyward.DEFAULT.type);

        this.rarity = SwordSkyward.DEFAULT.rarity;
        this.description = SwordSkyward.DEFAULT.description;

        this.durability = this.GetRandom(10, 20);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}