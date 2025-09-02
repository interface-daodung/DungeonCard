// Macarons.js - Thẻ thực phẩm Macarons
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe

import Food from '../../../modules/typeCard/food.js';

export default class Macarons extends Food {

    static DEFAULT = {
        id: 'macarons',
        name: 'Macarons',
        type: 'food',
        description: 'Macarons - Bánh ngọt Pháp hồi phục sức khỏe và tăng tinh thần.',
        rarity: 3
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Macarons.DEFAULT.name,
            Macarons.DEFAULT.id,
            Macarons.DEFAULT.type);

        this.rarity = Macarons.DEFAULT.rarity;
        this.description = Macarons.DEFAULT.description;

        this.food = this.GetRandom(6, 9);

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    /**
     * Override CardEffect để xử lý logic riêng của Macarons
     */
    CardEffect() {
        super.CardEffect();
        // Logic hồi phục máu và tăng tất cả chỉ số cho người chơi
        console.log(`Macarons hồi phục ${this.food} máu cho người chơi!`);
        this.scene.gameManager.cardManager.CardCharacter.heal(this.food);
        return false;
    }
}