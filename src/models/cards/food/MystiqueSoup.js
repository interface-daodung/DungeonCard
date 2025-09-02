// MystiqueSoup.js - Thẻ thực phẩm Mystique Soup
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe và tăng buff

import Food from '../../../modules/typeCard/food.js';

export default class MystiqueSoup extends Food {

    static DEFAULT = {
        id: 'mystique-soup',
        name: 'Mystique Soup',
        type: 'food',
        description: 'Mystique Soup - Súp bí ẩn hồi phục sức khỏe và tăng sức mạnh tạm thời.',
        rarity: 3
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            MystiqueSoup.DEFAULT.name,
            MystiqueSoup.DEFAULT.id,
            MystiqueSoup.DEFAULT.type);

        this.rarity = MystiqueSoup.DEFAULT.rarity;
        this.description = MystiqueSoup.DEFAULT.description;

        this.food = this.GetRandom(1, 9);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    /**
     * Override CardEffect để xử lý logic riêng của MystiqueSoup
     */
    CardEffect() {
        super.CardEffect();
        console.log(`Mystique Soup hồi phục ${this.food} máu cho người chơi!`);
        this.scene.gameManager.cardManager.CardCharacter.heal(this.food);
        return false;
    }
}
