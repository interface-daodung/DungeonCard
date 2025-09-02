import Phaser from 'phaser';
import { SpritesheetWrapper } from '../utils/SpritesheetWrapper.js';

export default class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, index, name, nameId, type) {
        super(scene, x, y);
        this.index = index;
        this.name = name;           // Tên hiển thị của card
        this.nameId = nameId;       // ID duy nhất của card
        this.type = type;           // Loại card (attack, defense, character, etc.)

        // Khởi tạo biến cho long press
        this.pressStartTime = 0;

        // Biến để lưu trữ dialog
        this.cardInfoDialog = null;

        // Danh sách các hàm unsubscribe để cleanup khi destroy
        this.unsubscribeList = [];
    }

    createCard() {
        // Sử dụng ảnh thực tế cho card
        let atlasKey = this.type;
        if (this.type === 'weapon') {
            atlasKey += '-' + this.constructor.DEFAULT.category;
        } else if (this.type === 'enemy') {
            atlasKey += '-' + this.constructor.DEFAULT.clan;
        }
        this.cardImage = this.scene.add.image(0, 0, atlasKey, this.nameId); // Default image

        // Tự động scale ảnh về 90x154
        this.cardImage.setDisplaySize(160, 274.3);

        // Thêm border trắng 2px cho card với góc bo tròn
        this.border = this.scene.add.graphics();
        this.border.fillStyle(0xffffff, 1);
        this.border.lineStyle(2, 0xffffff, 1);
        this.border.fillRoundedRect(-82, -139, 164, 278.3, 20);
        this.border.strokeRoundedRect(-82, -139, 164, 278.3, 20);

        // Thêm các elements vào container - border ở dưới để hiển thị phía sau
        this.add([this.border, this.cardImage]);

        // Thêm hiển thị UI cho card
        this.addDisplayHUD();

        // Làm cho card có thể click - sử dụng kích thước đã scale (90x154)
        this.setInteractive(new Phaser.Geom.Rectangle(-80, -137, 160, 274.3), Phaser.Geom.Rectangle.Contains);

        // Events
        this.on('pointerdown', () => this.onCardPointerDown());
        this.on('pointerup', () => this.onCardPointerUp());
        this.on('pointerover', () => this.onCardHover());
        this.on('pointerout', () => this.onCardOut());
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
    }


    onCardPointerDown() {
        // Kiểm tra xem card có đang animation không
        if (this.scene.gameManager.animationManager.isProcessing) {
            return; // Không cho phép tương tác khi đang animation
        }

        // Ghi nhận thời điểm bắt đầu nhấn
        this.pressStartTime = Date.now();
        this.isLongPressed = false; // Reset flag long press
    }

    onCardPointerUp() {
        // Kiểm tra xem card có đang animation không
        if (this.scene.gameManager.animationManager.isProcessing) {
            // Reset trạng thái
            this.pressStartTime = 0;
            this.isLongPressed = false;
            return; // Không cho phép tương tác khi đang animation
        }

        // Kiểm tra xem có bắt đầu nhấn chưa
        if (this.pressStartTime === 0) {
            return; // Chưa bắt đầu nhấn
        }

        // Kiểm tra xem có phải là long press không
        const pressDuration = Date.now() - this.pressStartTime;

        // Chỉ xử lý nếu chưa long press và thời gian nhấn hợp lệ
        if (!this.isLongPressed && pressDuration > 0) {
            if (pressDuration < 1500) {
                // Nếu nhấn ngắn hơn 1.5s, thực hiện click thường
                this.onCardClick();
            } else {
                // Nếu nhấn từ 1.5s trở lên, thực hiện long press
                this.isLongPressed = true; // Đánh dấu đã long press
                this.onLongPress();
            }
        }

        // Reset trạng thái
        this.pressStartTime = 0;
    }

    onLongPress() {
        // Hiển thị dialog với thông tin thẻ
        this.showCardInfoDialog();
    }

    showCardInfoDialog() {
        // Hiển thị dialog thông tin thẻ
        // Background mờ chặn tương tác với game bên dưới
        // Dialog chỉ có thể đóng bằng nút X hoặc phím ESC

        // Xóa dialog cũ nếu có
        if (this.cardInfoDialog) {
            this.cardInfoDialog.destroy();
        }
        const { width, height } = this.scene.scale;
        // Tạo container cho dialog ở giữa màn hình
        this.cardInfoDialog = this.scene.add.container(width / 2, height / 2);
        this.cardInfoDialog.setDepth(120);

        // Tạo background mờ - đặt trong container với gốc tọa độ tương đối
        const bg = this.scene.add.rectangle(-width / 2, -height / 2, width, height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setInteractive();

        // Tạo background cho dialog - sử dụng màu chủ đạo của game với góc bo tròn
        const dialogBg = this.scene.add.graphics();
        dialogBg.fillStyle(0x800080, 0.95);
        dialogBg.lineStyle(3, 0xff3366);
        dialogBg.fillRoundedRect(-200, -150, 400, 300, 20);
        dialogBg.strokeRoundedRect(-200, -150, 400, 300, 20);

        // Tạo ảnh thẻ (scale nhỏ hơn)
        const cardImg = this.scene.add.image(0, 0, this.nameId);
        cardImg.setDisplaySize(80, 137.14);

        // Tạo text cho tên thẻ
        const nameText = this.scene.add.text(0, -120, this.name, {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        nameText.setOrigin(0.5);

        // Tạo text cho loại thẻ
        const typeText = this.scene.add.text(0, -100, `Type: ${this.type}`, {
            fontSize: '16px',
            fill: '#ffb3d9',
            fontFamily: 'Arial'
        });
        typeText.setOrigin(0.5);

        // Tạo text cho mô tả thẻ (sử dụng thuộc tính description nếu có, nếu không thì dùng mô tả mặc định)
        const description = this.getDescription();
        const descText = this.scene.add.text(0, 100, description, {
            fontSize: '14px',
            fill: '#ecf0f1',
            fontFamily: 'Arial',
            wordWrap: { width: 300 },
            align: 'center'
        });
        descText.setOrigin(0.5);

        // Tạo nút đóng với màu theme và góc bo tròn
        const closeBtn = this.scene.add.graphics();
        closeBtn.fillStyle(0xff3366);
        closeBtn.fillRoundedRect(-30, -25, 60, 50, 8);

        // Đặt vị trí của nút
        closeBtn.setPosition(0, 190);

        const closeText = this.scene.add.text(0, 190, 'X', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        });
        closeText.setOrigin(0.5);

        // Làm cho nút đóng có thể click và có hiệu ứng hover
        closeBtn.setInteractive(new Phaser.Geom.Rectangle(-30, -25, 60, 50), Phaser.Geom.Rectangle.Contains);

        // Hiệu ứng hover
        closeBtn.on('pointerover', () => {
            closeBtn.clear();
            closeBtn.setScale(1.2);
            closeBtn.fillStyle(0xff6b9d); // Màu sáng hơn khi hover
            closeBtn.fillRoundedRect(-30, -25, 60, 50, 8);
        });

        closeBtn.on('pointerout', () => {
            closeBtn.clear();
            closeBtn.setScale(1);
            closeBtn.fillStyle(0xff3366); // Màu gốc khi không hover
            closeBtn.fillRoundedRect(-30, -25, 60, 50, 8);
        });

        closeBtn.on('pointerdown', () => {
            this.hideCardInfoDialog();
        });

        // Thêm tất cả elements vào dialog container
        this.cardInfoDialog.add([bg, dialogBg, cardImg, nameText, typeText, descText, closeBtn, closeText]);



        // Thêm vào scene
        this.scene.add.existing(this.cardInfoDialog);

        // Chỉ có 2 cách để đóng dialog:
        // 1. Click vào nút X (closeBtn)
        // 2. Nhấn phím ESC
        this.escKey = this.scene.input.keyboard.addKey('ESC');
        this.escKey.on('down', () => {
            this.hideCardInfoDialog();
        });
    }

    /**
     * Ẩn dialog thông tin thẻ và reset trạng thái
     */
    hideCardInfoDialog() {
        if (this.cardInfoDialog) {
            this.cardInfoDialog.destroy();
            this.cardInfoDialog = null;
        }

        // Xóa event listener cho phím ESC
        if (this.escKey) {
            this.escKey.off('down');
            this.escKey = null;
        }

        // Reset trạng thái long press để có thể long press lại
        this.isLongPressed = false;
        this.pressStartTime = 0;

        console.log('Card: Dialog đã đóng, reset trạng thái long press');
    }


    getDescription() {
        // Thuộc tính mô tả mặc định, có thể được ghi đè bởi class con
        return this.description || 'Không có mô tả cho thẻ này.';
    }

    onCardClick() {
        this.scene.gameManager.moveCharacter(this.index);
    }

    onCardHover() {
        this.setScale(1.05);
    }

    onCardOut() {
        this.setScale(1.0);
    }

    /**
     * Hàm tiện ích tạo display tròn với các tham số tùy chỉnh
     * @param {Object} options - Các tùy chọn cho display
     * @param {number} options.x - Vị trí X của display
     * @param {number} options.y - Vị trí Y của display
     * @param {number} options.radius - Bán kính của hình tròn
     * @param {number} options.fillColor - Màu fill của hình tròn (hex)
     * @param {string} options.text - Text hiển thị trong display
     * @param {string} options.fontSize - Kích thước font (mặc định '16px')
     * @param {string} options.textColor - Màu của text (mặc định '#ffffff')
     * @returns {Object} Object chứa container và các thành phần để cập nhật
     */
    createDisplay(options, position) {
        // Validation và default values
        const {
            fillColor = 0x00FF00,
            text = '0',
        } = options || {};

        // Tạo background tròn
        const background = this.scene.add.graphics();
        background.fillStyle(fillColor);
        background.fillCircle(0, 0, 18);

        // Tạo text hiển thị
        const textDisplay = this.scene.add.text(0, 0, text.toString(), {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        textDisplay.setOrigin(0.5); // Căn giữa text

        // Tạo container cho display
        const display = this.scene.add.container(0, 0, [background, textDisplay]);

        if (position === 'leftTop') {
            display.setPosition(-57, -113);
        } else if (position === 'rightTop') {
            display.setPosition(57, -113);
        } else if (position === 'rightBottom') {
            display.setPosition(57, 113);
        } else if (position === 'leftBottom') {
            display.setPosition(-57, 113);
        }

        this.add(display);

        // Kiểm tra nếu text ban đầu là 0 thì ẩn display
        if (parseInt(text) === 0) {
            display.setVisible(false);
        }

        // Trả về object chứa tất cả thành phần để dễ quản lý
        return {
            container: display,
            text: textDisplay,
            // Thêm method tiện ích để cập nhật
            updateText: (newText) => {
                if (textDisplay && textDisplay.setText) {
                    textDisplay.setText(newText.toString());
                    // Kiểm tra nếu text mới là 0 thì ẩn display, ngược lại thì hiện
                    if (parseInt(newText) === 0) {
                        display.setVisible(false);
                    } else {
                        display.setVisible(true);
                    }
                }
            },
            updateColor: (newColor) => {
                if (background && background.fillStyle) {
                    background.fillStyle(newColor);
                }
            },
            destroy: () => {
                if (display && display.destroy) {
                    display.destroy();
                }
            }
        };
    }

    /**
     * Hàm tiện ích trả về số ngẫu nhiên trong khoảng [min, max]
     * @param {number} min - Giá trị nhỏ nhất
     * @param {number} max - Giá trị lớn nhất
     * @returns {number} Số ngẫu nhiên
     */
    GetRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    CardEffect() {
        console.log(`Card ${this.name} (${this.nameId}) đang chạy hiệu ứng...`);
    }

    takeDamage(damage, type) {
        console.log(`Card ${this.name} (${this.nameId}) bị tấn công ${damage} damage`);
        if (type === 'Explosive') {
            SpritesheetWrapper.animationBomb(this.scene, this.x, this.y);
        } else if (type === 'BreatheFire') {
            SpritesheetWrapper.animationBreatheFire(this.scene, this.x, this.y);
        }
    }

    die() {
        this.ProgressDestroy();
        const newCard = this.scene.gameManager.cardManager.cardFactory.createRandomCard(this.scene, this.index);
        this.scene.gameManager.cardManager.addCard(newCard, this.index).processCreation();
    }
    /**
     * Tạo hiệu ứng chết trước khi destroy card
     * @param {Function} onComplete - Callback khi hiệu ứng chết hoàn thành
     */
    ProgressDestroy() {
        // Kiểm tra scene còn hợp lệ không
        if (!this.scene || !this.scene.tweens) {
            console.warn(`Card ${this.name || this.nameId}: Scene or tweens not available, destroying directly`);
            this.destroy();
            return;
        }

        // Tạo hiệu ứng fade out
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                // Chạy tất cả unsubscribe functions trước khi destroy
                this.unsubscribeList.forEach(unsubscribe => {
                    if (typeof unsubscribe === 'function') {
                        try {
                            unsubscribe();
                        } catch (error) {
                            console.warn(`Card ${this.name || this.nameId}: Lỗi khi unsubscribe:`, error);
                        }
                    }
                });

                this.destroy();
            }
        });
    }

    /**
     * Tạo hiệu ứng fade in khi card được tạo mới
     */
    processCreation() {
        // Bắt đầu với alpha = 0 và scale nhỏ
        this.setAlpha(0);
        this.setScale(0.5);

        // Tạo hiệu ứng fade in + scale up
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 400,
            ease: 'Back.easeOut',
            onComplete: () => {
                //console.log(`Card ${this.name} (${this.nameId}) hiệu ứng tạo mới hoàn thành`);
            }
        });
    }


}


