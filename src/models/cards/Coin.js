// Coin.js - Thẻ coin
// Chức năng: Thẻ coin cho điểm số

import Card from '../../modules/Card.js';

export default class Coin extends Card {
    static DEFAULT = {
        type: 'coin',
        rarity: 1
    };
    constructor(scene, x, y, index, element) {
        super(scene, x, y, index,
            `Mảnh Vỡ Nguyên Tố ${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}`,
            `${element}-fragment`, Coin.DEFAULT.type);

        this.score = this.GetRandom(1, 9); // Điểm từ 1-9
        this.rarity = Coin.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = `Mảnh Vỡ Nguyên Tố ${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()} nhặt có thể đổi Xu.`;
        //để báo hiệu card đã sẵn sàng
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.coinDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.score.toString()
        }, 'rightBottom');
    }

    /**
     * Cập nhật điểm số và hiển thị
     * @param {number} newScore - Điểm số mới
     */
    updateScore(newScore) {
        this.score = Math.max(0, newScore); // Đảm bảo điểm số không thấp hơn 0
        if (this.scoreText) {
            this.scoreText.setText(this.score.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Coin
     */
    CardEffect() {
        this.scene.gameManager.addCoin(this.score);
        return false;
    }
}
