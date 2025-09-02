// BreatheFire.js - Thẻ bẫy Breathe Fire
// Chức năng: Thẻ bẫy gây damage lửa cho người chơi

import Trap from '../../../modules/typeCard/trap.js';

export default class BreatheFire extends Trap {
    static DEFAULT = {
        id: 'breathe-fire',
        name: 'Breathe Fire',
        type: 'trap',
        description: 'Breathe Fire - Bẫy thở lửa gây damage cho người chơi khi kích hoạt.',
        rarity: 2
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            BreatheFire.DEFAULT.name,
            BreatheFire.DEFAULT.id,
            BreatheFire.DEFAULT.type);

        this.rarity = BreatheFire.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = BreatheFire.DEFAULT.description;

        this.damage = this.GetRandom(1, 7); // Damage từ 8-15

        // Sử dụng unique ID để tránh xung đột
        this.trapId = `breathe-fire-${Date.now()}-${Math.random()}`;
        
        // Lắng nghe event với unique ID
        this.unsubscribeList.push(this.scene.gameManager.emitter
            .on('completeMove', this.transformationAgency.bind(this), 3));

        // Tạo card và thêm vào scene
        this.createCard();
        this.initializeArrows();
        scene.add.existing(this);

    }

    CardEffect() {
        console.log('Breathe Fire - Bẫy thở lửa gây damage cho người chơi khi kích hoạt.');
        this.scene.sound.play('breathe-fire-sound');
        this.scene.gameManager.animationManager.startBreatheFireAnimation(this.damage, this.findAdjacentTargets(), () => {
            console.log('Breathe Fire - Bẫy thở lửa gây damage cho người chơi khi kích hoạt.');
        });
        return false;
    }

    initializeArrows() {
        // Xác định số lượng arrow hiển thị
        const random = Math.random() * 100;
        let arrowCount;

        if (random < 50) {
            arrowCount = 2; // 50% có 2 arrow
        } else if (random < 90) {
            arrowCount = 1; // 40% có 1 arrow
        } else {
            arrowCount = 3; // 10% có 3 arrow
        }
        console.log(arrowCount, "arrowCount --------------");
        // Tạo mảng các hướng có thể
        const directions = ['top', 'bottom', 'left', 'right'];

        this.arrowDisplay = [];

        // Random chọn arrowCount hướng để set = 1
        for (let i = 0; i < arrowCount; i++) {
            const randomIndex = this.GetRandom(0, directions.length - 1);
            this.arrowDisplay.push(this.createArrowDisplay('#ff0000', directions[randomIndex]));
            console.log(directions[randomIndex], "directions randomIndex --------------");
            // Xóa hướng đã chọn để không bị trùng
            directions.splice(randomIndex, 1);
        }
    }

    /**
     * Xoay các arrow theo chiều kim đồng hồ
     * Top → Right → Bottom → Left → Top
     */
    transformationAgency() {
        // Kiểm tra xem trap này có đang hoạt động không
        if (this.isTransforming) {
            return; // Tránh gọi nhiều lần
        }
        this.scene.gameManager.OnCompleteMoveCount++;
        this.isTransforming = true;
        
        // Dừng tween di chuyển trước khi xoay
        this.arrowDisplay.forEach(arrow => {
            arrow.pause();
        });

        let completedCount = 0;
        const totalArrows = this.arrowDisplay.length;

        this.arrowDisplay.forEach(arrow => {
            // Tính góc mới theo chiều kim đồng hồ
            let newAngle;
            switch (arrow.direction) {
                case 'top':
                    newAngle = 0; // top -> right
                    arrow.direction = 'right';
                    break;
                case 'right':
                    newAngle = 90; // right -> bottom
                    arrow.direction = 'bottom';
                    break;
                case 'bottom':
                    newAngle = 180; // bottom -> left
                    arrow.direction = 'left';
                    break;
                case 'left':
                    newAngle = -90; // left -> top
                    arrow.direction = 'top';
                    break;
                default:
                    newAngle = arrow.angle;
            }

            // Tạo tween xoay - tự động hủy sau khi hoàn thành
            this.scene.tweens.add({
                targets: arrow,
                angle: newAngle,
                duration: 300,
                ease: 'Power2',
                onUpdate: () => {
                    const rad = Phaser.Math.DegToRad(arrow.angle);
                    arrow.x = (arrow.cardWidth + 18) * Math.cos(rad);
                    arrow.y = (arrow.cardHeight + 18) * Math.sin(rad);
                },
                onComplete: () => {
                    // Sau khi xoay xong, tiếp tục tween di chuyển
                    arrow.resume();
                    completedCount++;
                    
                    // Kiểm tra xem tất cả arrow đã xoay xong chưa
                    if (completedCount >= totalArrows) {
                        this.isTransforming = false;
                        this.scene.gameManager.OnCompleteMoveCount--;
                    }
                }
            });
        });
    }


















        /**
     * Tìm các thẻ liền kề bị chỉ bởi arrow của trap
     * @returns {Array} Mảng index của các thẻ bị chỉ (0-8)
     */
    findAdjacentTargets() {
        const targets = [];
        const trapIndex = this.index;
        const trapPos = { row: Math.floor(trapIndex / 3), col: trapIndex % 3 };

        // Kiểm tra arrow top
        if (this.arrowDisplay.some(arrow => arrow.direction === 'top') && trapPos.row > 0) {
            const targetIndex = (trapPos.row - 1) * 3 + trapPos.col;
            if (targetIndex >= 0 && targetIndex < 9) {
                targets.push(targetIndex);
            }
        }

        // Kiểm tra arrow bottom
        if (this.arrowDisplay.some(arrow => arrow.direction === 'bottom') && trapPos.row < 2) {
            const targetIndex = (trapPos.row + 1) * 3 + trapPos.col;
            if (targetIndex >= 0 && targetIndex < 9) {
                targets.push(targetIndex);
            }
        }

        // Kiểm tra arrow left
        if (this.arrowDisplay.some(arrow => arrow.direction === 'left') && trapPos.col > 0) {
            const targetIndex = trapPos.row * 3 + (trapPos.col - 1);
            if (targetIndex >= 0 && targetIndex < 9) {
                targets.push(targetIndex);
            }
        }

        // Kiểm tra arrow right
        if (this.arrowDisplay.some(arrow => arrow.direction === 'right') && trapPos.col < 2) {
            const targetIndex = trapPos.row * 3 + (trapPos.col + 1);
            if (targetIndex >= 0 && targetIndex < 9) {
                targets.push(targetIndex);
            }
        }

        return targets;
    }

    //➤

    /**
     * Tạo mũi tên '➤' theo hướng được chỉ định
     * @param {number} Color - Màu sắc của mũi tên
     * @param {string} direction - Hướng của mũi tên ('top', 'bottom', 'left', 'right')
     * @returns {Phaser.GameObjects.Text} Đối tượng text mũi tên
     */
    createArrowDisplay(Color, direction) {
        // Tạo text mũi tên
        const arrowText = this.scene.add.text(0, 0, '➤', {
            fontSize: '42px',
            fill: Color,
            fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(999);

        arrowText.scaleX = 0.45;
        // Đặt vị trí mũi tên trên card
        arrowText.cardWidth = 57;
        arrowText.cardHeight = 113;
        let moveX = 0;
        let moveY = 0;
        arrowText.direction = direction;


        // Xoay mũi tên theo hướng
        let angle = 0;
        switch (direction) {
            case 'top':
                moveY = -5; // Di chuyển lên trên 5px
                arrowText.setPosition(0, -arrowText.cardHeight - 18);
                angle = -90; // Xoay 90 độ ngược chiều kim đồng hồ
                break;
            case 'bottom':
                moveY = 5; // Di chuyển xuống dưới 5px
                arrowText.setPosition(0, arrowText.cardHeight + 18);
                angle = 90; // Xoay 90 độ theo chiều kim đồng hồ
                break;
            case 'left':
                moveX = -5; // Di chuyển sang trái 5px
                arrowText.setPosition(-arrowText.cardWidth - 18, 0);
                angle = 180; // Xoay 180 độ
                break;
            case 'right':
            default:
                moveX = 5; // Di chuyển sang phải 5px
                arrowText.setPosition(arrowText.cardWidth + 18, 0);
                angle = 0; // Không xoay (mặc định)
                break;
        }
        arrowText.setAngle(angle);

        // Tạo tween cho animation di chuyển
        const moveTween = this.scene.tweens.add({
            targets: arrowText,
            x: arrowText.x + moveX,
            y: arrowText.y + moveY,
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1,
        });

        // Thêm các method pause và resume cho arrowText
        arrowText.pause = function () {
            moveTween.pause();
        };

        arrowText.resume = function () {
            // Dừng tween cũ nếu có
            if (arrowText.moveTween) {
                arrowText.moveTween.stop();
            }

            // Cập nhật lại vị trí và góc theo direction mới
            let newAngle = 0;
            let newX = 0;
            let newY = 0;
            let moveX = 0;
            let moveY = 0;

            switch (arrowText.direction) {
                case 'top':
                    newAngle = -90;
                    newX = 0;
                    newY = -arrowText.cardHeight - 18;
                    moveY = -5;
                    break;
                case 'bottom':
                    newAngle = 90;
                    newX = 0;
                    newY = arrowText.cardHeight + 18;
                    moveY = 5;
                    break;
                case 'left':
                    newAngle = 180;
                    newX = -arrowText.cardWidth - 18;
                    newY = 0;
                    moveX = -5;
                    break;
                case 'right':
                default:
                    newAngle = 0;
                    newX = arrowText.cardWidth + 18;
                    newY = 0;
                    moveX = 5;
                    break;
            }

            // Cập nhật vị trí và góc
            arrowText.setPosition(newX, newY);
            arrowText.setAngle(newAngle);

            // Tạo tween mới với vị trí và hướng di chuyển mới
            arrowText.moveTween = arrowText.scene.tweens.add({
                targets: arrowText,
                x: newX + moveX,
                y: newY + moveY,
                duration: 1000,
                ease: 'Linear',
                yoyo: true,
                repeat: -1,
            });
        };

        // Lưu reference đến moveTween để có thể truy cập sau này
        arrowText.moveTween = moveTween;

        this.add(arrowText);

        return arrowText;
    }

    /**
     * Cleanup để tránh memory leak
     */
    destroy() {
        // Dừng tween di chuyển
        if (this.arrowDisplay) {
            this.arrowDisplay.forEach(arrow => {
                if (arrow.moveTween) {
                    arrow.moveTween.stop();
                }
            });
        }
        
        // Gọi destroy của parent
        super.destroy();
    }
}
