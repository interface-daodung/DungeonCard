// Quicksand.js - Thẻ bẫy Quicksand
// Chức năng: Thẻ bẫy cát lún làm chậm và gây damage cho người chơi

import Card from '../../../modules/Card.js';

export default class Quicksand extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Quicksand', 
            'quicksand', "trap");

        this.damage = this.GetRandom(5, 12); // Damage từ 5-12
        this.slowDuration = this.GetRandom(2, 4); // Thời gian làm chậm từ 2-4 lượt
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Quicksand - Bẫy cát lún gây damage và làm chậm người chơi khi kích hoạt.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createDamageDisplay();
        this.createSlowDisplay();
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
     * Tạo hiển thị thời gian làm chậm
     */
    createSlowDisplay() {
        // Tạo background tròn cho slow
        this.slowBackground = this.scene.add.graphics();
        this.slowBackground.fillStyle(0x996633); // Màu nâu
        this.slowBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị slow duration
        this.slowText = this.scene.add.text(0, 0, this.slowDuration.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.slowText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho slow display
        this.slowDisplay = this.scene.add.container(0, 0, [this.slowBackground, this.slowText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.slowDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm slow display vào card
        this.add(this.slowDisplay);
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
     * Cập nhật thời gian làm chậm và hiển thị
     * @param {number} newSlowDuration - Thời gian làm chậm mới
     */
    updateSlowDuration(newSlowDuration) {
        this.slowDuration = newSlowDuration;
        if (this.slowText) {
            this.slowText.setText(this.slowDuration.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Quicksand
     */
    CardEffect() {
        console.log(`Quicksand ---------------------- đang chạy hiệu ứng...`);
        // Logic gây damage và làm chậm người chơi
        if (this.scene.player) {
            this.scene.player.takeDamage(this.damage);
            this.scene.player.addSlowEffect(this.slowDuration);
            console.log(`Quicksand gây ${this.damage} damage và làm chậm ${this.slowDuration} lượt cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin Quicksand
     */
    onLongPress() {
        console.log('=== QUICKSAND INFO ===');
        console.log('Damage:', this.damage);
        console.log('Slow Duration:', this.slowDuration);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
