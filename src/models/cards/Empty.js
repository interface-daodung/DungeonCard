// Empty.js - Thẻ trống Empty
// Chức năng: Thẻ trống không có tác dụng, dùng để lấp chỗ trống

import Card from '../../modules/Card.js';

export default class Empty extends Card {
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            'Empty', 
            'empty', "empty");

        this.isEmpty = true; // Đánh dấu là thẻ trống
        this.rarity = 1; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = 'Empty - Thẻ trống không có tác dụng, dùng để lấp chỗ trống.';
        
        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thẻ trống không cần hiển thị HUD
        // Có thể thêm hiển thị đặc biệt nếu muốn
        this.createEmptyIndicator();
    }

    /**
     * Tạo hiển thị chỉ báo thẻ trống
     */
    createEmptyIndicator() {
        // Tạo background tròn cho empty indicator
        this.emptyIndicatorBackground = this.scene.add.graphics();
        this.emptyIndicatorBackground.fillStyle(0x808080); // Màu xám
        this.emptyIndicatorBackground.fillCircle(0, 0, 15); // Hình tròn bán kính 15px

        // Tạo text hiển thị "E" (Empty)
        this.emptyIndicatorText = this.scene.add.text(0, 0, 'E', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.emptyIndicatorText.setOrigin(0.5); // Căn giữa text

        // Tạo container cho empty indicator
        this.emptyIndicator = this.scene.add.container(0, 0, [this.emptyIndicatorBackground, this.emptyIndicatorText]);

        // Đặt vị trí ở giữa dưới của thẻ
        this.emptyIndicator.setPosition(0, 113); // Điều chỉnh vị trí theo kích thước thẻ

        // Thêm empty indicator vào card
        this.add(this.emptyIndicator);
    }

    /**
     * Cập nhật trạng thái trống và hiển thị
     * @param {boolean} newIsEmpty - Trạng thái trống mới
     */
    updateEmptyStatus(newIsEmpty) {
        this.isEmpty = newIsEmpty;
        if (this.emptyIndicatorText) {
            this.emptyIndicatorText.setText(this.isEmpty ? 'E' : 'F');
        }
    }

    /**
     * Override CardEffect để xử lý logic riêng của Empty
     */
    CardEffect() {
        console.log(`Empty ---------------------- đang chạy hiệu ứng...`);
        // Thẻ trống không có hiệu ứng gì
        console.log('Empty: Thẻ trống không có tác dụng!');
        return false;
    }

    /**
     * Kiểm tra xem thẻ có trống không
     */
    isCardEmpty() {
        return this.isEmpty;
    }

    /**
     * Đánh dấu thẻ không còn trống
     */
    markAsOccupied() {
        this.isEmpty = false;
        this.updateEmptyStatus(false);
        console.log('Empty: Thẻ đã được đánh dấu là không còn trống!');
    }

    /**
     * Đánh dấu thẻ trống trở lại
     */
    markAsEmpty() {
        this.isEmpty = true;
        this.updateEmptyStatus(true);
        console.log('Empty: Thẻ đã được đánh dấu là trống!');
    }

    /**
     * Override onLongPress để hiển thị thông tin Empty
     */
    onLongPress() {
        console.log('=== EMPTY INFO ===');
        console.log('Is Empty:', this.isEmpty);
        console.log('Position:', { x: this.x, y: this.y });
        console.log('Grid Index:', this.index);
        console.log('========================');

        super.onLongPress(); // Gọi method gốc của Card class
    }
}
