// MystiqueSoup.js - Thẻ thực phẩm Mystique Soup
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe và tăng buff

import Card from '../../../modules/Card.js';

export default class MystiqueSoup extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Mystique Soup', 
            'mystique-soup', "food");

        this.healing = this.GetRandom(20, 35); // Hồi phục máu từ 20-35
        this.buffDuration = this.GetRandom(3, 6); // Thời gian buff từ 3-6 lượt
        this.rarity = 3; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Mystique Soup - Súp bí ẩn hồi phục sức khỏe và tăng sức mạnh tạm thời.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createHealingDisplay();
        this.createBuffDisplay();
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
     * Tạo hiển thị thời gian buff
     */
    createBuffDisplay() {
        // Tạo background tròn cho buff
        this.buffBackground = this.scene.add.graphics();
        this.buffBackground.fillStyle(0x9933ff); // Màu tím
        this.buffBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị buff duration
        this.buffText = this.scene.add.text(0, 0, this.buffDuration.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.buffText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho buff display
        this.buffDisplay = this.scene.add.container(0, 0, [this.buffBackground, this.buffText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.buffDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm buff display vào card
        this.add(this.buffDisplay);
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
     * Cập nhật thời gian buff và hiển thị
     * @param {number} newBuffDuration - Thời gian buff mới
     */
    updateBuffDuration(newBuffDuration) {
        this.buffDuration = newBuffDuration;
        if (this.buffText) {
            this.buffText.setText(this.buffDuration.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của MystiqueSoup
     */
    CardEffect() {
        console.log(`MystiqueSoup ---------------------- đang chạy hiệu ứng...`);
        // Logic hồi phục máu và tăng buff cho người chơi
        if (this.scene.player) {
            this.scene.player.heal(this.healing);
            this.scene.player.addBuff('mystique', this.buffDuration);
            console.log(`MystiqueSoup hồi phục ${this.healing} máu và tăng buff ${this.buffDuration} lượt cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin MystiqueSoup
     */
    onLongPress() {
        console.log('=== MYSTIQUE SOUP INFO ===');
        console.log('Healing:', this.healing);
        console.log('Buff Duration:', this.buffDuration);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
