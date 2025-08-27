// GoldMine.js - Thẻ kho báu GoldMine
// Chức năng: Thẻ kho báu mỏ khai thác để nhận tài nguyên

import Card from '../../../modules/Card.js';

export default class GoldMine extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'GoldMine', 
            'gold-mine', "treasure");

        this.resourceType = this.getRandomResourceType(); // Loại tài nguyên ngẫu nhiên
        this.resourceAmount = this.GetRandom(15, 35); // Số lượng tài nguyên từ 15-35
        this.rarity = 2; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = `GoldMine - Mỏ khai thác ${this.resourceType} để nhận tài nguyên.`;
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    /**
     * Lấy loại tài nguyên ngẫu nhiên
     */
    getRandomResourceType() {
        const resourceTypes = ['coins', 'gems', 'materials'];
        return resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.createResourceTypeDisplay();
        this.createResourceAmountDisplay();
    }

    /**
     * Tạo hiển thị loại tài nguyên
     */
    createResourceTypeDisplay() {
        // Tạo background tròn cho resource type
        this.resourceTypeBackground = this.scene.add.graphics();
        
        // Màu sắc khác nhau cho từng loại tài nguyên
        let color;
        switch(this.resourceType) {
            case 'coins':
                color = 0xffd700; // Vàng
                break;
            case 'gems':
                color = 0x9933ff; // Tím
                break;
            case 'materials':
                color = 0x996633; // Nâu
                break;
            default:
                color = 0x808080; // Xám
        }
        
        this.resourceTypeBackground.fillStyle(color);
        this.resourceTypeBackground.fillCircle(0, 0, 18); // Hình tròn bán kính 18px

        // Tạo text hiển thị resource type (viết tắt)
        const typeText = this.resourceType.charAt(0).toUpperCase();
        this.resourceTypeText = this.scene.add.text(0, 0, typeText, {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.resourceTypeText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho resource type display
        this.resourceTypeDisplay = this.scene.add.container(0, 0, [this.resourceTypeBackground, this.resourceTypeText]);

        // Đặt vị trí ở góc phải dưới của thẻ
        this.resourceTypeDisplay.setPosition(57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm resource type display vào card
        this.add(this.resourceTypeDisplay);
    }

    /**
     * Tạo hiển thị số lượng tài nguyên
     */
    createResourceAmountDisplay() {
        // Tạo background tròn cho resource amount
        this.resourceAmountBackground = this.scene.add.graphics();
        this.resourceAmountBackground.fillStyle(0x00ff00); // Màu xanh lá
        this.resourceAmountBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị resource amount
        this.resourceAmountText = this.scene.add.text(0, 0, this.resourceAmount.toString(), {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.resourceAmountText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho resource amount display
        this.resourceAmountDisplay = this.scene.add.container(0, 0, [this.resourceAmountBackground, this.resourceAmountText]);

        // Đặt vị trí ở góc trái dưới của thẻ
        this.resourceAmountDisplay.setPosition(-57, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm resource amount display vào card
        this.add(this.resourceAmountDisplay);
    }

    /**
     * Cập nhật loại tài nguyên và hiển thị
     * @param {string} newResourceType - Loại tài nguyên mới
     */
    updateResourceType(newResourceType) {
        this.resourceType = newResourceType;
        this.description = `GoldMine - Mỏ khai thác ${this.resourceType} để nhận tài nguyên.`;
        
        if (this.resourceTypeText) {
            this.resourceTypeText.setText(this.resourceType.charAt(0).toUpperCase());
        }
        
        // Cập nhật màu sắc
        if (this.resourceTypeBackground) {
            let color;
            switch(this.resourceType) {
                case 'coins':
                    color = 0xffd700;
                    break;
                case 'gems':
                    color = 0x9933ff;
                    break;
                case 'materials':
                    color = 0x996633;
                    break;
                default:
                    color = 0x808080;
            }
            this.resourceTypeBackground.fillStyle(color);
            this.resourceTypeBackground.fillCircle(0, 0, 18);
        }
    }

    /**
     * Cập nhật số lượng tài nguyên và hiển thị
     * @param {number} newResourceAmount - Số lượng tài nguyên mới
     */
    updateResourceAmount(newResourceAmount) {
        this.resourceAmount = newResourceAmount;
        if (this.resourceAmountText) {
            this.resourceAmountText.setText(this.resourceAmount.toString());
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của GoldMine
     */
    CardEffect() {
        console.log(`GoldMine ---------------------- đang chạy hiệu ứng...`);
        // Logic khai thác mỏ để nhận tài nguyên
        if (this.scene.player) {
            switch(this.resourceType) {
                case 'coins':
                    this.scene.player.addCoins(this.resourceAmount);
                    console.log(`GoldMine: Khai thác được ${this.resourceAmount} coins!`);
                    break;
                case 'gems':
                    this.scene.player.addGems(this.resourceAmount);
                    console.log(`GoldMine: Khai thác được ${this.resourceAmount} gems!`);
                    break;
                case 'materials':
                    this.scene.player.addMaterials(this.resourceAmount);
                    console.log(`GoldMine: Khai thác được ${this.resourceAmount} materials!`);
                    break;
            }
        }
        return false;
    }

    /**
     * Override onLongPress để hiển thị thông tin GoldMine
     */
    onLongPress() {
        console.log('=== GOLD MINE INFO ===');
        console.log('Resource Type:', this.resourceType);
        console.log('Resource Amount:', this.resourceAmount);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
