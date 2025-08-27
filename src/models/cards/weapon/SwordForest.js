// SwordForest.js - Thẻ vũ khí kiếm Forest
// Chức năng: Thẻ vũ khí kiếm Rừng tăng sức mạnh và khả năng phòng thủ

import Card from '../../../modules/Card.js';

export default class SwordForest extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Sword Forest', 
            'sword-forest', "weapon");

        this.attackBoost = this.GetRandom(6, 12); // Tăng tấn công từ 6-12
        this.defenseBoost = this.GetRandom(3, 8); // Tăng phòng thủ từ 3-8
        this.durability = this.GetRandom(60, 90); // Độ bền từ 60-90
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Sword Forest - Kiếm rừng tự nhiên tăng sức mạnh và khả năng phòng thủ.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createAttackBoostDisplay();
        this.createDefenseBoostDisplay();
        this.createDurabilityDisplay();
    }

    /**
     * Tạo hiển thị tăng tấn công
     */
    createAttackBoostDisplay() {
        // Tạo background tròn cho attack boost
        this.attackBoostBackground = this.scene.add.graphics();
        this.attackBoostBackground.fillStyle(0xff6600); // Màu cam
        this.attackBoostBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị attack boost
        this.attackBoostText = this.scene.add.text(0, 0, this.attackBoost.toString(), {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.attackBoostText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho attack boost display
        this.attackBoostDisplay = this.scene.add.container(0, 0, [this.attackBoostBackground, this.attackBoostText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.attackBoostDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm attack boost display vào card
        this.add(this.attackBoostDisplay);
    }

    /**
     * Tạo hiển thị tăng phòng thủ
     */
    createDefenseBoostDisplay() {
        // Tạo background tròn cho defense boost
        this.defenseBoostBackground = this.scene.add.graphics();
        this.defenseBoostBackground.fillStyle(0x00ff00); // Màu xanh lá
        this.defenseBoostBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị defense boost
        this.defenseBoostText = this.scene.add.text(0, 0, this.defenseBoost.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.defenseBoostText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho defense boost display
        this.defenseBoostDisplay = this.scene.add.container(0, 0, [this.defenseBoostBackground, this.defenseBoostText]);

        // Đặt vị trí ở giữa dưới của thẻ
        this.defenseBoostDisplay.setPosition(0, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm defense boost display vào card
        this.add(this.defenseBoostDisplay);
    }

    /**
     * Tạo hiển thị độ bền
     */
    createDurabilityDisplay() {
        // Tạo background tròn cho durability
        this.durabilityBackground = this.scene.add.graphics();
        this.durabilityBackground.fillStyle(0x0066cc); // Màu xanh dương
        this.durabilityBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị durability
        this.durabilityText = this.scene.add.text(0, 0, this.durability.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.durabilityText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho durability display
        this.durabilityDisplay = this.scene.add.container(0, 0, [this.durabilityBackground, this.durabilityText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.durabilityDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm durability display vào card
        this.add(this.durabilityDisplay);
    }

    /**
     * Cập nhật tăng tấn công và hiển thị
     * @param {number} newAttackBoost - Tăng tấn công mới
     */
    updateAttackBoost(newAttackBoost) {
        this.attackBoost = newAttackBoost;
        if (this.attackBoostText) {
            this.attackBoostText.setText(this.attackBoost.toString());
        }
    }

    /**
     * Cập nhật tăng phòng thủ và hiển thị
     * @param {number} newDefenseBoost - Tăng phòng thủ mới
     */
    updateDefenseBoost(newDefenseBoost) {
        this.defenseBoost = newDefenseBoost;
        if (this.defenseBoostText) {
            this.defenseBoostText.setText(this.defenseBoost.toString());
        }
    }

    /**
     * Cập nhật độ bền và hiển thị
     * @param {number} newDurability - Độ bền mới
     */
    updateDurability(newDurability) {
        this.durability = Math.max(0, newDurability); // Không cho độ bền âm
        if (this.durabilityText) {
            this.durabilityText.setText(this.durability.toString());
        }

        // Thay đổi màu sắc dựa trên độ bền
        if (this.durability <= 0) {
            this.break();
        } else if (this.durability <= 20) {
            this.durabilityBackground.fillStyle(0xff0000); // Màu đỏ khi độ bền thấp
            this.durabilityBackground.fillCircle(0, 0, 15);
        }
    }

    /**
     * Vũ khí bị vỡ khi độ bền = 0
     */
    break() {
        console.log('Sword Forest đã bị vỡ!');
        this.destroy(); // Xóa vũ khí khỏi scene
    }

    /**
     * Override CardEffect để xử lý logic riêng của SwordForest
     */
    CardEffect() {
        console.log(`Sword Forest ---------------------- đang chạy hiệu ứng...`);
        // Logic trang bị vũ khí cho người chơi
        if (this.scene.player) {
            this.scene.player.equipWeapon(this);
            console.log(`Sword Forest được trang bị, tăng ${this.attackBoost} tấn công và ${this.defenseBoost} phòng thủ!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin SwordForest
     */
    onLongPress() {
        console.log('=== SWORD FOREST INFO ===');
        console.log('Attack Boost:', this.attackBoost);
        console.log('Defense Boost:', this.defenseBoost);
        console.log('Durability:', this.durability);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
