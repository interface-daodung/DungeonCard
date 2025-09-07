/**
 * Utility để tạo HeaderUI có thể tái sử dụng
 */
export class HeaderUI {
    /**
     * Tạo header UI bao gồm coin display và settings button
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {number} width - Chiều rộng game
     * @param {number} height - Chiều cao game
     * @returns {Object} Object chứa updateCoinDisplay method
     */
    static createHeaderUI(scene, width, height) {
        // Hiển thị số coin từ localStorage
        const totalCoin = localStorage.getItem('totalCoin') || '0';
        const coinDisplay = scene.add.text(width * 0.05, height * 0.05, `🪙 : ${totalCoin}`, {
            fontSize: '32px',
            fill: '#ffffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            stroke: '#000000ff',
            strokeThickness: 2
        });

        // Nút Settings (⚙️) ở góc trên bên phải
        const settingsButton = scene.add.text(width * 0.935, height * 0.065, '⚙️', {
            fontSize: '32px',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5, 0.5); // Căn giữa

        // Làm cho nút settings có thể click được
        settingsButton.setInteractive({ useHandCursor: true });

        // Event hover - xoay 1 vòng
        settingsButton.on('pointerover', () => {
            scene.tweens.add({
                targets: settingsButton,
                rotation: Math.PI * 2, // Xoay 1 vòng (360 độ)
                duration: 500,
                ease: 'Power2'
            });
        });

        // Event click
        settingsButton.on('pointerdown', () => {
            console.log('Settings button được click!');
            // Mở SettingsScene
            scene.scene.start('SettingsScene');
        });

        // Trả về method để cập nhật coin display
        return {
            updateCoinDisplay: (newCoin) => {
                coinDisplay.setText(`🪙 : ${newCoin}`);
            }
        };
    }
}
