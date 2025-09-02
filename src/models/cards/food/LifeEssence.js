// LifeEssence.js - Thẻ thực phẩm Life Essence
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe tối đa và tăng tất cả chỉ số

import Food from '../../../modules/typeCard/food.js';

export default class LifeEssence extends Food {

    static DEFAULT = {
        id: 'life-essence',
        name: 'Life Essence',
        type: 'food',
        description: 'Life Essence - Tinh hoa sự sống hồi phục sức khỏe tối đa và tăng tất cả chỉ số.',
    };

    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            LifeEssence.DEFAULT.name,
            LifeEssence.DEFAULT.id,
            LifeEssence.DEFAULT.type);

        this.rarity = LifeEssence.DEFAULT.rarity;
        this.description = LifeEssence.DEFAULT.description;

        this.food = this.GetRandom(1, 9);
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    /**
     * Override CardEffect để xử lý logic riêng của LifeEssence
     */
    CardEffect() {
        super.CardEffect();
        // Logic hồi phục máu và tăng tất cả chỉ số cho người chơi
        console.log(`LifeEssence hồi phục ${this.food} máu cho người chơi!`);
        this.scene.gameManager.cardManager.CardCharacter.heal(this.food);
        return false;
    }
}
