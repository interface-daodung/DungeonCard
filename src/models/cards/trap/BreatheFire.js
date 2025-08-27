// BreatheFire.js - Thẻ bẫy Breathe Fire
// Chức năng: Thẻ bẫy gây damage lửa cho người chơi

import Card from '../../../modules/Card.js';

export default class BreatheFire extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Breathe Fire', 
            'breathe-fire', "trap");

        this.damage = this.GetRandom(8, 15); // Damage từ 8-15
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Breathe Fire - Bẫy thở lửa gây damage cho người chơi khi kích hoạt.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createDamageDisplay();
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
     * Override CardEffect để xử lý logic riêng của BreatheFire
     */
    CardEffect() {
        console.log(`BreatheFire ---------------------- đang chạy hiệu ứng...`);
        // Logic gây damage cho người chơi
        if (this.scene.player) {
            this.scene.player.takeDamage(this.damage);
            console.log(`BreatheFire gây ${this.damage} damage cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin BreatheFire
     */
    onLongPress() {
        console.log('=== BREATHE FIRE INFO ===');
        console.log('Damage:', this.damage);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
