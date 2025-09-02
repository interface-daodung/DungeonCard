// Bribery.js - Thẻ kho báu Bribery
// Chức năng: Thẻ kho báu hối lộ để nhận phần thưởng

import Treasure from '../../../modules/typeCard/treasure.js';

export default class Bribery extends Treasure {
    static DEFAULT = {
        id: 'bribery',
        name: 'Bribery',
        type: 'treasure',
        description: 'Bribery - Hối lộ để nhận phần thưởng lớn hơn chi phí.',
        rarity: 3
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Bribery.DEFAULT.name, 
            Bribery.DEFAULT.id,
            Bribery.DEFAULT.type);

    
        this.rarity = Bribery.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = Bribery.DEFAULT.description;

        this.durability = this.GetRandom(5, 10); // Độ bền từ 5-10
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    CardEffect() {
        console.log('Bribery card effect');
        // thêm ani lật thẻ 
        // this.scene.gameManager.animationManager.startFlipAnimation(this);
        this.ProgressDestroy();
        const newCard = this.scene.gameManager.cardManager.cardFactory.createRandomCard(this.scene, this.index);
        this.scene.gameManager.cardManager.addCard(newCard, this.index).processCreation();
        return true;
    }
}
