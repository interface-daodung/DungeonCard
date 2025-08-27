// Coin.js - Thẻ coin
// Chức năng: Thẻ coin cho điểm số

import Card from '../../modules/Card.js';

export default class Coin extends Card {
    static DEFAULT = {
        rarity: 2
    };
    constructor(scene, x, y, index, element) {
        super(scene, x, y, index,
            `Mảnh Vỡ Nguyên Tố ${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}`, 
            `${element}-fragment`, "coin");

        this.score = this.GetRandom(1, 9); // Điểm từ 1-9
        this.rarity = Coin.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = `Mảnh Vỡ Nguyên Tố ${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()} nhặt có thể đổi Xu.`;
        //   để báo hiệu card đã sẵn sàng
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
     * Tạo hiển thị điểm số
     */
    createScoreDisplay() {
        // Tạo background tròn cho điểm số
        this.scoreBackground = this.scene.add.graphics();
        this.scoreBackground.fillStyle(0xb58b00); // Màu đen với độ trong suốt 80%
        this.scoreBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 20px

        // Tạo text hiển thị điểm số
        this.scoreText = this.scene.add.text(0, 0, this.score.toString(), {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.scoreText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho score display
        this.scoreDisplay = this.scene.add.container(0, 0, [this.scoreBackground, this.scoreText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.scoreDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm score display vào card
        this.add(this.scoreDisplay);

        //console.log(`Coin HUD: Đã thêm hiển thị điểm số ${this.score} vào thẻ ${this.index}`);
    }

    /**
     * Cập nhật điểm số và hiển thị
     * @param {number} newScore - Điểm số mới
     */
    updateScore(newScore) {
        this.score = newScore;
        if (this.scoreText) {
            this.scoreText.setText(this.score.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Coin
     */
    CardEffect() {
        console.log(`Coin ---------------------- đang chạy hiệu ứng...`);
        this.scene.gameManager.addCoin(this.score);
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin Coin
     */
    onLongPress() {
        console.log('=== COIN ITEM INFO ===');
        console.log('Score:', this.score);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
