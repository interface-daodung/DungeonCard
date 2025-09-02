import Phaser from 'phaser';

export class SpritesheetWrapper {
    /**
     * Phát animation effect và tự động xóa khi hoàn thành
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {number} x - Tọa độ X
     * @param {number} y - Tọa độ Y
     * @param {string} textureKey - Key của texture
     * @param {number|null} displayWidth - Chiều rộng hiển thị (null = giữ nguyên)
     * @param {number|null} displayHeight - Chiều cao hiển thị (null = giữ nguyên)
     * @param {Object} frames - Object chứa start và end frame
     * @param {number} frames.start - Frame bắt đầu
     * @param {number} frames.end - Frame kết thúc
     * @param {number} frameRate - Tốc độ phát animation (mặc định: 10)
     * @returns {Phaser.GameObjects.Sprite} Sprite được tạo
     */
    static animationEffect(scene, x, y, textureKey, displayWidth = null, displayHeight = null, frames, frameRate = 10) {
        // Tạo sprite
        const sprite = scene.add.sprite(x, y, textureKey);

        // Set kích thước hiển thị nếu được chỉ định
        if (displayWidth !== null) {
            sprite.setDisplaySize(displayWidth, displayHeight || displayWidth);
        }

        // Tạo key animation cố định dựa trên textureKey và frames
        const animKey = `${textureKey}_effect_${frames.start}_${frames.end}`;

        // Tạo animation chỉ nếu chưa tồn tại
        if (!scene.anims.exists(animKey)) {
            scene.anims.create({
                key: animKey,
                frames: scene.anims.generateFrameNumbers(textureKey, {
                    start: frames.start,
                    end: frames.end
                }),
                frameRate: frameRate,
                repeat: 0 // Không lặp lại
            });
        }
        sprite.setDepth(200);
        // Phát animation
        sprite.play(animKey);

        // Lắng nghe sự kiện animation complete
        sprite.on('animationcomplete', () => {
            // Xóa sprite khi animation hoàn thành
            sprite.destroy();
        });

        return sprite;
    }

    /**
     * Phát animation slash effect với tham số cố định
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {number} x - Tọa độ X
     * @param {number} y - Tọa độ Y
     * @returns {Phaser.GameObjects.Sprite} Sprite được tạo
     */
    static animationSlash(scene, x, y) {
        return this.animationEffect(
            scene,
            x,
            y,
            'slash-animations', // textureKey cố định
            170,     // displayWidth cố định
            170,     // displayHeight cố định
            { start: 0, end: 4 }, // frames cố định
            12       // frameRate cố định
        );
    }
    static animationBomb(scene, x, y) {
        return this.animationEffect(
            scene,
            x,
            y,
            'bomb-animations',
            170,
            170,
            { start: 0, end: 11 },
            24
        );
    }
    static animationBreatheFire(scene, x, y) {
        return this.animationEffect(
            scene,
            x,
            y,
            'breathe-fire-animations',
            170,
            170,
            { start: 0, end: 14 },
            30
        );
    }
    /**
     * Tạo character animation (thay thế SpritesheetCharacter.create)
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {number} x - Tọa độ X
     * @param {number} y - Tọa độ Y
     * @param {string} textureKey - Key của texture
     * @param {number|null} displayWidth - Chiều rộng hiển thị (null = giữ nguyên)
     * @param {number|null} displayHeight - Chiều cao hiển thị (null = giữ nguyên)
     * @param {number} totalFrames - Tổng số frames (mặc định: 76)
     * @returns {Phaser.GameObjects.Sprite} Sprite được tạo
     */
    static CharacterAnimation(scene, x, y, textureKey, displayWidth = null, displayHeight = null, totalFrames = 76) {
        // Tạo sprite với texture
        const sprite = scene.add.sprite(x, y, textureKey);

        // Set display size nếu được truyền vào
        if (displayWidth && displayHeight) {
            sprite.setDisplaySize(displayWidth, displayHeight);
        }

        // Tạo animation từ sprite sheet
        const animKey = `${textureKey}-animation`;

        // Kiểm tra xem animation đã tồn tại chưa
        if (!scene.anims.exists(animKey)) {
            scene.anims.create({
                key: animKey,
                frames: scene.anims.generateFrameNumbers(textureKey, {
                    start: 0,
                    end: totalFrames - 1
                }),
                frameRate: 12,
                repeat: -1
            });
        }

        // Phát animation
        sprite.play(animKey);

        return sprite;
    }

