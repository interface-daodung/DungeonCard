import Phaser from 'phaser';
import { assetManager } from '../core/AssetManager.js';

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    init(data) {
        const { targetScene, dataTargetScene } = data || {};
        this.targetScene = targetScene || 'MenuScene';
        this.dataTargetScene = dataTargetScene || {};
    }
    
    preload() {
        // load assets ở đây (nếu cần)
    }

    create() {
        const { width, height } = this.scale;

        // Background đơn giản
        this.add.rectangle(width / 2, height / 2, width, height, 0x96576a);

        // Icon loading ⏳ ở giữa màn hình
        const loadingIcon = this.add.text(width / 2 - 120, height * 0.5, '⏳', {
            fontSize: '64px',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        // Text "loading . . ." bên dưới icon
        const loadingText = this.add.text(width / 2 - 60, height * 0.5 - 28, 'loading . . .', {
            fontSize: '48px',
            fontWeight: 'bold',
            stroke: '#000000ff',
            fill: '#ecf0f1',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0);

        // Progress bar giả với text blocks
        const progressText = this.add.text(width / 2, height * 0.6, '▱▱▱▱▱▱▱▱▱▱', {
            fontSize: '48px',
            fontFamily: 'Arial, sans-serif',
            fill: '#622945'
        }).setOrigin(0.5);

        // Animation rotation cho icon ⏳
        this.tweens.add({
            targets: loadingIcon,
            rotation: Math.PI * 2, // Xoay 360 độ
            duration: 1500,
            repeat: -1, // Lặp vô hạn
            repeatDelay: 1500, // Delay 1.5 giây sau mỗi vòng
            ease: 'Linear'
        });

        // Animation cho text "loading . . ." và progress bar
        let dotCount = 0;
        let currentProgress = 0;
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                // Progress bar giả - mỗi 1 giây thêm 1 block
                if (currentProgress < 9) { // Dừng ở 90% (9/10 blocks)
                    currentProgress++;
                    const filled = '▰'.repeat(currentProgress);
                    const empty = '▱'.repeat(10 - currentProgress);
                    progressText.setText(filled + empty);
                }

                // Animation dấu chấm
                dotCount = (dotCount + 1) % 4;
                const dots = '.'.repeat(dotCount);
                loadingText.setText(`loading ${dots}`);
            },
            loop: true
        });

        // Load assets sau khi UI đã hiển thị
        // Delay một chút để create() hoàn thành và UI hiển thị
        assetManager.setScene(this);
        assetManager.preloadSceneAssets(this.targetScene, () => {
            // Callback khi load xong - chuyển scene
            this.scene.start(this.targetScene, this.dataTargetScene);
        });

    }
}
