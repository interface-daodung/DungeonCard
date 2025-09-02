// Pizza.js - Thẻ thực phẩm Pizza
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe và tăng sức mạnh

import Food from '../../../modules/typeCard/food.js';

export default class Pizza extends Food {

    static DEFAULT = {
        id: 'pizza',
        name: 'Pizza',
        type: 'food',
        description: 'Pizza - Bánh pizza Ý hồi phục sức khỏe và tăng sức mạnh tấn công.',
        rarity: 2
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Pizza.DEFAULT.name,
            Pizza.DEFAULT.id,
            Pizza.DEFAULT.type);

        this.rarity = Pizza.DEFAULT.rarity;
        this.description = Pizza.DEFAULT.description;

        this.food = this.GetRandom(3, 9);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    /**
     * Override CardEffect để xử lý logic riêng của Pizza
     */
    CardEffect() {
        super.CardEffect();
        console.log(`Pizza hồi phục ${this.food} máu cho người chơi!`);
        this.scene.gameManager.cardManager.CardCharacter.heal(this.food);
        return false;
    }
}
