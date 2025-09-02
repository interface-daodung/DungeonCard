// RoastChicken.js - Thẻ thực phẩm Roast Chicken
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe và tăng phòng thủ

import Food from '../../../modules/typeCard/food.js';

export default class RoastChicken extends Food {

    static DEFAULT = {
        id: 'roast-chicken',
        name: 'Roast Chicken',
        type: 'food',
        description: 'Roast Chicken - Gà nướng thơm ngon hồi phục sức khỏe và tăng khả năng phòng thủ.',
        rarity: 2
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            RoastChicken.DEFAULT.name,
            RoastChicken.DEFAULT.id,
            RoastChicken.DEFAULT.type);

        this.rarity = RoastChicken.DEFAULT.rarity;
        this.description = RoastChicken.DEFAULT.description;

        this.food = this.GetRandom(1, 6);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    /**
     * Override CardEffect để xử lý logic riêng của RoastChicken
     */
    CardEffect() {
        super.CardEffect();
        console.log(`Roast Chicken hồi phục ${this.food} máu cho người chơi!`);
        this.scene.gameManager.cardManager.CardCharacter.heal(this.food);
        return false;
    }
}
