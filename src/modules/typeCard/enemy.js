import Card from '../Card.js';
import { SpritesheetWrapper } from '../../utils/SpritesheetWrapper.js';

export default class Enemy extends Card {
    constructor(scene, x, y, index, name, nameId) {
        super(scene, x, y, index, name, nameId, 'enemy');
        this.poisoning = false;
    }

    setPoisoning() {
        this.poisoning = true;
        this.unsubscribeList.push(this.scene.gameManager.emitter
            .on('completeMove', this.PoisoningEffect.bind(this), 6));
    }

    PoisoningEffect() {
        if (this.health > 1) {
            if (this.poisoning) {
                this.takeDamage(1, 'poisoning');
            }
        }
    }

    /**
    * Thêm hiển thị UI cho card
    */
    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.hpDisplay = this.createDisplay({
            fillColor: 0xFF0000,
            text: this.health.toString()
        }, 'rightTop');
    }
    /**
     * Nhận damage từ người chơi
     * @param {number} damage - Lượng damage nhận vào
     */
    takeDamage(damage, type) {
        if (this.health <= 0) {
            return false;
        }
        super.takeDamage(damage, type);
        this.health -= damage;
        this.hpDisplay.updateText(this.health.toString());
        if (type === 'slash') {
            SpritesheetWrapper.animationSlash(this.scene, this.x, this.y);
            this.scene.sound.play('sword-sound');
        }
        this.showPopup(damage, 'damage');
        this.cardImage.setTint(0xe05656);
        setTimeout(() => {
            this.cardImage.clearTint();
        }, 200);
        if (this.health <= 0) {
            this.die();
        }
        return damage;
    }

    showPopup(amount, type = 'heal') {
        // Xác định màu và dấu dựa trên type
        let color, prefix;
        if (type === 'heal') {
            color = '#00ff00'; // Màu xanh lá
            prefix = '+';
        } else if (type === 'damage') {
            color = '#ff0000'; // Màu đỏ
            prefix = '-';
        } else {
            color = '#ffffff'; // Màu trắng mặc định
            prefix = '';
        }

        // Tạo text popup tại vị trí tương đối (0,0) của character
        const popupText = this.scene.add.text(0, 0, `${prefix}${amount}`, {
            fontSize: '32px',
            fill: color,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#000000', // Viền đen để dễ đọc
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(2002);

        // Thêm text vào character để nó di chuyển theo
        this.add(popupText);

        // Tạo animation popup
        this.scene.tweens.add({
            targets: popupText,
            y: -50, // Di chuyển lên trên (tương đối với character)
            alpha: 0.1, // Mờ dần
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                // Xóa text sau khi animation hoàn thành
                popupText.destroy();
            }
        });
    }
    /**
     * Hiệu ứng khi card được kích hoạt
     */
    CardEffect() {
        console.log(this.name + ' đang chạy hiệu ứng...');
        console.log('this.scene.gameManager.cardManager.CardCharacter.weapon---------', this.scene.gameManager.cardManager.CardCharacter.weapon);
        if (this.scene.gameManager.cardManager.CardCharacter.weapon?.durability > 0) {
            const actualDamage = Math.min(this.scene.gameManager.cardManager.CardCharacter.weapon.durability, this.health);
            this.scene.gameManager.cardManager.CardCharacter.reduceDurability(actualDamage);
            this.takeDamage(actualDamage, 'slash');
            return true;
        }
        // Logic khi card được kích hoạt (nếu có)
        this.scene.gameManager.addCoin(this.score);
        if (this.scene.gameManager.cardManager.CardCharacter.takeDamage(this.health) === 0) {
            return true;
        }
        return false;
    }
}

