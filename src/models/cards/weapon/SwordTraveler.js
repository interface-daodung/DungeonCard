// SwordTraveler.js - Thẻ vũ khí kiếm Traveler
// Chức năng: Thẻ vũ khí kiếm Lữ Khách tăng sức mạnh và khả năng thích ứng

import Card from '../../../modules/Card.js';

export default class SwordTraveler extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Sword Traveler', 
            'sword-traveler', "weapon");

        this.attackBoost = this.GetRandom(5, 10); // Tăng tấn công từ 5-10
        this.adaptability = this.GetRandom(10, 20); // Khả năng thích ứng từ 10-20
        this.durability = this.GetRandom(40, 70); // Độ bền từ 40-70
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Sword Traveler - Kiếm lữ khách đa năng tăng sức mạnh và khả năng thích ứng.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createAttackBoostDisplay();
        this.createAdaptabilityDisplay();
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
     * Tạo hiển thị khả năng thích ứng
     */
    createAdaptabilityDisplay() {
        // Tạo background tròn cho adaptability
        this.adaptabilityBackground = this.scene.add.graphics();
        this.adaptabilityBackground.fillStyle(0x00ccff); // Màu xanh dương nhạt
        this.adaptabilityBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị adaptability
        this.adaptabilityText = this.scene.add.text(0, 0, this.adaptability.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.adaptabilityText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho adaptability display
        this.adaptabilityDisplay = this.scene.add.container(0, 0, [this.adaptabilityBackground, this.adaptabilityText]);

        // Đặt vị trí ở giữa dưới của thẻ
        this.adaptabilityDisplay.setPosition(0, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm adaptability display vào card
        this.add(this.adaptabilityDisplay);
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
     * Cập nhật khả năng thích ứng và hiển thị
     * @param {number} newAdaptability - Khả năng thích ứng mới
     */
    updateAdaptability(newAdaptability) {
        this.adaptability = newAdaptability;
        if (this.adaptabilityText) {
            this.adaptabilityText.setText(this.adaptability.toString());
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
        console.log('Sword Traveler đã bị vỡ!');
        this.destroy(); // Xóa vũ khí khỏi scene
    }

    /**
     * Override CardEffect để xử lý logic riêng của SwordTraveler
     */
    CardEffect() {
        console.log(`Sword Traveler ---------------------- đang chạy hiệu ứng...`);
        // Logic trang bị vũ khí cho người chơi
        if (this.scene.player) {
            this.scene.player.equipWeapon(this);
            console.log(`Sword Traveler được trang bị, tăng ${this.attackBoost} tấn công và ${this.adaptability} khả năng thích ứng!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin SwordTraveler
     */
    onLongPress() {
        console.log('=== SWORD TRAVELER INFO ===');
        console.log('Attack Boost:', this.attackBoost);
        console.log('Adaptability:', this.adaptability);
        console.log('Durability:', this.durability);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==================================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
