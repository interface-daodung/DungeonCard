// Coin.js - Thẻ coin
// Chức năng: Thẻ coin cho điểm số

import Card from '../../modules/Card.js';

export default class Coin extends Card {
    static DEFAULT = {
        type: 'coin',
        rarity: 1,
        name: {
            pyro: 'Mảnh Vỡ Nguyên Tố Hỏa',
            hydro: 'Mảnh Vỡ Nguyên Tố Thủy',
            geo: 'Mảnh Vỡ Nguyên Tố Nham',
            anemo: 'Mảnh Vỡ Nguyên Tố Phong',
            electro: 'Mảnh Vỡ Nguyên Tố Lôi',
            cryo: 'Mảnh Vỡ Nguyên Tố Băng',
            dendro: 'Mảnh Vỡ Nguyên Tố Thảo'
        },
        id: {
            pyro: 'pyro-fragment',
            hydro: 'hydro-fragment',
            geo: 'geo-fragment',
            anemo: 'anemo-fragment',
            electro: 'electro-fragment',
            cryo: 'cryo-fragment',
            dendro: 'dendro-fragment'
        },
        description: {
            pyro: 'Mảnh Vỡ Nguyên Tố Hỏa nhặt có thể đổi Xu và hồi chút năng lượng.',
            hydro: 'Mảnh Vỡ Nguyên Tố Thủy nhặt có thể đổi Xu và hồi chút năng lượng.',
            geo: 'Mảnh Vỡ Nguyên Tố Nham nhặt có thể đổi Xu và hồi chút năng lượng.',
            anemo: 'Mảnh Vỡ Nguyên Tố Phong nhặt có thể đổi Xu và hồi chút năng lượng.',
            electro: 'Mảnh Vỡ Nguyên Tố Lôi nhặt có thể đổi Xu và hồi chút năng lượng.',
            cryo: 'Mảnh Vỡ Nguyên Tố Băng nhặt có thể đổi Xu và hồi chút năng lượng.',
            dendro: 'Mảnh Vỡ Nguyên Tố Thảo nhặt có thể đổi Xu và hồi chút năng lượng.',
            resonance: {
                pyro: 'Nguyên Tố Cộng Hưởng Hỏa nhặt có thể đổi Xu và hồi nhiều năng lượng.',
                hydro: 'Nguyên Tố Cộng Hưởng Thủy nhặt có thể đổi Xu và hồi nhiều năng lượng.',
                geo: 'Nguyên Tố Cộng Hưởng Nham nhặt có thể đổi Xu và hồi nhiều năng lượng.',
                anemo: 'Nguyên Tố Cộng Hưởng Phong nhặt có thể đổi Xu và hồi nhiều năng lượng.',
                electro: 'Nguyên Tố Cộng Hưởng Lôi nhặt có thể đổi Xu và hồi nhiều năng lượng.',
                cryo: 'Nguyên Tố Cộng Hưởng Băng nhặt có thể đổi Xu và hồi nhiều năng lượng.',
                dendro: 'Nguyên Tố Cộng Hưởng Thảo nhặt có thể đổi Xu và hồi nhiều năng lượng.'
            }
        }
    };
    constructor(scene, x, y, index, element) {
        // Kiểm tra element có tồn tại trong DEFAULT không

        if (!Coin.DEFAULT.id[element]) {
            throw new Error(`Element '${element}' không tồn tại trong Coin.DEFAULT.id. Các element hợp lệ: ${Object.keys(Coin.DEFAULT.id).join(', ')}`);
        }

        super(scene, x, y, index,
            Coin.DEFAULT.name[element],
            Coin.DEFAULT.id[element],
            Coin.DEFAULT.type);

        this.score = this.GetRandom(1, 9); // Điểm từ 1-9
        this.rarity = Coin.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = Coin.DEFAULT.description[element];
        //để báo hiệu card đã sẵn sàng
        this.createCard();
        scene.add.existing(this);
    }

    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.coinDisplay = this.createDisplay({
            fillColor: 0xff6600,
            text: this.score.toString()
        }, 'rightBottom');
    }

    setScore(score) {
        this.score = score;
        this.coinDisplay.updateText(this.score);
    }

    /**
     * Override CardEffect để xử lý logic riêng của Coin
     */
    CardEffect() {
        if (this.nameId.endsWith('resonance')) {
            this.scene.gameManager.addCoin(this.score, 3);
        } else {
            this.scene.gameManager.addCoin(this.score, 1);
        }
        return false;
    }

    resonance() {
        this.score *= 2;
        this.name = this.name.replace('Mảnh Vỡ Nguyên Tố', 'Nguyên Tố Cộng Hưởng');
        this.nameId = this.nameId.replace('fragment', 'resonance');
        this.description = Coin.DEFAULT.description.resonance[this.nameId.replace('-resonance', '')];
        this.cardImage.setTexture(this.type, this.nameId);
        this.coinDisplay.updateText(this.score);
        this.processCreation();
    }
}
