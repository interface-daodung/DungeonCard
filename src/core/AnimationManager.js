// AnimationManager.js
// Quản lý hàng đợi animation trong game

export default class AnimationManager {
    constructor(scene) {
        this.scene = scene;
        this.animationQueue = []; // Hàng đợi animation
        this.isProcessing = false; // Trạng thái xử lý
        this.currentAnimation = null; // Animation đang chạy
        
        //console.log('AnimationManager: Đã khởi tạo với scene');
    }

    /**
     * Thêm animation vào hàng đợi
     * @param {Object} animation - Thông tin animation
     * @param {string} animation.type - Loại animation ('move', 'fade', 'scale', etc.)
     * @param {Object} animation.target - Đối tượng cần animate
     * @param {Object} animation.config - Cấu hình animation
     * @param {Function} animation.onComplete - Callback khi hoàn thành
     */
    addToQueue(animation) {
        this.animationQueue.push(animation);
        //console.log(`AnimationManager: Đã thêm animation ${animation.type} vào hàng đợi`);
        
        // Tự động bắt đầu xử lý nếu chưa có gì đang chạy
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    /**
     * Xử lý hàng đợi animation
     */
    processQueue() {
        if (this.animationQueue.length === 0 || this.isProcessing) {
            return;
        }

        this.isProcessing = true;
        const animation = this.animationQueue.shift();
        this.currentAnimation = animation;

        //console.log(`AnimationManager: Bắt đầu xử lý animation ${animation.type}`);

        // Thực hiện animation dựa trên type
        this.executeAnimation(animation);
    }

    /**
     * Thực hiện animation cụ thể
     * @param {Object} animation - Thông tin animation
     */
    executeAnimation(animation) {
        const { type, target, config, onComplete } = animation;

        switch (type) {
            case 'move':
                this.executeMoveAnimation(target, config, onComplete);
                break;
            case 'fade':
                this.executeFadeAnimation(target, config, onComplete);
                break;
            case 'scale':
                this.executeScaleAnimation(target, config, onComplete);
                break;
            case 'rotate':
                this.executeRotateAnimation(target, config, onComplete);
                break;
            default:
                console.warn(`AnimationManager: Không hỗ trợ animation type "${type}"`);
                this.completeAnimation(onComplete);
                break;
        }
    }

    /**
     * Thực hiện animation di chuyển
     * @param {Object|Array} target - Đối tượng cần di chuyển (có thể là 1 object hoặc array)
     * @param {Object} config - Cấu hình di chuyển
     * @param {Function} onComplete - Callback khi hoàn thành
     */
    executeMoveAnimation(target, onComplete) {
        
        // Kiểm tra xem target có phải là array không
        const targets = Array.isArray(target) ? target : [target];
        
        // Tạo array để theo dõi số animation đã hoàn thành
        let completedAnimations = 0;
        const totalAnimations = targets.length;
        
        //console.log(`AnimationManager: Tạo move animation cho ${targets.length} thẻ`);
        // Tạo animation riêng cho từng thẻ
        targets.forEach(movement => {
            const card = this.scene.gameManager.cardManager.getCard(movement.from);
            const coordinates = this.scene.gameManager.cardManager.getGridPositionCoordinates(movement.to);
            
            // Lưu z-index cũ để khôi phục sau
            const originalDepth = card.depth || 0;
            
            // Đặt z-index cao hơn cho card đang di chuyển
            card.setDepth(100);
            
            this.scene.tweens.add({
                targets: card,
                x: coordinates.x,   // Mỗi card tự có target riêng
                y: coordinates.y,
                duration: 500,
                ease: 'Power2',
                onComplete: () => {
                    // Khôi phục z-index về bình thường
                    card.setDepth(originalDepth);
                    
                    completedAnimations++;
                    
                    // Kiểm tra xem tất cả animation đã hoàn thành chưa
                    if (completedAnimations >= totalAnimations) {
                        //console.log(`AnimationManager: Tất cả ${totalAnimations} thẻ đã di chuyển xong`);
                        this.completeAnimation(onComplete);
                    }
                }
            });
        });
    }

    /**
     * Thực hiện animation fade
     * @param {Object} target - Đối tượng cần fade
     * @param {Object} config - Cấu hình fade
     * @param {Function} onComplete - Callback khi hoàn thành
     */
    executeFadeAnimation(target, config, onComplete) {
        const { alpha, duration = 300, ease = 'Power2' } = config;
        
        this.scene.tweens.add({
            targets: target,
            alpha: alpha,
            duration: duration,
            ease: ease,
            onComplete: () => {
                //console.log(`AnimationManager: Hoàn thành fade animation`);
                this.completeAnimation(onComplete);
            }
        });
    }

    /**
     * Thực hiện animation scale
     * @param {Object} target - Đối tượng cần scale
     * @param {Object} config - Cấu hình scale
     * @param {Function} onComplete - Callback khi hoàn thành
     */
    executeScaleAnimation(target, config, onComplete) {
        const { scaleX, scaleY, duration = 300, ease = 'Back.easeOut' } = config;
        
        this.scene.tweens.add({
            targets: target,
            scaleX: scaleX,
            scaleY: scaleY,
            duration: duration,
            ease: ease,
            onComplete: () => {
                //console.log(`AnimationManager: Hoàn thành scale animation`);
                this.completeAnimation(onComplete);
            }
        });
    }

    /**
     * Thực hiện animation rotate
     * @param {Object} target - Đối tượng cần rotate
     * @param {Object} config - Cấu hình rotate
     * @param {Function} onComplete - Callback khi hoàn thành
     */
    executeRotateAnimation(target, config, onComplete) {
        const { angle, duration = 500, ease = 'Power2' } = config;
        
        this.scene.tweens.add({
            targets: target,
            angle: angle,
            duration: duration,
            ease: ease,
            onComplete: () => {
                //console.log(`AnimationManager: Hoàn thành rotate animation`);
                this.completeAnimation(onComplete);
            }
        });
    }

    /**
     * Hoàn thành animation và xử lý tiếp theo
     * @param {Function} onComplete - Callback khi hoàn thành
     */
    completeAnimation(onComplete) {
        // Gọi callback nếu có và đợi nó hoàn thành
        if (onComplete && typeof onComplete === 'function') {
            try {
                // Gọi callback và đợi nó hoàn thành
                onComplete();
                //console.log('AnimationManager: Callback completed successfully');
            } catch (error) {
                console.error('AnimationManager: Error in callback:', error);
            }
        }

        // Chỉ set isProcessing = false sau khi callback hoàn thành
        this.currentAnimation = null;
        this.isProcessing = false;

        // Xử lý animation tiếp theo trong hàng đợi
        if (this.animationQueue.length > 0) {
            this.processQueue();
        } else {
            //console.log('AnimationManager: Hàng đợi animation đã trống');
        }
    }

    /**
     * Xóa tất cả animation trong hàng đợi
     */
    clearQueue() {
        this.animationQueue = [];
        //console.log('AnimationManager: Đã xóa tất cả animation trong hàng đợi');
    }

    /**
     * Dừng animation hiện tại
     */
    stopCurrentAnimation() {
        if (this.currentAnimation && this.currentAnimation.target) {
            this.scene.tweens.killTweensOf(this.currentAnimation.target);
            //console.log('AnimationManager: Đã dừng animation hiện tại');
        }
    }

    /**
     * Lấy thông tin trạng thái
     * @returns {Object} Thông tin trạng thái
     */
    getStatus() {
        return {
            queueLength: this.animationQueue.length,
            isProcessing: this.isProcessing,
            currentAnimation: this.currentAnimation ? this.currentAnimation.type : null
        };
    }

    /**
     * Dọn dẹp tài nguyên
     */
    destroy() {
        console.log('AnimationManager: Đang dọn dẹp...');
        this.clearQueue();
        this.stopCurrentAnimation();
        this.scene = null;
    }
}
