// Pizza.js - Thẻ thực phẩm Pizza
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe và tăng sức mạnh

import Card from '../../../modules/Card.js';

export default class Pizza extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Pizza', 
            'pizza', "food");

        this.healing = this.GetRandom(25, 40); // Hồi phục máu từ 25-40
        this.strengthBoost = this.GetRandom(2, 5); // Tăng sức mạnh từ 2-5
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Pizza - Bánh pizza Ý hồi phục sức khỏe và tăng sức mạnh tấn công.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createHealingDisplay();
        this.createStrengthDisplay();
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
     * Tạo hiển thị tăng sức mạnh
     */
    createStrengthDisplay() {
        // Tạo background tròn cho strength
        this.strengthBackground = this.scene.add.graphics();
        this.strengthBackground.fillStyle(0xff6600); // Màu cam
        this.strengthBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị strength boost
        this.strengthText = this.scene.add.text(0, 0, this.strengthBoost.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.strengthText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho strength display
        this.strengthDisplay = this.scene.add.container(0, 0, [this.strengthBackground, this.strengthText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.strengthDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm strength display vào card
        this.add(this.strengthDisplay);
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
     * Cập nhật tăng sức mạnh và hiển thị
     * @param {number} newStrengthBoost - Tăng sức mạnh mới
     */
    updateStrengthBoost(newStrengthBoost) {
        this.strengthBoost = newStrengthBoost;
        if (this.strengthText) {
            this.strengthText.setText(this.strengthBoost.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Pizza
     */
    CardEffect() {
        console.log(`Pizza ---------------------- đang chạy hiệu ứng...`);
        // Logic hồi phục máu và tăng sức mạnh cho người chơi
        if (this.scene.player) {
            this.scene.player.heal(this.healing);
            this.scene.player.addStrengthBoost(this.strengthBoost);
            console.log(`Pizza hồi phục ${this.healing} máu và tăng sức mạnh ${this.strengthBoost} cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin Pizza
     */
    onLongPress() {
        console.log('=== PIZZA INFO ===');
        console.log('Healing:', this.healing);
        console.log('Strength Boost:', this.strengthBoost);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
