// SwordForest.js - Thẻ vũ khí kiếm Forest
// Chức năng: Thẻ vũ khí kiếm Rừng tăng sức mạnh và khả năng phòng thủ

import Weapon from '../../../modules/typeCard/weapon.js';

export default class SwordForest extends Weapon {
    static DEFAULT = {
        id: 'sword-forest',
        name: 'Sword Forest',
        type: 'weapon',
        description: 'Sword Forest - Kiếm rừng tự nhiên tăng sức mạnh và khả năng phòng thủ.',
        category: 'sword',
        rarity: 3
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            SwordForest.DEFAULT.name,
            SwordForest.DEFAULT.id,
            SwordForest.DEFAULT.type);

        this.rarity = SwordForest.DEFAULT.rarity;
        this.description = SwordForest.DEFAULT.description;

        this.durability = this.GetRandom(6, 12);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}
