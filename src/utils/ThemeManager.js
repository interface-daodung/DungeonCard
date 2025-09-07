/**
 * Quản lý theme màu sắc cho game
 */
export class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('gameTheme') || 'default';
        this.themes = {};
        this.loadThemes();
    }

    /**
     * Load các theme có sẵn
     */
    loadThemes() {
        // Default Theme (hiện tại)
        this.themes.default = {
            name: 'Default',
            colors: {
                // Background
                background: '#000000',
                
                // Text colors
                textPrimary: '#ffffff',
                textSecondary: '#d1d1d1',
                textGold: '#FFD700',
                textGoldStroke: '#E69500',
                
                // UI Elements
                buttonPrimary: '#95245b',
                buttonSecondary: '#45162c',
                buttonHover: '#d1d1d1',
                
                // Card colors
                cardBackground: '#2d0d21',
                cardBorder: '#1f0612',
                
                // Gradient colors
                gradientGold: ['#cbbd1bff', '#c57826ff', '#8c3c0eff'],
                gradientButton: ['#ffb3d9', '#45162c', '#96576a'],
                
                // Element colors
                electro: '#9d4edd',
                pyro: '#ff6b35',
                hydro: '#4cc9f0',
                cryo: '#90e0ef',
                anemo: '#80ffdb',
                geo: '#f77f00',
                dendro: '#06ffa5',
                
                // Status colors
                success: '#06ffa5',
                warning: '#ffd60a',
                error: '#ff006e',
                info: '#4cc9f0'
            },
            fonts: {
                primary: 'Arial, sans-serif',
                secondary: 'Arial, sans-serif'
            }
        };

        // Dark Theme
        this.themes.dark = {
            name: 'Dark',
            colors: {
                background: '#0a0a0a',
                textPrimary: '#e0e0e0',
                textSecondary: '#a0a0a0',
                textGold: '#ffd700',
                textGoldStroke: '#b8860b',
                buttonPrimary: '#2c2c2c',
                buttonSecondary: '#1a1a1a',
                buttonHover: '#404040',
                cardBackground: '#1a1a1a',
                cardBorder: '#333333',
                gradientGold: ['#ffd700', '#ff8c00', '#ff4500'],
                gradientButton: ['#404040', '#2c2c2c', '#1a1a1a'],
                electro: '#8a2be2',
                pyro: '#ff4500',
                hydro: '#00bfff',
                cryo: '#87ceeb',
                anemo: '#98fb98',
                geo: '#daa520',
                dendro: '#32cd32',
                success: '#32cd32',
                warning: '#ffa500',
                error: '#ff0000',
                info: '#00bfff'
            },
            fonts: {
                primary: 'Arial, sans-serif',
                secondary: 'Arial, sans-serif'
            }
        };

        // Light Theme
        this.themes.light = {
            name: 'Light',
            colors: {
                background: '#f5f5f5',
                textPrimary: '#333333',
                textSecondary: '#666666',
                textGold: '#b8860b',
                textGoldStroke: '#8b6914',
                buttonPrimary: '#4a90e2',
                buttonSecondary: '#357abd',
                buttonHover: '#6ba3f0',
                cardBackground: '#ffffff',
                cardBorder: '#e0e0e0',
                gradientGold: ['#ffd700', '#ff8c00', '#ff4500'],
                gradientButton: ['#4a90e2', '#357abd', '#2c5aa0'],
                electro: '#9d4edd',
                pyro: '#ff6b35',
                hydro: '#4cc9f0',
                cryo: '#90e0ef',
                anemo: '#80ffdb',
                geo: '#f77f00',
                dendro: '#06ffa5',
                success: '#28a745',
                warning: '#ffc107',
                error: '#dc3545',
                info: '#17a2b8'
            },
            fonts: {
                primary: 'Arial, sans-serif',
                secondary: 'Arial, sans-serif'
            }
        };

        // Cyberpunk Theme
        this.themes.cyberpunk = {
            name: 'Cyberpunk',
            colors: {
                background: '#0d1117',
                textPrimary: '#00ff41',
                textSecondary: '#00cc33',
                textGold: '#ffff00',
                textGoldStroke: '#cccc00',
                buttonPrimary: '#ff0080',
                buttonSecondary: '#800040',
                buttonHover: '#ff3399',
                cardBackground: '#161b22',
                cardBorder: '#00ff41',
                gradientGold: ['#ffff00', '#ff8000', '#ff0000'],
                gradientButton: ['#ff0080', '#800040', '#400020'],
                electro: '#00ffff',
                pyro: '#ff0040',
                hydro: '#0080ff',
                cryo: '#80ffff',
                anemo: '#80ff80',
                geo: '#ff8000',
                dendro: '#80ff00',
                success: '#00ff00',
                warning: '#ffff00',
                error: '#ff0000',
                info: '#00ffff'
            },
            fonts: {
                primary: 'Courier New, monospace',
                secondary: 'Courier New, monospace'
            }
        };

        // Genshin Theme
        this.themes.genshin = {
            name: 'Genshin',
            colors: {
                background: '#1a1a2e',
                textPrimary: '#ffffff',
                textSecondary: '#e0e0e0',
                textGold: '#ffd700',
                textGoldStroke: '#b8860b',
                buttonPrimary: '#4a148c',
                buttonSecondary: '#2e1065',
                buttonHover: '#6a1b9a',
                cardBackground: '#16213e',
                cardBorder: '#0f3460',
                gradientGold: ['#ffd700', '#ff8c00', '#ff4500'],
                gradientButton: ['#4a148c', '#2e1065', '#1a0d2e'],
                electro: '#9d4edd',
                pyro: '#ff6b35',
                hydro: '#4cc9f0',
                cryo: '#90e0ef',
                anemo: '#80ffdb',
                geo: '#f77f00',
                dendro: '#06ffa5',
                success: '#06ffa5',
                warning: '#ffd60a',
                error: '#ff006e',
                info: '#4cc9f0'
            },
            fonts: {
                primary: 'Arial, sans-serif',
                secondary: 'Arial, sans-serif'
            }
        };
    }

    /**
     * Lấy màu theo key
     * @param {string} key - Key của màu
     * @returns {string} Mã màu hex
     */
    getColor(key) {
        return this.themes[this.currentTheme]?.colors[key] || 
               this.themes.default.colors[key] || 
               '#ffffff';
    }

    /**
     * Lấy font theo key
     * @param {string} key - Key của font
     * @returns {string} Font family
     */
    getFont(key) {
        return this.themes[this.currentTheme]?.fonts[key] || 
               this.themes.default.fonts[key] || 
               'Arial, sans-serif';
    }

    /**
     * Lấy toàn bộ theme hiện tại
     * @returns {Object} Theme object
     */
    getCurrentTheme() {
        return this.themes[this.currentTheme] || this.themes.default;
    }

    /**
     * Thay đổi theme
     * @param {string} themeName - Tên theme
     */
    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
            localStorage.setItem('gameTheme', themeName);
            
            // Emit event để các component cập nhật
            if (window.gameEvents) {
                window.gameEvents.emit('themeChanged', themeName);
            }
        }
    }

    /**
     * Lấy danh sách theme có sẵn
     * @returns {Array} Mảng các theme
     */
    getAvailableThemes() {
        return Object.keys(this.themes).map(key => ({
            key,
            name: this.themes[key].name
        }));
    }

    /**
     * Tạo style object cho Phaser text
     * @param {string} styleType - Loại style (title, button, normal, etc.)
     * @returns {Object} Phaser text style object
     */
    getTextStyle(styleType) {
        const styles = {
            title: {
                fontSize: '32px',
                fill: this.getColor('textGold'),
                fontFamily: this.getFont('primary'),
                fontWeight: 'bold',
                stroke: this.getColor('textGoldStroke'),
                strokeThickness: 2
            },
            button: {
                fontSize: '24px',
                fill: this.getColor('textPrimary'),
                fontFamily: this.getFont('primary'),
                fontWeight: 'bold',
                backgroundColor: this.getColor('buttonPrimary'),
                padding: { x: 20, y: 10 }
            },
            normal: {
                fontSize: '20px',
                fill: this.getColor('textPrimary'),
                fontFamily: this.getFont('primary')
            },
            secondary: {
                fontSize: '18px',
                fill: this.getColor('textSecondary'),
                fontFamily: this.getFont('secondary')
            },
            score: {
                fontSize: '20px',
                fill: this.getColor('textPrimary'),
                fontFamily: this.getFont('primary'),
                alpha: 0.8
            }
        };

        return styles[styleType] || styles.normal;
    }
}

// Singleton instance
export const themeManager = new ThemeManager();

