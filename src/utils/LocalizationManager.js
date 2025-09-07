/**
 * Quản lý đa ngôn ngữ cho game
 */
export class LocalizationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('gameLanguage') || 'vi';
        this.translations = {};
        this.loadTranslations();
    }

    /**
     * Load translations từ các file JSON
     */
    loadTranslations() {
        // Vietnamese (default)
        this.translations.vi = {
            // UI Elements
            'menu': '☰',
            'settings': '⚙️',
            'coin': '🪙',
            'high_score': 'High Score',
            'stage': 'Stage',
            'upgrade': 'UPGRADE',
            'sell': 'SELL',
            'buy': 'BUY',
            'start': 'START',
            'continue': 'CONTINUE',
            'back': 'BACK',
            'next': 'NEXT',
            'confirm': 'CONFIRM',
            'cancel': 'CANCEL',
            
            // Game States
            'game_over': 'GAME OVER',
            'victory': 'VICTORY',
            'paused': 'PAUSED',
            'loading': 'LOADING...',
            
            // Character Names
            'raiden': 'Raiden Shogun',
            'zhongli': 'Zhongli',
            'venti': 'Venti',
            'nahida': 'Nahida',
            'furina': 'Furina',
            'eula': 'Eula',
            'mavuika': 'Mavuika',
            
            // Element Names
            'electro': 'Electro',
            'pyro': 'Pyro',
            'hydro': 'Hydro',
            'cryo': 'Cryo',
            'anemo': 'Anemo',
            'geo': 'Geo',
            'dendro': 'Dendro',
            
            // Card Types
            'character': 'Character',
            'coin': 'Coin',
            'weapon': 'Weapon',
            'enemy': 'Enemy',
            'trap': 'Trap',
            'treasure': 'Treasure',
            'food': 'Food',
            'bomb': 'Bomb',
            
            // Settings
            'language': 'Language',
            'theme': 'Theme',
            'sound': 'Sound',
            'music': 'Music',
            'volume': 'Volume'
        };

        // English
        this.translations.en = {
            'menu': '☰',
            'settings': '⚙️',
            'coin': '🪙',
            'high_score': 'High Score',
            'stage': 'Stage',
            'upgrade': 'UPGRADE',
            'sell': 'SELL',
            'buy': 'BUY',
            'start': 'START',
            'continue': 'CONTINUE',
            'back': 'BACK',
            'next': 'NEXT',
            'confirm': 'CONFIRM',
            'cancel': 'CANCEL',
            
            'game_over': 'GAME OVER',
            'victory': 'VICTORY',
            'paused': 'PAUSED',
            'loading': 'LOADING...',
            
            'raiden': 'Raiden Shogun',
            'zhongli': 'Zhongli',
            'venti': 'Venti',
            'nahida': 'Nahida',
            'furina': 'Furina',
            'eula': 'Eula',
            'mavuika': 'Mavuika',
            
            'electro': 'Electro',
            'pyro': 'Pyro',
            'hydro': 'Hydro',
            'cryo': 'Cryo',
            'anemo': 'Anemo',
            'geo': 'Geo',
            'dendro': 'Dendro',
            
            'character': 'Character',
            'coin': 'Coin',
            'weapon': 'Weapon',
            'enemy': 'Enemy',
            'trap': 'Trap',
            'treasure': 'Treasure',
            'food': 'Food',
            'bomb': 'Bomb',
            
            'language': 'Language',
            'theme': 'Theme',
            'sound': 'Sound',
            'music': 'Music',
            'volume': 'Volume'
        };

        // Japanese
        this.translations.ja = {
            'menu': '☰',
            'settings': '⚙️',
            'coin': '🪙',
            'high_score': 'ハイスコア',
            'stage': 'ステージ',
            'upgrade': 'アップグレード',
            'sell': '売却',
            'buy': '購入',
            'start': '開始',
            'continue': '続行',
            'back': '戻る',
            'next': '次へ',
            'confirm': '確認',
            'cancel': 'キャンセル',
            
            'game_over': 'ゲームオーバー',
            'victory': '勝利',
            'paused': '一時停止',
            'loading': '読み込み中...',
            
            'raiden': '雷電将軍',
            'zhongli': '鍾離',
            'venti': 'ヴェンティ',
            'nahida': 'ナヒーダ',
            'furina': 'フリーナ',
            'eula': 'エウルア',
            'mavuika': 'マヴィカ',
            
            'electro': '雷',
            'pyro': '炎',
            'hydro': '水',
            'cryo': '氷',
            'anemo': '風',
            'geo': '岩',
            'dendro': '草',
            
            'character': 'キャラクター',
            'coin': 'コイン',
            'weapon': '武器',
            'enemy': '敵',
            'trap': '罠',
            'treasure': '宝箱',
            'food': '食べ物',
            'bomb': '爆弾',
            
            'language': '言語',
            'theme': 'テーマ',
            'sound': 'サウンド',
            'music': '音楽',
            'volume': '音量'
        };
    }

    /**
     * Lấy text đã dịch
     * @param {string} key - Key của text cần dịch
     * @param {Object} params - Tham số để thay thế trong text
     * @returns {string} Text đã dịch
     */
    t(key, params = {}) {
        let text = this.translations[this.currentLanguage]?.[key] || 
                  this.translations.vi[key] || 
                  key;

        // Thay thế tham số trong text (ví dụ: "High Score: {score}")
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });

        return text;
    }

    /**
     * Thay đổi ngôn ngữ
     * @param {string} language - Mã ngôn ngữ (vi, en, ja)
     */
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('gameLanguage', language);
            
            // Emit event để các component cập nhật
            if (window.gameEvents) {
                window.gameEvents.emit('languageChanged', language);
            }
        }
    }

    /**
     * Lấy danh sách ngôn ngữ có sẵn
     * @returns {Array} Mảng các mã ngôn ngữ
     */
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }

    /**
     * Lấy tên ngôn ngữ theo mã
     * @param {string} code - Mã ngôn ngữ
     * @returns {string} Tên ngôn ngữ
     */
    getLanguageName(code) {
        const names = {
            'vi': 'Tiếng Việt',
            'en': 'English',
            'ja': '日本語'
        };
        return names[code] || code;
    }
}

// Singleton instance
export const localizationManager = new LocalizationManager();

