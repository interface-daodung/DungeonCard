import Phaser from 'phaser';

export class SpritesheetCharacter {
    static create(scene, x, y, textureKey,  displayWidth = null, displayHeight = null, totalFrames = 76) {
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

    /** hàm này hình như ko dùng đến
     * Đổi texture và animation cho sprite đã tạo
     * @param {Phaser.GameObjects.Sprite} sprite - Sprite cần đổi
     * @param {string} newTextureKey - Texture key mới
     * @param {number} totalFrames - Số frame mới (mặc định 76)
     */
    static changeTexture(sprite, newTextureKey, totalFrames = 76) {
        if (!sprite || !sprite.scene) {
            console.warn('SpritesheetCharacter: Sprite không hợp lệ');
            return;
        }

        // Lưu animation key cũ
        const oldAnimKey = sprite.anims.currentAnim ? sprite.anims.currentAnim.key : null;
        
        // Dừng animation hiện tại
        if (sprite.anims.isPlaying) {
            sprite.anims.stop();
        }

        // Đổi texture
        sprite.setTexture(newTextureKey);
        
        // Tạo animation key mới
        const newAnimKey = `${newTextureKey}-animation`;
        
        // Kiểm tra xem animation mới đã tồn tại chưa
        if (!sprite.scene.anims.exists(newAnimKey)) {
            // Tạo animation mới
            sprite.scene.anims.create({
                key: newAnimKey,
                frames: sprite.scene.anims.generateFrameNumbers(newTextureKey, {
                    start: 0,
                    end: totalFrames - 1
                }),
                frameRate: 12,
                repeat: -1
            });
            console.log(`SpritesheetCharacter: Đã tạo animation mới ${newAnimKey}`);
        } else {
            console.log(`SpritesheetCharacter: Sử dụng animation có sẵn ${newAnimKey}`);
        }
        
        // Phát animation mới
        sprite.play(newAnimKey);
        
        // Xóa animation cũ nếu không còn sprite nào sử dụng
        if (oldAnimKey && oldAnimKey !== newAnimKey) {
            // Kiểm tra xem có sprite nào khác đang sử dụng animation cũ không
            const spritesUsingOldAnim = sprite.scene.children.list.filter(child => 
                child.type === 'Sprite' && 
                child.anims && 
                child.anims.currentAnim && 
                child.anims.currentAnim.key === oldAnimKey
            );
            
            // Nếu không có sprite nào sử dụng, xóa animation cũ
            if (spritesUsingOldAnim.length === 0) {
                sprite.scene.anims.remove(oldAnimKey);
                console.log(`SpritesheetCharacter: Đã xóa animation cũ ${oldAnimKey}`);
            } else {
                console.log(`SpritesheetCharacter: Giữ animation cũ ${oldAnimKey} vì còn ${spritesUsingOldAnim.length} sprite đang sử dụng`);
            }
        }
        
        return sprite;
    }
}
