// Explosive.js - Thẻ bom Explosive
// Chức năng: Thẻ bom nổ gây damage cho enemy và người chơi

import Bomb from '../../../modules/typeCard/bomb.js';
import CalculatePositionCard from '../../../utils/CalculatePositionCard.js';

export default class Explosive extends Bomb {
    static DEFAULT = {
        id: 'explosive',
        name: 'Explosive',
        type: 'bomb',
        description: 'Explosive - Bom nổ gây damage cho tất cả trong bán kính.',
        rarity: 3
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Explosive.DEFAULT.name,
            Explosive.DEFAULT.id,
            Explosive.DEFAULT.type);


        this.rarity = Explosive.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = Explosive.DEFAULT.description;

        this.damage = this.GetRandom(1, 3); // Damage từ 20-40
        this.countdown = 5; // Bán kính nổ từ 2-4 ô

        this.unsubscribeList.push(this.scene.gameManager.emitter
            .on('completeMove', this.BombCountdownEffect.bind(this), 1));


        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    BombCountdownEffect() {
        console.log('Explosive: CardEffect');
        this.countdown--;
        this.countdownDisplay.updateText(this.countdown.toString());
        if (this.countdown <= 0) {
            this.Detonation();
        }
    }
    Detonation() {
        this.scene.sound.play('bomb-sound');
        const adjacentPositions = CalculatePositionCard.getAdjacentPositions(this.index);
        this.scene.gameManager.animationManager.startExplosiveAnimation(this.damage, adjacentPositions, () => {
            this.die();
        });
    }

}
