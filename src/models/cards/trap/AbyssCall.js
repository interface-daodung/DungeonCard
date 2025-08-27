// AbyssCall.js - Thẻ bẫy AbyssCall
// Chức năng: Thẻ bẫy gọi thêm enemy vào trận đấu

import Card from '../../../modules/Card.js';

export default class AbyssCall extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'AbyssCall', 
            'abyss-call', "trap");

        this.enemyCount = this.GetRandom(1, 3); // Số lượng enemy gọi từ 1-3
        this.enemyLevel = this.GetRandom(1, 3); // Cấp độ enemy từ 1-3
        this.rarity = 3; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'AbyssCall - Bẫy gọi thêm enemy vào trận đấu khi kích hoạt.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createEnemyCountDisplay();
        this.createEnemyLevelDisplay();
    }

    /**
     * Tạo hiển thị số lượng enemy
     */
    createEnemyCountDisplay() {
        // Tạo background tròn cho enemy count
        this.enemyCountBackground = this.scene.add.graphics();
        this.enemyCountBackground.fillStyle(0x800080); // Màu tím
        this.enemyCountBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị enemy count
        this.enemyCountText = this.scene.add.text(0, 0, this.enemyCount.toString(), {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.enemyCountText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho enemy count display
        this.enemyCountDisplay = this.scene.add.container(0, 0, [this.enemyCountBackground, this.enemyCountText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.enemyCountDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm enemy count display vào card
        this.add(this.enemyCountDisplay);
    }

    /**
     * Tạo hiển thị cấp độ enemy
     */
    createEnemyLevelDisplay() {
        // Tạo background tròn cho enemy level
        this.enemyLevelBackground = this.scene.add.graphics();
        this.enemyLevelBackground.fillStyle(0xff6600); // Màu cam
        this.enemyLevelBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị enemy level
        this.enemyLevelText = this.scene.add.text(0, 0, this.enemyLevel.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.enemyLevelText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho enemy level display
        this.enemyLevelDisplay = this.scene.add.container(0, 0, [this.enemyLevelBackground, this.enemyLevelText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.enemyLevelDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm enemy level display vào card
        this.add(this.enemyLevelDisplay);
    }

    /**
     * Cập nhật số lượng enemy và hiển thị
     * @param {number} newEnemyCount - Số lượng enemy mới
     */
    updateEnemyCount(newEnemyCount) {
        this.enemyCount = newEnemyCount;
        if (this.enemyCountText) {
            this.enemyCountText.setText(this.enemyCount.toString());
        }
    }

    /**
     * Cập nhật cấp độ enemy và hiển thị
     * @param {number} newEnemyLevel - Cấp độ enemy mới
     */
    updateEnemyLevel(newEnemyLevel) {
        this.enemyLevel = newEnemyLevel;
        if (this.enemyLevelText) {
            this.enemyLevelText.setText(this.enemyLevel.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của AbyssCall
     */
    CardEffect() {
        console.log(`AbyssCall ---------------------- đang chạy hiệu ứng...`);
        // Logic gọi thêm enemy vào trận đấu
        
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin AbyssCall
     */
    onLongPress() {
        console.log('=== ABYSS CALL INFO ===');
        console.log('Enemy Count:', this.enemyCount);
        console.log('Enemy Level:', this.enemyLevel);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
