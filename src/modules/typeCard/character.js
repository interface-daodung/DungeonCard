import Card from '../Card.js';
import { SpritesheetWrapper } from '../../utils/SpritesheetWrapper.js';

export default class Character extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'character');

        this.level = this.getLevel();
        this.hp = this.getMaxHP();

        this.weapon = null;
    }
    /**
     * Tạo card
     */

    createCard() {
        if (this.level > 2) {
            this.cardImage = SpritesheetWrapper.CharacterAnimation(this.scene, 0, 0, this.nameId + '-sprite', 160, 274.3);
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
            super.createCard();
        }
    }
    /**
     * Thêm hiển thị UI cho card
     */
    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.hpDisplay = this.createDisplay({
            fillColor: 0xFF0000,
            text: this.hp.toString()
        }, 'rightTop');
        // Thêm hiển thị UI cho vũ khí
        this.weaponDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.weapon?.durability || 0
        }, 'leftBottom');
        this.weaponBadgeDisplay = this.createBadgeDisplay();
    }
    /**
     * Nhận damage
     * @param {number} damage - Số damage nhận
     */
    takeDamage(damage, type) {
        super.takeDamage(damage, type);
        this.hp = Math.max(0, this.hp - damage);
        this.hpDisplay.updateText(this.hp.toString());
        if (this.hp <= 0) {
            this.scene.gameManager.gameOver();
        }
        return this.hp;
    }
    /**
     * Hồi phục HP
     * @param {number} healAmount - Số HP hồi phục
     */
    heal(healAmount) {
        this.hp = Math.min(this.getMaxHP(), this.hp + healAmount);
        this.hpDisplay.updateText(this.hp.toString());
    }
    /**
     * Lấy max HP theo level hiện tại
     */
    getMaxHP() {
        console.log('maxHP', this.constructor.DEFAULT.hp);
        return this.constructor.DEFAULT.hp + this.level - 1; // Venti có HP thấp (nhân vật hỗ trợ)
    }
    /**
     * Lấy level hiện tại
     */
    getLevel() {
        // Load level từ localStorage
        const CharacterLevel = localStorage.getItem('characterLevel');
        if (CharacterLevel) {
            console.log('CharacterLevel', JSON.parse(CharacterLevel)[this.nameId]);
            return JSON.parse(CharacterLevel)[this.nameId] || 1;
        }
        return 1;
    }
    /**
     * Thiết lập vũ khí
     * @param {object} weapon - Vũ khí
     */
    setWeapon(weapon) {
        console.log('weapon---------', weapon);
        if(weapon.durability > this.weapon?.durability){
            this.weapon = weapon;
        this.weaponDisplay.updateText(this.weapon.durability);
        this.weaponBadgeDisplay.updateTexture(this.weapon.default.id + '-badge');
        this.scene.sellButton.updateButton();
        } else {
            this.scene.gameManager.addCoin(weapon.durability);
        }
      
    }
    /**
     * Tạo display badge
     * @param {string} texture - Texture của badge
     * @returns {object} - Object chứa các method tiện ích
     */
    createBadgeDisplay(texture = '') {
        // Tạo text hiển thị
        const badgeDisplay = this.scene.add.image(0, 0, texture)
            .setOrigin(0.5) // Căn giữa text
            .setPosition(40, 96)
            .setDisplaySize(10, 10);
        this.add(badgeDisplay);
        // Kiểm tra nếu text ban đầu là 0 thì ẩn display
        if (texture === '') {
            badgeDisplay.setVisible(false);
        }

        // Trả về object chứa tất cả thành phần để dễ quản lý
        return {
            // Thêm method tiện ích để cập nhật
            updateTexture: (newTexture) => {
                if (badgeDisplay && badgeDisplay.setTexture) {
                    if (this.weapon) {
                        badgeDisplay.setTexture('weapon-' + this.weapon.default.category + '-badge', newTexture);
                    } else {
                        badgeDisplay.setTexture(newTexture);
                    }
                    // Kiểm tra nếu text mới là 0 thì ẩn display, ngược lại thì hiện
                    if (newTexture === '') {
                        badgeDisplay.setVisible(false);
                    } else {
                        badgeDisplay.setVisible(true);
                    }
                }
            },
            destroy: () => {
                if (badgeDisplay && badgeDisplay.destroy) {
                    badgeDisplay.destroy();
                }
            }
        };
    }

    /**
     * Thiết lập vũ khí mặc định
     */
    reduceDurability(damage) {
        this.weapon.durability -= damage;
        this.weaponDisplay.updateText(this.weapon.durability);
        if (this.weapon.durability <= 0) {
            this.weapon = null;
            this.weaponDisplay.updateText(0);
            this.weaponBadgeDisplay.updateTexture('');
            this.scene.sellButton.hideButton();
        } else {
            this.scene.sellButton.updateButton();
        }
    }


    /**
     * Thực hiện bán vũ khí
     */

}


