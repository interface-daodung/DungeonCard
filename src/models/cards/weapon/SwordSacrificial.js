// SwordSacrificial.js - Thẻ vũ khí kiếm Sacrificial
// Chức năng: Thẻ vũ khí kiếm Hy Sinh tăng sức mạnh nhưng giảm độ bền

import Card from '../../../modules/Card.js';

export default class SwordSacrificial extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Sword Sacrificial', 
            'sword-sacrificial', "weapon");

        this.attackBoost = this.GetRandom(15, 25); // Tăng tấn công từ 15-25 (rất cao)
        this.durability = this.GetRandom(20, 40); // Độ bền từ 20-40 (thấp)
        this.sacrificeBonus = this.GetRandom(5, 10); // Bonus hy sinh từ 5-10
        this.rarity = 3; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Sword Sacrificial - Kiếm hy sinh mạnh mẽ nhưng độ bền thấp.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createAttackBoostDisplay();
        this.createSacrificeBonusDisplay();
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
     * Tạo hiển thị bonus hy sinh
     */
    createSacrificeBonusDisplay() {
        // Tạo background tròn cho sacrifice bonus
        this.sacrificeBonusBackground = this.scene.add.graphics();
        this.sacrificeBonusBackground.fillStyle(0xff0066); // Màu hồng đậm
        this.sacrificeBonusBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị sacrifice bonus
        this.sacrificeBonusText = this.scene.add.text(0, 0, this.sacrificeBonus.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.sacrificeBonusText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho sacrifice bonus display
        this.sacrificeBonusDisplay = this.scene.add.container(0, 0, [this.sacrificeBonusBackground, this.sacrificeBonusText]);

        // Đặt vị trí ở giữa dưới của thẻ
        this.sacrificeBonusDisplay.setPosition(0, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm sacrifice bonus display vào card
        this.add(this.sacrificeBonusDisplay);
    }

    /**
     * Tạo hiển thị độ bền
     */
    createDurabilityDisplay() {
        // Tạo background tròn cho durability
        this.durabilityBackground = this.scene.add.graphics();
        this.durabilityBackground.fillStyle(0xff0000); // Màu đỏ (độ bền thấp)
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
     * Cập nhật bonus hy sinh và hiển thị
     * @param {number} newSacrificeBonus - Bonus hy sinh mới
     */
    updateSacrificeBonus(newSacrificeBonus) {
        this.sacrificeBonus = newSacrificeBonus;
        if (this.sacrificeBonusText) {
            this.sacrificeBonusText.setText(this.sacrificeBonus.toString());
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
        } else if (this.durability <= 10) {
            this.durabilityBackground.fillStyle(0x990000); // Màu đỏ đậm khi độ bền rất thấp
            this.durabilityBackground.fillCircle(0, 0, 15);
        }
    }

    /**
     * Vũ khí bị vỡ khi độ bền = 0
     */
    break() {
        console.log('Sword Sacrificial đã bị vỡ!');
        this.destroy(); // Xóa vũ khí khỏi scene
    }

    /**
     * Kích hoạt hiệu ứng hy sinh
     */
    activateSacrifice() {
        if (this.durability > 0) {
            // Giảm độ bền để tăng tấn công tạm thời
            this.updateDurability(this.durability - this.sacrificeBonus);
            this.attackBoost += this.sacrificeBonus;
            this.updateAttackBoost(this.attackBoost);
            
            console.log(`Sword Sacrificial kích hoạt hy sinh, tăng ${this.sacrificeBonus} tấn công!`);
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của SwordSacrificial
     */
    CardEffect() {
        console.log(`Sword Sacrificial ---------------------- đang chạy hiệu ứng...`);
        // Logic trang bị vũ khí cho người chơi
        if (this.scene.player) {
            this.scene.player.equipWeapon(this);
            console.log(`Sword Sacrificial được trang bị, tăng ${this.attackBoost} tấn công!`);
            
            // Kích hoạt hiệu ứng hy sinh
            this.activateSacrifice();
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin SwordSacrificial
     */
    onLongPress() {
        console.log('=== SWORD SACRIFICIAL INFO ===');
        console.log('Attack Boost:', this.attackBoost);
        console.log('Sacrifice Bonus:', this.sacrificeBonus);
        console.log('Durability:', this.durability);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('=====================================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
