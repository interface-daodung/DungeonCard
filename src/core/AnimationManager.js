// AnimationManager.js
// Quản lý hàng đợi animation trong game

import CalculatePositionCard from '../utils/CalculatePositionCard.js';

export default class AnimationManager {
    constructor(scene) {
        this.scene = scene;
        this.animationQueue = []; // Hàng đợi animation functions với priority
        this.isProcessing = false; // Trạng thái xử lý
        this.currentAnimation = null; // Animation đang chạy

        //console.log('AnimationManager: Đã khởi tạo với scene');
    }

    /**
     * Thêm animation function vào hàng đợi với priority
     * @param {number} priority - Độ ưu tiên (càng cao càng được ưu tiên chạy trước)
     * @param {Function} animationFunction - Function chứa logic animation
     */
    addToQueue(priority, animationFunction) {
        this.animationQueue.push({
            priority: priority,
            function: animationFunction
        });
        //console.log(`AnimationManager: Đã thêm animation function với priority ${priority} vào hàng đợi`);

        // Tự động bắt đầu xử lý nếu chưa có gì đang chạy
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    /**
     * Xử lý hàng đợi animation - tìm animation có priority cao nhất
     */
    processQueue() {
        if (this.animationQueue.length === 0 || this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        // Tìm animation có priority cao nhất
        let maxPriorityIndex = 0;
        let maxPriority = this.animationQueue[0].priority;

        for (let i = 1; i < this.animationQueue.length; i++) {
            if (this.animationQueue[i].priority > maxPriority) {
                maxPriority = this.animationQueue[i].priority;
                maxPriorityIndex = i;
            }
        }

        // Lấy animation có priority cao nhất ra khỏi queue
        const animationItem = this.animationQueue.splice(maxPriorityIndex, 1)[0];
        this.currentAnimation = animationItem;

        //console.log(`AnimationManager: Bắt đầu xử lý animation function với priority ${animationItem.priority}`);

        // Thực hiện animation function
        this.executeAnimation(animationItem.function);
    }

    /**
     * Thực hiện animation function
     * @param {Function} animationFunction - Function chứa logic animation
     */
    executeAnimation(animationFunction) {
        try {
            // Gọi animation function và truyền callback để hoàn thành
            animationFunction(() => {
                this.completeAnimation();
            });
        } catch (error) {
            console.error('AnimationManager: Lỗi khi thực hiện animation:', error);
            this.completeAnimation();
        }
    }

    /**
     * Hoàn thành animation và xử lý tiếp theo
     */
    completeAnimation() {
        // Chỉ set isProcessing = false sau khi animation hoàn thành
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
 * Helper method: Thêm animation di chuyển vào queue với priority 10
 * @param {Object|Array} movementList - Đối tượng cần di chuyển (có thể là 1 object hoặc array)
 * @param {Function} onComplete - Callback khi hoàn thành
 */
    startMoveAnimation(movementList, onComplete) {
        this.addToQueue(8, () => {
            // Kiểm tra xem movementList có phải là array không
            const targets = Array.isArray(movementList) ? movementList : [movementList];

            // Tạo array để theo dõi số animation đã hoàn thành
            let completedAnimations = 0;
            const totalAnimations = targets.length;

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

                            // Gọi callback của user trước
                            if (onComplete && typeof onComplete === 'function') {
                                onComplete();
                            } else {
                                console.error('AnimationManager: Không có callback được gọi');
                            }

                            // Sau đó gọi completeAnimation để reset trạng thái và xử lý queue tiếp
                            this.completeAnimation();
                        }
                    }
                });
            });
        });
    }


    startGameOverAnimation(deck, onComplete) {
        this.addToQueue(10, () => {
            let currentIndex = 0;
            const totalCards = deck.length;

            // Sử dụng Phaser Timer thay vì setTimeout
            const timer = this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    if (currentIndex >= totalCards) {
                        // Đã destroy hết thẻ, dừng timer và hiển thị dialog game over
                        timer.destroy();
                        if (onComplete && typeof onComplete === 'function') {
                            onComplete();
                        } else {
                            console.error('AnimationManager: Không có callback được gọi');
                        }
                        this.completeAnimation();
                        return;
                    }

                    const card = deck[currentIndex];

                    if (card && card.ProgressDestroy) {
                        card.ProgressDestroy();
                        console.log(`GameManager: Destroying card ${card.name || card.type} at index ${currentIndex}`);
                    }

                    currentIndex++;
                },
                loop: true
            });
        });
    }

    startSwapCardsAnimation(form, to, onComplete) {
        this.addToQueue(8, () => {

        });
        const cardForm = this.scene.gameManager.cardManager.getCard(form);
        const cardTo = this.scene.gameManager.cardManager.getCard(to);
        // đổi frame hoặc texture ở mặt sau/mặt trước
        this.scene.gameManager.cardManager.swapCard(form, to);

        this.scene.tweens.add({
            targets: [cardForm, cardTo],
            scaleX: 0,
            scaleY: 1.05,
            duration: 150,
            ease: 'Linear',
            onComplete: () => {
                this.scene.tweens.add({
                    targets: [cardTo, cardForm],
                    scaleX: 1,
                    scaleY: 1,
                    duration: 150,
                    ease: 'Linear',
                    onComplete: () => {
                        if (onComplete && typeof onComplete === 'function') {
                            onComplete();
                        } else {
                            console.error('AnimationManager: Không có callback được gọi');
                        }
                        this.completeAnimation();
                    } // callback nếu có
                });
            }
        });

    }

    /**
     * Bắt đầu animation shuffle toàn bộ thẻ trên bàn chơi
     * @param {Function} onComplete - Callback khi animation hoàn thành
     */
    startShuffleAllCardsAnimation(onComplete) {
        this.addToQueue(8, () => {
            const allCards = this.scene.gameManager.cardManager.getAllCards();
            // Tạo animation lật thẻ cho tất cả
            // Bước 1: Lật tất cả thẻ (scaleX = 0)
            this.scene.tweens.add({
                targets: allCards,
                scaleX: 0,
                duration: 150,
                ease: 'Linear',
                onComplete: () => {
                    // Lấy tất cả thẻ hiện tại
                    // Shuffle vị trí sử dụng shuffleArray
                    const allCardShuffledPositions = CalculatePositionCard
                        .shuffleArray(allCards);

                    allCardShuffledPositions.forEach((card, index) => {
                        const newCoordinates = this.scene.gameManager.cardManager.getGridPositionCoordinates(index);
                        card.setPosition(newCoordinates.x, newCoordinates.y);
                        card.index = index;
                    });
                    allCards.sort((a, b) => a.index - b.index);
                    this.scene.gameManager.cardManager.cards = allCards;

                    // Bước 3: Lật lại tất cả thẻ (scaleX = 1)
                    this.scene.tweens.add({
                        targets: allCards,
                        scaleX: 1,
                        duration: 150,
                        ease: 'Linear',
                        onComplete: () => {
                            if (onComplete && typeof onComplete === 'function') {
                                onComplete();
                            } else {
                                console.error('AnimationManager: Không có callback được gọi');
                            }
                            this.completeAnimation();
                        }
                    });
                }
            });
        });
    }

    /**
     * Bắt đầu animation thở lửa với priority 9
     * @param {Function} onComplete - Callback khi animation hoàn thành
     */
    startBreatheFireAnimation(damage, cardList, onComplete) {
        this.addToQueue(12, () => {
            // Logic animation thở lửa sẽ được thêm vào đây
            // Ví dụ: tạo hiệu ứng lửa, animation cho character, etc.
            cardList.forEach(cardIndex => {
                const card = this.scene.gameManager.cardManager.getCard(cardIndex);
                card.takeDamage(damage, 'BreatheFire');
            });
            // Tạm thời sử dụng setTimeout để mô phỏng thời gian animation
            setTimeout(() => {
                // Gọi callback của user trước
                if (onComplete && typeof onComplete === 'function') {
                    onComplete();
                } else {
                    console.error('AnimationManager: Không có callback được gọi');
                }

                // Sau đó gọi completeAnimation để reset trạng thái và xử lý queue tiếp
                this.completeAnimation();
            }, 510); // Giả sử animation thở lửa mất 1 giây
        });
    }

    startExplosiveAnimation(damage, cardList, onComplete) {
        this.addToQueue(9, () => {
            // Logic animation thở lửa sẽ được thêm vào đây
            // Ví dụ: tạo hiệu ứng lửa, animation cho character, etc.
            cardList.forEach(cardIndex => {
                const card = this.scene.gameManager.cardManager.getCard(cardIndex);
                card.takeDamage(damage, 'Explosive');
            });
            // Tạm thời sử dụng setTimeout để mô phỏng thời gian animation
            setTimeout(() => {
                // Gọi callback của user trước
                if (onComplete && typeof onComplete === 'function') {
                    onComplete();
                } else {
                    console.error('AnimationManager: Không có callback được gọi');
                }

                // Sau đó gọi completeAnimation để reset trạng thái và xử lý queue tiếp
                this.completeAnimation();
            }, 510); // Giả sử animation thở lửa mất 1 giây
        });
    }

    /**
     * Bắt đầu animation hiệu ứng item với priority 7
     * @param {string} itemImage - Đường dẫn ảnh của item
     * @param {Function} onComplete - Callback khi animation hoàn thành
     */
    startItemAnimation(itemImage, onComplete) {
        this.addToQueue(7, () => {
            // Lấy kích thước màn hình
            // const screenWidth = this.scene.cameras.main.width;
            // const screenHeight = this.scene.cameras.main.height;
            const { x, y } = this.scene.gameManager.cardManager
                .getGridPositionCoordinates(4);
            // Vị trí tâm màn hình
            const centerX = x;
            const centerY = y;

            // Tạo sprite item tại vị trí tâm màn hình
            const item = this.scene.add.image(centerX, centerY, 'item', itemImage);

            // Đặt z-index cao để hiển thị trên các element khác
            item.setDepth(200);

            // Bắt đầu với scale nhỏ
            item.setScale(0);

            // Tạo hiệu ứng scale từ nhỏ đến to và fade out trong 1 animation
            this.scene.tweens.add({
                targets: item,
                scale: 4.5,
                alpha: 0.1,
                duration: 300,
                ease: 'Power2',
                onComplete: () => {
                    // Xóa sprite sau khi animation hoàn thành
                    item.destroy();

                    // Gọi callback của user trước
                    if (onComplete && typeof onComplete === 'function') {
                        onComplete();
                    } else {
                        console.error('AnimationManager: Không có callback được gọi');
                    }

                    // Sau đó gọi completeAnimation để reset trạng thái và xử lý queue tiếp
                    this.completeAnimation();
                }
            });
        });
    }


    //hàm có đang chưa dc dùng 
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
        if (this.currentAnimation) {
            // Không thể dừng trực tiếp function, nhưng có thể dừng tweens đang chạy
            this.scene.tweens.killAll();
            //console.log('AnimationManager: Đã dừng tất cả tweens');
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
            currentAnimation: this.currentAnimation ? `priority: ${this.currentAnimation.priority}` : null
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
