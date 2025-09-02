// SwordTraveler.js - Thẻ vũ khí kiếm Traveler
// Chức năng: Thẻ vũ khí kiếm Lữ Khách tăng sức mạnh và khả năng thích ứng

import Weapon from '../../../modules/typeCard/weapon.js';

export default class SwordTraveler extends Weapon {
    static DEFAULT = {
        id: 'sword-traveler',
        name: 'Sword Traveler',
        type: 'weapon',
        description: 'Sword Traveler - Kiếm lữ khách tăng sức mạnh và khả năng thích ứng.',
        category: 'sword',
        rarity: 4
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            SwordTraveler.DEFAULT.name,
            SwordTraveler.DEFAULT.id,
            SwordTraveler.DEFAULT.type);

        this.rarity = SwordTraveler.DEFAULT.rarity;
        this.description = SwordTraveler.DEFAULT.description;

        this.durability = this.GetRandom(3, 12);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }
}