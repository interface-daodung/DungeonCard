/**
 * Utility class để tạo gradient button đẹp mắt có thể tái sử dụng
 */
export class GradientButton {
    /**
     * Tạo gradient button với text
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {string} text - Nội dung text trên button
     * @param {number} x - Vị trí X
     * @param {number} y - Vị trí Y
     * @param {number} width - Chiều rộng button
     * @param {number} height - Chiều cao button
     * @param {Array} colors - Mảng các màu hex cho gradient
     * @param {string} buttonKey - Key duy nhất cho button (tự động nếu không truyền)
     * @returns {Phaser.GameObjects.Image} Image object của gradient button với buttonText và buttonContainer properties
     */
    static createGradientButton(scene, text, x, y, width, height, colors = [ '#ffb3d9','#45162c', '#96576a'], buttonKey = null) {
        // Tạo key cố định theo text và kích thước để tái sử dụng
        const key = buttonKey || `gradientButton_${text}_${width}x${height}`;
        const radius = 8;

        if (!scene.textures.exists(key)) {
            const texture = scene.textures.createCanvas(key, width, height);
            const context = texture.getContext();
    
            // Gradient top → bottom
            const gradient = context.createLinearGradient(0, 0, 0, height);
            const step = 1 / (colors.length - 1);
            colors.forEach((color, i) => {
                gradient.addColorStop(i * step, color);
            });
    
            // Hàm vẽ rounded rect
            function drawRoundedRect(context, x, y, w, h, r) {
                context.beginPath();
                context.moveTo(x + r, y);
                context.lineTo(x + w - r, y);
                context.quadraticCurveTo(x + w, y, x + w, y + r);
                context.lineTo(x + w, y + h - r);
                context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                context.lineTo(x + r, y + h);
                context.quadraticCurveTo(x, y + h, x, y + h - r);
                context.lineTo(x, y + r);
                context.quadraticCurveTo(x, y, x + r, y);
                context.closePath();
            }
    
            // Vẽ nút nền
            drawRoundedRect(context, 0, 0, width, height, radius);
            context.fillStyle = gradient;
            context.fill();
    
            // Vẽ viền
            context.lineWidth = 4;
            context.strokeStyle = "#1f0614";
            context.stroke();
    
            texture.refresh();
        }
        // Tạo button image
        const button = scene.add.image(x, y, key).setOrigin(0.5);

        // Thêm text trắng với viền đen bold
        const buttonText = scene.add.text(x, y, text, {
            fontSize: `${Math.max(16, Math.floor(height * 0.5))}px`,
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: Math.max(2, Math.floor(height * 0.05))
        }).setOrigin(0.5);

        // Tạo container để group button và text
        const buttonContainer = scene.add.container(x, y);
        buttonContainer.add([button, buttonText]);

        // Trả về button image để có thể setInteractive dễ dàng
        // và gán buttonText như một property để có thể truy cập sau này
        button.buttonText = buttonText;
        button.buttonContainer = buttonContainer;
        
        // Thêm interactive và hover effects
        button.setInteractive()
            .on('pointerover', () => {
                button.setTint(0xd1d1d1); // phủ màu vàng nhạt
            })
            .on('pointerout', () => {
                button.clearTint(); // trả về màu gốc
            });
        
        return button;
    }

    /**
     * Tạo gradient button với preset màu ruby
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {string} text - Nội dung text trên button
     * @param {number} x - Vị trí X
     * @param {number} y - Vị trí Y
     * @param {number} width - Chiều rộng button
     * @param {number} height - Chiều cao button
     * @returns {Phaser.GameObjects.Image} Image object của gradient button với buttonText và buttonContainer properties
     */
    static createRubyButton(scene, text, x, y, width, height) {
        return this.createGradientButton(scene, text, x, y, width, height, ['#ffb3d9', '#96576a']);
    }

    /**
     * Tạo gradient button với preset màu gold
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {string} text - Nội dung text trên button
     * @param {number} x - Vị trí X
     * @param {number} y - Vị trí Y
     * @param {number} width - Chiều rộng button
     * @param {number} height - Chiều cao button
     * @returns {Phaser.GameObjects.Image} Image object của gradient button với buttonText và buttonContainer properties
     */
    static createGoldButton(scene, text, x, y, width, height) {
        return this.createGradientButton(scene, text, x, y, width, height, ['#ffd700', '#ffb347', '#daa520']);
    }

    /**
     * Tạo gradient button với preset màu blue
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {string} text - Nội dung text trên button
     * @param {number} x - Vị trí X
     * @param {number} y - Vị trí Y
     * @param {number} width - Chiều rộng button
     * @param {number} height - Chiều cao button
     * @returns {Phaser.GameObjects.Image} Image object của gradient button với buttonText và buttonContainer properties
     */
    static createBlueButton(scene, text, x, y, width, height) {
        return this.createGradientButton(scene, text, x, y, width, height, ['#87ceeb', '#4682b4', '#191970']);
    }

    /**
     * Tạo gradient button với preset màu green
     * @param {Phaser.Scene} scene - Scene hiện tại
     * @param {string} text - Nội dung text trên button
     * @param {number} x - Vị trí X
     * @param {number} y - Vị trí Y
     * @param {number} width - Chiều rộng button
     * @param {number} height - Chiều cao button
     * @returns {Phaser.GameObjects.Image} Image object của gradient button với buttonText và buttonContainer properties
     */
    static createGreenButton(scene, text, x, y, width, height) {
        return this.createGradientButton(scene, text, x, y, width, height, ['#90ee90', '#32cd32', '#228b22']);
    }
}