    /**
     * Thay đổi màu của sprite bằng tint
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần thay đổi màu
     * @param {number} color - Màu sắc (hex color, ví dụ: 0xff0000 cho đỏ)
     * @returns {Phaser.GameObjects.Sprite} Sprite đã được tint
     */
    static setSpriteTint(sprite, color) {
        sprite.setTint(color);
        return sprite;
    }

    /**
     * Thay đổi màu của sprite bằng tint với alpha
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần thay đổi màu
     * @param {number} color - Màu sắc (hex color)
     * @param {number} alpha - Độ trong suốt (0-1)
     * @returns {Phaser.GameObjects.Sprite} Sprite đã được tint
     */
    static setSpriteTintWithAlpha(sprite, color, alpha) {
        sprite.setTintFill(color);
        sprite.setAlpha(alpha);
        return sprite;
    }

    /**
     * Xóa tint của sprite
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần xóa tint
     * @returns {Phaser.GameObjects.Sprite} Sprite đã xóa tint
     */
    static clearSpriteTint(sprite) {
        sprite.clearTint();
        return sprite;
    }

    /**
     * Tạo hiệu ứng flash (nhấp nháy) cho sprite
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần tạo hiệu ứng
     * @param {number} color - Màu flash (hex color)
     * @param {number} duration - Thời gian flash (ms)
     * @returns {Phaser.GameObjects.Sprite} Sprite đã tạo hiệu ứng
     */
    static flashSprite(sprite, color = 0xffffff, duration = 200) {
        const originalTint = sprite.tint;

        // Flash với màu trắng
        sprite.setTint(color);

        // Sau duration ms, trở về màu ban đầu
        sprite.scene.time.delayedCall(duration, () => {
            sprite.setTint(originalTint);
        });

        return sprite;
    }

    /**
     * Tạo hiệu ứng pulse (nhấp nháy liên tục) cho sprite
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần tạo hiệu ứng
     * @param {number} color - Màu pulse (hex color)
     * @param {number} interval - Khoảng thời gian giữa các lần pulse (ms)
     * @param {number} duration - Thời gian pulse (ms)
     * @returns {Phaser.GameObjects.Sprite} Sprite đã tạo hiệu ứng
     */
    static pulseSprite(sprite, color = 0xffffff, interval = 500, duration = 200) {
        const originalTint = sprite.tint;
        let isFlashing = false;

        const pulseTimer = sprite.scene.time.addEvent({
            delay: interval,
            callback: () => {
                if (!isFlashing) {
                    isFlashing = true;
                    sprite.setTint(color);

                    sprite.scene.time.delayedCall(duration, () => {
                        sprite.setTint(originalTint);
                        isFlashing = false;
                    });
                }
            },
            loop: true
        });

        // Lưu timer để có thể dừng sau này
        sprite.pulseTimer = pulseTimer;

        return sprite;
    }

    /**
     * Dừng hiệu ứng pulse của sprite
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần dừng pulse
     * @returns {Phaser.GameObjects.Sprite} Sprite đã dừng pulse
     */
    static stopPulseSprite(sprite) {
        if (sprite.pulseTimer) {
            sprite.pulseTimer.destroy();
            sprite.pulseTimer = null;
            sprite.clearTint();
        }
        return sprite;
    }
}
