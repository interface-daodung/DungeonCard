import {
    COIN_ASSETS,
    CHARACTER_ASSETS,
    WEAPON_SWORD_ASSETS,
    WEAPON_POLEARM_ASSETS,
    WEAPON_CLAYMORE_ASSETS,
    WEAPON_CATALYST_ASSETS,
    WEAPON_BOW_ASSETS,
    ENEMY_HILICHURL_ASSETS,
    ENEMY_ABYSS_ASSETS,
    ENEMY_SLIME_ASSETS,
    ENEMY_SHROOM_ASSETS,
    ENEMY_AUTOMATONS_ASSETS,
    ENEMY_KAIRAGI_ASSETS,
    ENEMY_EREMITE_ASSETS,
    ENEMY_FATUI_ASSETS,
    ENEMY_BOSS_ASSETS,
    FOOD_ASSETS,
    TRAP_ASSETS,
    TREASURE_ASSETS,
    BOMB_ASSETS,
    EMPTY_CARD,
    ITEM_ASSETS,
    UI_ASSETS,
    ELEMENT_ASSETS
} from '../utils/AssetConstants.js';

export default class AssetManager {
    constructor() {
        if (AssetManager.instance) {
            return AssetManager.instance;
        }
        AssetManager.instance = this;

        this.scene = null;
    }

    /**
     * Set scene reference để có thể load assets
     */
    setScene(scene) {
        this.scene = scene;
    }

    /**
     * Preload assets cho scene cụ thể với callback
     */
    preloadSceneAssets(sceneName, callback) {
        if (!this.scene) {
            console.warn('AssetManager: Scene chưa được set');
            if (callback) callback();
            return;
        }

        // Đăng ký event listener cho load complete
        this.scene.load.on('complete', callback);

        // Thêm assets vào queue
        switch (sceneName) {
            case 'MenuScene':
                this.loadImages([...UI_ASSETS, ...CHARACTER_ASSETS]);
                break;

            case 'GameScene':
                this.loadImages(this.getLoadImagesListGameScene());
                break;

            case 'EquipScene':
                this.loadImages(ITEM_ASSETS);
                break;

            case 'LibraryScene':
            case 'MapScenes':
                this.loadImages([...CHARACTER_ASSETS, ...ELEMENT_ASSETS, ...EMPTY_CARD]);
                break;

            case 'SelectCharacterScene':
                this.loadImages(ELEMENT_ASSETS);
                break;

            default:
                console.warn(`AssetManager: Không tìm thấy scene "${sceneName}"`);
                if (callback) callback();
                return;
        }

        // Bắt đầu load process THỦ CÔNG để tránh race condition
        this.scene.load.start();
    }

    /**
     * Load sprite sheet với logic tự động
     * Nếu key có đuôi "sprite" thì load như sprite sheet
     */
    loadImage(key, path) {
        if (!this.scene.textures.exists(key)) {
            // Kiểm tra nếu key có đuôi "sprite" thì load như sprite sheet
            if (key.endsWith('sprite')) {
                this.scene.load.spritesheet(key, path, {
                    frameWidth: 350,
                    frameHeight: 590
                });
            } else {
                // Nếu không có đuôi "sprite" thì load như image bình thường
                this.scene.load.image(key, path);
                // console.log(`AssetManager: Đã load image ${key} từ ${path}`);
            }
        } else {
            // console.log(`AssetManager: ${key} đã tồn tại`);
        }
    }

    /**
     * Load nhiều file theo danh sách
     * files = [{key, path}, ...]
     * Tự động phát hiện sprite sheet dựa trên đuôi "sprite"
     */
    loadImages(files) {
        files.forEach(file => this.loadImage(file.key, file.path));
    }

    /**
     * Load audio files
     */
    loadAudio(key, path) {
        if (!this.scene.cache.audio.exists(key)) {
            this.scene.load.audio(key, path);
            // console.log(`AssetManager: Đã load audio ${key} từ ${path}`);
        }
    }

    /**
     * Load nhiều audio files
     */
    loadAudios(files) {
        files.forEach(file => this.loadAudio(file.key, file.path));
    }

    /**
     * Lấy danh sách tất cả assets cần load cho GameScene
     */
    getLoadImagesListGameScene() {
        let loadImagesList = [];
        loadImagesList.push(...ITEM_ASSETS);
        // Thêm các loại thẻ vào danh sách
        loadImagesList.push(...COIN_ASSETS);
        loadImagesList.push(...CHARACTER_ASSETS);
        loadImagesList.push(...WEAPON_SWORD_ASSETS);
        loadImagesList.push(...WEAPON_CATALYST_ASSETS);

        // loadImagesList.push(...WEAPON_POLEARM_ASSETS);
        // loadImagesList.push(...WEAPON_CLAYMORE_ASSETS);
        // loadImagesList.push(...WEAPON_BOW_ASSETS);

        loadImagesList.push(...ENEMY_HILICHURL_ASSETS);
        loadImagesList.push(...ENEMY_SLIME_ASSETS);

        // loadImagesList.push(...ENEMY_ABYSS_ASSETS);
        // loadImagesList.push(...ENEMY_SHROOM_ASSETS);
        // loadImagesList.push(...ENEMY_AUTOMATONS_ASSETS);
        // loadImagesList.push(...ENEMY_KAIRAGI_ASSETS);
        // loadImagesList.push(...ENEMY_EREMITE_ASSETS);
        // loadImagesList.push(...ENEMY_FATUI_ASSETS);
        // loadImagesList.push(...ENEMY_BOSS_ASSETS);

        loadImagesList.push(...FOOD_ASSETS);
        loadImagesList.push(...TRAP_ASSETS);
        loadImagesList.push(...TREASURE_ASSETS);
        loadImagesList.push(...BOMB_ASSETS);
        loadImagesList.push(...EMPTY_CARD);

        return loadImagesList;
    }

    
}

// Export singleton instance
export const assetManager = new AssetManager();
