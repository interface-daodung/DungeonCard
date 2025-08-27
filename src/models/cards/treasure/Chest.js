// Chest.js - Thẻ kho báu Chest
// Chức năng: Thẻ kho báu chính nhận nhiều loại phần thưởng

import Card from '../../../modules/Card.js';

export default class Chest extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Chest', 
            'chest', "treasure");

        this.coinReward = this.GetRandom(25, 50); // Phần thưởng coins từ 25-50
        this.gemReward = this.GetRandom(5, 15); // Phần thưởng gems từ 5-15
        this.rarity = 4; // Độ hiếm của thẻ (1-5, 4 là rất hiếm)
        this.description = 'Chest - Kho báu chính chứa nhiều loại phần thưởng quý giá.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createCoinRewardDisplay();
        this.createGemRewardDisplay();
    }

    /**
     * Tạo hiển thị phần thưởng coins
     */
    createCoinRewardDisplay() {
        // Tạo background tròn cho coin reward
        this.coinRewardBackground = this.scene.add.graphics();
        this.coinRewardBackground.fillStyle(0xffd700); // Màu vàng
        this.coinRewardBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị coin reward
        this.coinRewardText = this.scene.add.text(0, 0, this.coinReward.toString(), {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.coinRewardText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho coin reward display
        this.coinRewardDisplay = this.scene.add.container(0, 0, [this.coinRewardBackground, this.coinRewardText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.coinRewardDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm coin reward display vào card
        this.add(this.coinRewardDisplay);
    }

    /**
     * Tạo hiển thị phần thưởng gems
     */
    createGemRewardDisplay() {
        // Tạo background tròn cho gem reward
        this.gemRewardBackground = this.scene.add.graphics();
        this.gemRewardBackground.fillStyle(0x9933ff); // Màu tím
        this.gemRewardBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị gem reward
        this.gemRewardText = this.scene.add.text(0, 0, this.gemReward.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.gemRewardText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho gem reward display
        this.gemRewardDisplay = this.scene.add.container(0, 0, [this.gemRewardBackground, this.gemRewardText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.gemRewardDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm gem reward display vào card
        this.add(this.gemRewardDisplay);
    }

    /**
     * Cập nhật phần thưởng coins và hiển thị
     * @param {number} newCoinReward - Phần thưởng coins mới
     */
    updateCoinReward(newCoinReward) {
        this.coinReward = newCoinReward;
        if (this.coinRewardText) {
            this.coinRewardText.setText(this.coinReward.toString());
        }
    }

    /**
     * Cập nhật phần thưởng gems và hiển thị
     * @param {number} newGemReward - Phần thưởng gems mới
     */
    updateGemReward(newGemReward) {
        this.gemReward = newGemReward;
        if (this.gemRewardText) {
            this.gemRewardText.setText(this.gemReward.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Chest
     */
    CardEffect() {
        console.log(`Chest ---------------------- đang chạy hiệu ứng...`);
        // Logic mở kho báu để nhận nhiều loại phần thưởng
        if (this.scene.player) {
            this.scene.player.addCoins(this.coinReward);
            this.scene.player.addGems(this.gemReward);
            
            // Thêm hiệu ứng đặc biệt cho kho báu
            this.scene.player.addTreasureBonus();
            
            console.log(`Chest: Mở kho báu nhận được ${this.coinReward} coins và ${this.gemReward} gems!`);
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin Chest
     */
    onLongPress() {
        console.log('=== CHEST INFO ===');
        console.log('Coin Reward:', this.coinReward);
        console.log('Gem Reward:', this.gemReward);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('============================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
