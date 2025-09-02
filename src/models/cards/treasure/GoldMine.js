// GoldMine.js - Thẻ kho báu GoldMine
// Chức năng: Thẻ kho báu mỏ khai thác để nhận tài nguyên

import Treasure from '../../../modules/typeCard/treasure.js';

export default class GoldMine extends Treasure {
    static DEFAULT = {
        id: 'gold-mine',
        name: 'GoldMine',
        type: 'treasure',
        description: 'GoldMine - Mỏ khai thác để nhận tài nguyên.',
        rarity: 2
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            GoldMine.DEFAULT.name,
            GoldMine.DEFAULT.id,
            GoldMine.DEFAULT.type);
        
        this.rarity = GoldMine.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = GoldMine.DEFAULT.description;

        this.durability = this.GetRandom(5, 10); // Độ bền từ 5-10
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    CardEffect() {
        console.log('GoldMine card effect');
        // thêm ani lật thẻ 
        // this.scene.gameManager.animationManager.startFlipAnimation(this);
        this.ProgressDestroy();
        const newCard = this.scene.gameManager.cardManager.cardFactory.createRandomCard(this.scene, this.index);
        this.scene.gameManager.cardManager.addCard(newCard, this.index).processCreation();
        return true;
    }
}
