import cardFactory from '../modules/CardFactory.js';

export default class CardManager {
    constructor(scene) {
        this.scene = scene;
        // Lưới thẻ 3x3
        this.gridSize = 3;
        this.cards = new Array(9).fill(null); // 9 vị trí từ 0-8

        // Kích thước và spacing của card
        this.cardWidth = 160;
        this.cardHeight = 274.3;
        this.spacing = 16;

        // Vị trí bắt đầu của grid - sẽ được khởi tạo sau
        this.gridStartX = 0;
        this.gridStartY = 0;

        // Liên kết đến CardFactory singleton
        this.cardFactory = cardFactory;
        this.cardFactory.setCurrentStage(scene.stageId);
    }

    /**
     * Khởi tạo grid coordinates với kích thước màn hình
     */
    initializeGridCoordinates() {
        if (this.scene && this.scene.scale) {
            const { width, height } = this.scene.scale;
            this.gridStartX = (width - (3 * this.cardWidth + 2 * this.spacing)) / 2;
            this.gridStartY = height * 0.23; // 23% height - giữa màn hình
        } else {
            console.warn('CardManager: Scene or scale not available, using default coordinates');
        }
    }

    /**
 * Thêm card vào vị trí cụ thể trong grid
 * // hàm này chưa dc dùng ở bất cứ đâu
 */
    addCard(card, gridIndex) {
        if (gridIndex >= 0 && gridIndex < 9) {
            this.cards[gridIndex] = card;
        } else {
            console.warn(`CardManager: Invalid grid index ${gridIndex}`);
        }
    }

    /**
 * Lấy card từ vị trí grid
 * // hàm này chưa dc dùng ở bất cứ đâu
 */
    getCard(gridIndex) {
        if (gridIndex >= 0 && gridIndex < 9) {
            return this.cards[gridIndex];
        }
        return null;
    }

    /**
 * Lấy tất cả cards
 * // hàm này chưa dc dùng ở bất cứ đâu
 */
    getAllCards() {
        return this.cards.filter(card => card !== null);
    }

    /**
 * Lấy tọa độ center của vị trí grid
 * // hàm này chưa dc dùng ở bất cứ đâu
 */
    getGridPositionCoordinates(gridIndex) {
        if (gridIndex < 0 || gridIndex >= 9) {
            return null;
        }

        const row = Math.floor(gridIndex / this.gridSize);
        const col = gridIndex % this.gridSize;

        const x = this.gridStartX + col * (this.cardWidth + this.spacing) + this.cardWidth / 2;
        const y = this.gridStartY + row * (this.cardHeight + this.spacing) + this.cardHeight / 2;

        return { x, y };
    }


    /**
     * Khởi tạo và tạo deck với 9 cards
     */
    initializeCreateDeck() {
        // Khởi tạo grid coordinates trước
        this.initializeGridCoordinates();
        // Tạo card nhân vật tại vị trí 4
        const coord_4 = this.getGridPositionCoordinates(4);
        const cardCharacter = this.cardFactory.createCharacter(this.scene, coord_4.x, coord_4.y, 4);
        this.addCard(cardCharacter, 4);
        console.log(`CardManager: Created character card at position (${coord_4.x}, ${coord_4.y})`);

        // Tạo 9 cards mới
        for (let i = 0; i < 9; i++) {
            const coords = this.getGridPositionCoordinates(i);
            if (coords) {
                // Tạo card mới sử dụng CardFactory
                if (i === 4) { continue; }
                const card = this.cardFactory.createRandomCard(this.scene, coords.x, coords.y, i);
                // Thêm card vào vị trí grid
                this.addCard(card, i);

                console.log(`CardManager: Created random card ${i} at position (${coords.x}, ${coords.y})`);
            }
        }

        console.log('CardManager: Deck initialized with 9 random cards');
    }

    /**
     * Lấy index của card có type "character"
     * @returns {number} Index của character card, -1 nếu không tìm thấy
     */
    getCharacterIndex() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] && this.cards[i].type === 'character') {
                //console.log(`CardManager: Tìm thấy character card tại index ${i}`);
                return i;
            }
        }

        console.warn('CardManager: Không tìm thấy character card');
        return -1;
    }

    /**
     * Di chuyển card từ vị trí cũ sang vị trí mới một cách an toàn
     * @param {number} fromIndex - Vị trí cũ
     * @param {number} toIndex - Vị trí mới
     * @returns {boolean} - True nếu di chuyển thành công
     */
    moveCard(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= 9 || toIndex < 0 || toIndex >= 9) {
            console.warn(`CardManager: Invalid indices for move: ${fromIndex} -> ${toIndex}`);
            return false;
        }

        const card = this.cards[fromIndex];
        if (!card) {
            console.warn(`CardManager: No card at position ${fromIndex}`);
            return false;
        }

        // Cập nhật index của card
        card.index = toIndex;

        // Xóa card khỏi vị trí cũ
        this.cards[fromIndex] = null;

        // Thêm card vào vị trí mới
        this.addCard(card, toIndex);

        //console.log(`CardManager: Moved card ${card.type} from ${fromIndex} to ${toIndex}`);
        return true;
    }


    /**
     * Disable tất cả card để tránh nhận sự kiện khi đang di chuyển
     */
    disableAllCards() {
        const allCards = this.getAllCards();
        allCards.forEach(card => {
            if (card && card.disableInteractive) {
                card.disableInteractive();
                //console.log(`CardManager: Disabled card ${card.name} at position ${card.index}`);
            }
        });
        //console.log('CardManager: Disabled all cards');
    }

    /**
     * Enable lại tất cả card sau khi di chuyển hoàn thành
     */
    enableAllCards() {
        const allCards = this.getAllCards();
        allCards.forEach(card => {
            if (card && card.setInteractive) {
                card.setInteractive();
                //console.log(`CardManager: Enabled card ${card.name} at position ${card.index}`);
            }
        });
        //console.log('CardManager: Enabled all cards');
    }
}
