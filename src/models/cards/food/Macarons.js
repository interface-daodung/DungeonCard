// Macarons.js - Thẻ thực phẩm Macarons
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe

import Card from '../../../modules/Card.js';

export default class Macarons extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Macarons', 
            'macarons', "food");

        this.healing = this.GetRandom(15, 25); // Hồi phục máu từ 15-25
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Macarons - Bánh ngọt Pháp hồi phục sức khỏe và tăng tinh thần.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createHealingDisplay();
    }

    /**
     * Tạo hiển thị khả năng hồi phục
     */
    createHealingDisplay() {
        // Tạo background tròn cho healing
        this.healingBackground = this.scene.add.graphics();
        this.healingBackground.fillStyle(0x00ff00); // Màu xanh lá
        this.healingBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị healing
        this.healingText = this.scene.add.text(0, 0, this.healing.toString(), {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.healingText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho healing display
        this.healingDisplay = this.scene.add.container(0, 0, [this.healingBackground, this.healingText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.healingDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm healing display vào card
        this.add(this.healingDisplay);
    }

    /**
     * Cập nhật khả năng hồi phục và hiển thị
     * @param {number} newHealing - Khả năng hồi phục mới
     */
    updateHealing(newHealing) {
        this.healing = newHealing;
        if (this.healingText) {
            this.healingText.setText(this.healing.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Macarons
     */
    CardEffect() {
        console.log(`Macarons ---------------------- đang chạy hiệu ứng...`);
        // Logic hồi phục máu cho người chơi
        if (this.scene.player) {
            this.scene.player.heal(this.healing);
            console.log(`Macarons hồi phục ${this.healing} máu cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin Macarons
     */
    onLongPress() {
        console.log('=== MACARONS INFO ===');
        console.log('Healing:', this.healing);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
