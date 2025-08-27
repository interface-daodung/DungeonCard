// RoastChicken.js - Thẻ thực phẩm Roast Chicken
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe và tăng phòng thủ

import Card from '../../../modules/Card.js';

export default class RoastChicken extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Roast Chicken', 
            'roast-chicken', "food");

        this.healing = this.GetRandom(30, 45); // Hồi phục máu từ 30-45
        this.defenseBoost = this.GetRandom(3, 6); // Tăng phòng thủ từ 3-6
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Roast Chicken - Gà nướng thơm ngon hồi phục sức khỏe và tăng khả năng phòng thủ.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createHealingDisplay();
        this.createDefenseDisplay();
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
     * Tạo hiển thị tăng phòng thủ
     */
    createDefenseDisplay() {
        // Tạo background tròn cho defense
        this.defenseBackground = this.scene.add.graphics();
        this.defenseBackground.fillStyle(0x0066cc); // Màu xanh dương
        this.defenseBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị defense boost
        this.defenseText = this.scene.add.text(0, 0, this.defenseBoost.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.defenseText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho defense display
        this.defenseDisplay = this.scene.add.container(0, 0, [this.defenseBackground, this.defenseText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.defenseDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm defense display vào card
        this.add(this.defenseDisplay);
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
     * Cập nhật tăng phòng thủ và hiển thị
     * @param {number} newDefenseBoost - Tăng phòng thủ mới
     */
    updateDefenseBoost(newDefenseBoost) {
        this.defenseBoost = newDefenseBoost;
        if (this.defenseText) {
            this.defenseText.setText(this.defenseBoost.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của RoastChicken
     */
    CardEffect() {
        console.log(`RoastChicken ---------------------- đang chạy hiệu ứng...`);
        // Logic hồi phục máu và tăng phòng thủ cho người chơi
        if (this.scene.player) {
            this.scene.player.heal(this.healing);
            this.scene.player.addDefenseBoost(this.defenseBoost);
            console.log(`RoastChicken hồi phục ${this.healing} máu và tăng phòng thủ ${this.defenseBoost} cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin RoastChicken
     */
    onLongPress() {
        console.log('=== ROAST CHICKEN INFO ===');
        console.log('Healing:', this.healing);
        console.log('Defense Boost:', this.defenseBoost);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
