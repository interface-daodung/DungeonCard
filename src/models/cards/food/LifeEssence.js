// LifeEssence.js - Thẻ thực phẩm Life Essence
// Chức năng: Thẻ thực phẩm hồi phục sức khỏe tối đa và tăng tất cả chỉ số

import Card from '../../../modules/Card.js';

export default class LifeEssence extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Life Essence', 
            'life-essence', "food");

        this.healing = this.GetRandom(50, 100); // Hồi phục máu từ 50-100 (rất cao)
        this.allStatsBoost = this.GetRandom(5, 10); // Tăng tất cả chỉ số từ 5-10
        this.rarity = 5; // Độ hiếm của thẻ (1-5, 5 là hiếm nhất)
        this.description = 'Life Essence - Tinh hoa sự sống hồi phục sức khỏe tối đa và tăng tất cả chỉ số.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createHealingDisplay();
        this.createStatsBoostDisplay();
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
     * Tạo hiển thị tăng tất cả chỉ số
     */
    createStatsBoostDisplay() {
        // Tạo background tròn cho stats boost
        this.statsBoostBackground = this.scene.add.graphics();
        this.statsBoostBackground.fillStyle(0xff00ff); // Màu hồng
        this.statsBoostBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị stats boost
        this.statsBoostText = this.scene.add.text(0, 0, this.allStatsBoost.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.statsBoostText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho stats boost display
        this.statsBoostDisplay = this.scene.add.container(0, 0, [this.statsBoostBackground, this.statsBoostText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.statsBoostDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm stats boost display vào card
        this.add(this.statsBoostDisplay);
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
     * Cập nhật tăng tất cả chỉ số và hiển thị
     * @param {number} newAllStatsBoost - Tăng tất cả chỉ số mới
     */
    updateAllStatsBoost(newAllStatsBoost) {
        this.allStatsBoost = newAllStatsBoost;
        if (this.statsBoostText) {
            this.statsBoostText.setText(this.allStatsBoost.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của LifeEssence
     */
    CardEffect() {
        console.log(`LifeEssence ---------------------- đang chạy hiệu ứng...`);
        // Logic hồi phục máu và tăng tất cả chỉ số cho người chơi
        if (this.scene.player) {
            this.scene.player.heal(this.healing);
            this.scene.player.addAllStatsBoost(this.allStatsBoost);
            console.log(`LifeEssence hồi phục ${this.healing} máu và tăng tất cả chỉ số ${this.allStatsBoost} cho người chơi!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin LifeEssence
     */
    onLongPress() {
        console.log('=== LIFE ESSENCE INFO ===');
        console.log('Healing:', this.healing);
        console.log('All Stats Boost:', this.allStatsBoost);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
