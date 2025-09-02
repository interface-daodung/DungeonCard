// Chest.js - Thẻ kho báu Chest
// Chức năng: Thẻ kho báu chính nhận nhiều loại phần thưởng

import Treasure from '../../../modules/typeCard/treasure.js';

export default class Chest extends Treasure {
    static DEFAULT = {
        id: 'chest',
        name: 'Chest',
        type: 'treasure',
        description: 'Chest - Kho báu chính chứa nhiều loại phần thưởng quý giá.',
        rarity: 4
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Chest.DEFAULT.name,
            Chest.DEFAULT.id,
            Chest.DEFAULT.type);

        this.rarity = Chest.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 4 là rất hiếm)
        this.description = Chest.DEFAULT.description;

        this.durability = this.GetRandom(5, 10); // Độ bền từ 5-10

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    CardEffect() {
        console.log('Chest card effect');
        // thêm ani lật thẻ 
        // this.scene.gameManager.animationManager.startFlipAnimation(this);
        this.ProgressDestroy();
        const newCard = this.scene.gameManager.cardManager.cardFactory.createRandomCard(this.scene, this.index);
        this.scene.gameManager.cardManager.addCard(newCard, this.index).processCreation();
        return true;
    }
}
