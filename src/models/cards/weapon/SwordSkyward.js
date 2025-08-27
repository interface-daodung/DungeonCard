// SwordSkyward.js - Thẻ vũ khí kiếm Skyward
// Chức năng: Thẻ vũ khí kiếm Bầu Trời tăng sức mạnh và tốc độ

import Card from '../../../modules/Card.js';

export default class SwordSkyward extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Sword Skyward', 
            'sword-skyward', "weapon");

        this.attackBoost = this.GetRandom(10, 18); // Tăng tấn công từ 10-18
        this.speedBoost = this.GetRandom(5, 12); // Tăng tốc độ từ 5-12
        this.durability = this.GetRandom(70, 100); // Độ bền từ 70-100
        this.rarity = 4; // Độ hiếm của thẻ (1-5, 4 là rất hiếm)
        this.description = 'Sword Skyward - Kiếm bầu trời thiêng liêng tăng sức mạnh và tốc độ.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createAttackBoostDisplay();
        this.createSpeedBoostDisplay();
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
     * Tạo hiển thị tăng tốc độ
     */
    createSpeedBoostDisplay() {
        // Tạo background tròn cho speed boost
        this.speedBoostBackground = this.scene.add.graphics();
        this.speedBoostBackground.fillStyle(0x9933ff); // Màu tím
        this.speedBoostBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị speed boost
        this.speedBoostText = this.scene.add.text(0, 0, this.speedBoost.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.speedBoostText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho speed boost display
        this.speedBoostDisplay = this.scene.add.container(0, 0, [this.speedBoostBackground, this.speedBoostText]);

        // Đặt vị trí ở giữa dưới của thẻ
        this.speedBoostDisplay.setPosition(0, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm speed boost display vào card
        this.add(this.speedBoostDisplay);
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
     * Cập nhật tăng tốc độ và hiển thị
     * @param {number} newSpeedBoost - Tăng tốc độ mới
     */
    updateSpeedBoost(newSpeedBoost) {
        this.speedBoost = newSpeedBoost;
        if (this.speedBoostText) {
            this.speedBoostText.setText(this.speedBoost.toString());
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
        console.log('Sword Skyward đã bị vỡ!');
        this.destroy(); // Xóa vũ khí khỏi scene
    }

    /**
     * Override CardEffect để xử lý logic riêng của SwordSkyward
     */
    CardEffect() {
        console.log(`Sword Skyward ---------------------- đang chạy hiệu ứng...`);
        // Logic trang bị vũ khí cho người chơi
        if (this.scene.player) {
            this.scene.player.equipWeapon(this);
            console.log(`Sword Skyward được trang bị, tăng ${this.attackBoost} tấn công và ${this.speedBoost} tốc độ!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin SwordSkyward
     */
    onLongPress() {
        console.log('=== SWORD SKYWARD INFO ===');
        console.log('Attack Boost:', this.attackBoost);
        console.log('Speed Boost:', this.speedBoost);
        console.log('Durability:', this.durability);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('================================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
