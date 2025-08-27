import { SpritesheetCharacter } from '../../utils/SpritesheetCharacter.js';
import Card from '../Card.js';
// Mixin logic cho character cards
export const character = {
    // Logic cho character cards
    /**
     * Tạo card
     */
    createCard() {
        if (this.level > 2) {
            this.cardImage = SpritesheetCharacter.create(this.scene, 0, 0, this.nameId + '-sprite', 160, 274.3);
            // Thêm border trắng 2px cho card với góc bo tròn
            this.border = this.scene.add.graphics();
            this.border.fillStyle(0xdcc06f, 1);
            this.border.lineStyle(2, 0xdcc06f, 1);
            this.border.fillRoundedRect(-82, -139, 164, 278.3, 20);
            this.border.strokeRoundedRect(-82, -139, 164, 278.3, 20);

            this.add([this.border, this.cardImage]);

            // Thêm hiển thị UI cho card
            this.addDisplayHUD();

            // Làm cho card có thể click - sử dụng kích thước đã scale (90x154)
            this.setInteractive(new Phaser.Geom.Rectangle(-80, -137, 160, 274.3), Phaser.Geom.Rectangle.Contains);

            // Events
            this.on('pointerdown', () => this.onCardPointerDown());
            this.on('pointerup', () => this.onCardPointerUp());
            this.on('pointerover', () => this.onCardHover());
            this.on('pointerout', () => this.onCardOut());

        } else {
            Card.prototype.createCard.call(this);
        }
    },
    /**
     * Thêm hiển thị UI cho card
     */
    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.hpDisplay = this.createDisplay({
            fillColor: 0xFF0000,
            text: this.hp.toString()
        }, 'rightTop');
    },
    /**
     * Nhận damage
     * @param {number} damage - Số damage nhận
     */
    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
        this.hpDisplay.updateText(this.hp.toString());
        if (this.hp <= 0) {
            console.log(this.name + ' is defeated!');
        }
    },
    /**
     * Hồi phục HP
     * @param {number} healAmount - Số HP hồi phục
     */
    heal(healAmount) {
        this.hp = Math.min(this.maxHP, this.hp + healAmount);
        this.hpDisplay.setText(this.hp.toString());
    },
    /**
     * Lấy max HP theo level hiện tại
     */
    getMaxHP() {
        console.log('maxHP', this.constructor.DEFAULT.hp);
        return this.constructor.DEFAULT.hp + this.level - 1; // Venti có HP thấp (nhân vật hỗ trợ)
    },
    /**
     * Lấy level hiện tại
     */
    getLevel() {
        // Load level từ localStorage
        const CharacterLevel = localStorage.getItem('CharacterLevel');
        if (CharacterLevel) {
            return JSON.parse(CharacterLevel)[this.nameId] || 1;
        }
        return 1;
    }
};
