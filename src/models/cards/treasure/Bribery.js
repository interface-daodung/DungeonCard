// Bribery.js - Thẻ kho báu Bribery
// Chức năng: Thẻ kho báu hối lộ để nhận phần thưởng

import Card from '../../../modules/Card.js';

export default class Bribery extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Bribery', 
            'bribery', "treasure");

        this.cost = this.GetRandom(10, 25); // Chi phí hối lộ từ 10-25
        this.reward = this.GetRandom(20, 50); // Phần thưởng nhận được từ 20-50
        this.rarity = 3; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Bribery - Hối lộ để nhận phần thưởng lớn hơn chi phí.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createCostDisplay();
        this.createRewardDisplay();
    }

    /**
     * Tạo hiển thị chi phí
     */
    createCostDisplay() {
        // Tạo background tròn cho cost
        this.costBackground = this.scene.add.graphics();
        this.costBackground.fillStyle(0xff0000); // Màu đỏ
        this.costBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị cost
        this.costText = this.scene.add.text(0, 0, this.cost.toString(), {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.costText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho cost display
        this.costDisplay = this.scene.add.container(0, 0, [this.costBackground, this.costText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.costDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm cost display vào card
        this.add(this.costDisplay);
    }

    /**
     * Tạo hiển thị phần thưởng
     */
    createRewardDisplay() {
        // Tạo background tròn cho reward
        this.rewardBackground = this.scene.add.graphics();
        this.rewardBackground.fillStyle(0xffd700); // Màu vàng
        this.rewardBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị reward
        this.rewardText = this.scene.add.text(0, 0, this.reward.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.rewardText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho reward display
        this.rewardDisplay = this.scene.add.container(0, 0, [this.rewardBackground, this.rewardText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.rewardDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm reward display vào card
        this.add(this.rewardDisplay);
    }

    /**
     * Cập nhật chi phí và hiển thị
     * @param {number} newCost - Chi phí mới
     */
    updateCost(newCost) {
        this.cost = newCost;
        if (this.costText) {
            this.costText.setText(this.cost.toString());
        }
    }

    /**
     * Cập nhật phần thưởng và hiển thị
     * @param {number} newReward - Phần thưởng mới
     */
    updateReward(newReward) {
        this.reward = newReward;
        if (this.rewardText) {
            this.rewardText.setText(this.reward.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Bribery
     */
    CardEffect() {
        console.log(`Bribery ---------------------- đang chạy hiệu ứng...`);
        // Logic hối lộ để nhận phần thưởng
        if (this.scene.player && this.scene.player.coins >= this.cost) {
            this.scene.player.spendCoins(this.cost);
            this.scene.player.addCoins(this.reward);
            console.log(`Bribery: Chi ${this.cost} coins để nhận ${this.reward} coins!`);
        } else {
            console.log(`Bribery: Không đủ coins để hối lộ!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin Bribery
     */
    onLongPress() {
        console.log('=== BRIBERY INFO ===');
        console.log('Cost:', this.cost);
        console.log('Reward:', this.reward);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('==========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
