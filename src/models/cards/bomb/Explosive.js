// Explosive.js - Thẻ bom Explosive
// Chức năng: Thẻ bom nổ gây damage cho enemy và người chơi

import Card from '../../../modules/Card.js';

export default class Explosive extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Explosive', 
            'explosive', "bomb");

        this.damage = this.GetRandom(20, 40); // Damage từ 20-40
        this.radius = this.GetRandom(2, 4); // Bán kính nổ từ 2-4 ô
        this.rarity = 3; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Explosive - Bom nổ gây damage cho tất cả trong bán kính.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createDamageDisplay();
        this.createRadiusDisplay();
    }

    /**
     * Tạo hiển thị damage
     */
    createDamageDisplay() {
        // Tạo background tròn cho damage
        this.damageBackground = this.scene.add.graphics();
        this.damageBackground.fillStyle(0xff0000); // Màu đỏ
        this.damageBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị damage
        this.damageText = this.scene.add.text(0, 0, this.damage.toString(), {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.damageText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho damage display
        this.damageDisplay = this.scene.add.container(0, 0, [this.damageBackground, this.damageText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.damageDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm damage display vào card
        this.add(this.damageDisplay);
    }

    /**
     * Tạo hiển thị bán kính nổ
     */
    createRadiusDisplay() {
        // Tạo background tròn cho radius
        this.radiusBackground = this.scene.add.graphics();
        this.radiusBackground.fillStyle(0xff6600); // Màu cam
        this.radiusBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị radius
        this.radiusText = this.scene.add.text(0, 0, this.radius.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.radiusText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho radius display
        this.radiusDisplay = this.scene.add.container(0, 0, [this.radiusBackground, this.radiusText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.radiusDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm radius display vào card
        this.add(this.radiusDisplay);
    }

    /**
     * Cập nhật damage và hiển thị
     * @param {number} newDamage - Damage mới
     */
    updateDamage(newDamage) {
        this.damage = newDamage;
        if (this.damageText) {
            this.damageText.setText(this.damage.toString());
        }
    }

    /**
     * Cập nhật bán kính nổ và hiển thị
     * @param {number} newRadius - Bán kính nổ mới
     */
    updateRadius(newRadius) {
        this.radius = newRadius;
        if (this.radiusText) {
            this.radiusText.setText(this.radius.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Explosive
     */
    CardEffect() {
        console.log(`Explosive ---------------------- đang chạy hiệu ứng...`);
        // Logic nổ bom gây damage cho tất cả trong bán kính
        this.explode();
        return false;
    }

    /**
     * Nổ bom gây damage cho tất cả trong bán kính
     */
    explode() {
        console.log(`Explosive nổ với damage ${this.damage} và bán kính ${this.radius}!`);
        
        // Gây damage cho người chơi nếu trong bán kính
        if (this.scene.player) {
            const distanceToPlayer = this.getDistanceToPlayer();
            if (distanceToPlayer <= this.radius) {
                this.scene.player.takeDamage(this.damage);
                console.log(`Explosive gây ${this.damage} damage cho người chơi!`);
            }
        }

        // Gây damage cho tất cả enemy trong bán kính
        if (this.scene.enemies) {
            this.scene.enemies.forEach(enemy => {
                const distanceToEnemy = this.getDistanceToEnemy(enemy);
                if (distanceToEnemy <= this.radius) {
                    enemy.takeDamage(this.damage);
                    console.log(`Explosive gây ${this.damage} damage cho enemy!`);
                }
            });
        }

        // Tự hủy sau khi nổ
        this.destroy();
    }

    /**
     * Tính khoảng cách đến người chơi
     */
    getDistanceToPlayer() {
        if (!this.scene.player) return Infinity;
        const dx = this.x - this.scene.player.x;
        const dy = this.y - this.scene.player.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Tính khoảng cách đến enemy
     */
    getDistanceToEnemy(enemy) {
        const dx = this.x - enemy.x;
        const dy = this.y - enemy.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Override onLongPress để hiển thị thông tin Explosive
     */
    onLongPress() {
        console.log('=== EXPLOSIVE INFO ===');
        console.log('Damage:', this.damage);
        console.log('Radius:', this.radius);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
