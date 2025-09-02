// SwordSacrificial.js - Thẻ vũ khí kiếm Sacrificial
// Chức năng: Thẻ vũ khí kiếm Hy Sinh tăng sức mạnh nhưng giảm độ bền

import Weapon from '../../../modules/typeCard/weapon.js';

export default class SwordSacrificial extends Weapon {
    static DEFAULT = {
        id: 'sword-sacrificial',
        name: 'Sword Sacrificial',
        type: 'weapon',
        description: 'Sword Sacrificial - Kiếm hy sinh mạnh mẽ nhưng độ bền thấp.',
        category: 'sword',
        rarity: 3
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            SwordSacrificial.DEFAULT.name,
            SwordSacrificial.DEFAULT.id,
            SwordSacrificial.DEFAULT.type);

        this.rarity = SwordSacrificial.DEFAULT.rarity;
        this.description = SwordSacrificial.DEFAULT.description;

        this.durability = this.GetRandom(5, 10);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

}
