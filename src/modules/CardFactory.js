// CardFactory.js - Factory để tạo và quản lý các thẻ
// Chức năng: Tạo thẻ ngẫu nhiên và quản lý tất cả loại thẻ

import Card from './Card.js';
import Coin from '../models/cards/Coin.js';
import dungeonList from '../data/dungeonList.json';

// Character classes
import Eula from '../models/cards/character/Eula.js';
import Furina from '../models/cards/character/Furina.js';
import Mavuika from '../models/cards/character/Mavuika.js';
import Nahida from '../models/cards/character/Nahida.js';
import Raiden from '../models/cards/character/Raiden.js';
import Venti from '../models/cards/character/Venti.js';
import Zhongli from '../models/cards/character/Zhongli.js';

// Weapon classes
import SwordSteampunk from '../models/cards/weapon/SwordSteampunk.js';
import SwordForest from '../models/cards/weapon/SwordForest.js';
import SwordSkyward from '../models/cards/weapon/SwordSkyward.js';
import SwordSplendor from '../models/cards/weapon/SwordSplendor.js';
import SwordTraveler from '../models/cards/weapon/SwordTraveler.js';
import SwordSacrificial from '../models/cards/weapon/SwordSacrificial.js';

// Additional Enemy classes (thực tế có)
import AnemoSamachurl from '../models/cards/enemy/AnemoSamachurl.js';
import ElectroSamachurl from '../models/cards/enemy/ElectroSamachurl.js';
import DendroSamachurl from '../models/cards/enemy/DendroSamachurl.js';
import GeoSamachurl from '../models/cards/enemy/GeoSamachurl.js';
import HydroSamachurl from '../models/cards/enemy/HydroSamachurl.js';
import HilichurlFighter from '../models/cards/enemy/HilichurlFighter.js';
import HilistrayWater from '../models/cards/enemy/HilistrayWater.js';
import WoodenShieldwall from '../models/cards/enemy/WoodenShieldwall.js';
import Lawachurl from '../models/cards/enemy/Lawachurl.js';
import RockShieldwall from '../models/cards/enemy/RockShieldwall.js';
import Berserker from '../models/cards/enemy/Berserker.js';
import Blazing from '../models/cards/enemy/Blazing.js';
import IceShieldwall from '../models/cards/enemy/IceShieldwall.js';
import Shooter from '../models/cards/enemy/Shooter.js';
import Crackling from '../models/cards/enemy/Crackling.js';
import CryoShooter from '../models/cards/enemy/CryoShooter.js';
import ElectroShooter from '../models/cards/enemy/ElectroShooter.js';

// Food classes (thực tế có)
import LifeEssence from '../models/cards/food/LifeEssence.js';
import MystiqueSoup from '../models/cards/food/MystiqueSoup.js';
import Pizza from '../models/cards/food/Pizza.js';
import RoastChicken from '../models/cards/food/RoastChicken.js';
import Macarons from '../models/cards/food/Macarons.js';

// Trap classes (thực tế có)
import AbyssCall from '../models/cards/trap/AbyssCall.js';
import Quicksand from '../models/cards/trap/Quicksand.js';
import BreatheFire from '../models/cards/trap/BreatheFire.js';

// Treasure classes (thực tế có)
import Chest from '../models/cards/treasure/Chest.js';
import Bribery from '../models/cards/treasure/Bribery.js';
import GoldMine from '../models/cards/treasure/GoldMine.js';

// Bomb classes
import Explosive from '../models/cards/bomb/Explosive.js';

// Empty classes
import Empty from '../models/cards/Empty.js';

class CardFactory {
    constructor() {
        // Ngăn không cho tạo instance trực tiếp
        if (CardFactory.instance) {
            return CardFactory.instance;
        }

        // Character classes
        this.characterClasses = {
            'eula': Eula,
            'furina': Furina,
            'mavuika': Mavuika,
            'nahida': Nahida,
            'raiden': Raiden,
            'venti': Venti,
            'zhongli': Zhongli,
        };

        this.cardClasses = {
            // Coin cards
            'Coin': Coin,

            // Weapon cards
            'SwordSteampunk': SwordSteampunk,
            'SwordForest': SwordForest,
            'SwordSkyward': SwordSkyward,
            'SwordSplendor': SwordSplendor,
            'SwordTraveler': SwordTraveler,
            'SwordSacrificial': SwordSacrificial,

            // Enemy cards - Hilichurl
            'AnemoSamachurl': AnemoSamachurl,
            'ElectroSamachurl': ElectroSamachurl,
            'DendroSamachurl': DendroSamachurl,
            'GeoSamachurl': GeoSamachurl,
            'HydroSamachurl': HydroSamachurl,
            'HilichurlFighter': HilichurlFighter,
            'HilistrayWater': HilistrayWater,
            'WoodenShieldwall': WoodenShieldwall,
            'Lawachurl': Lawachurl,
            'RockShieldwall': RockShieldwall,
            'Berserker': Berserker,
            'Blazing': Blazing,
            'IceShieldwall': IceShieldwall,
            'Shooter': Shooter,
            'Crackling': Crackling,
            'CryoShooter': CryoShooter,
            'ElectroShooter': ElectroShooter,

            // Food cards (thực tế có)
            'LifeEssence': LifeEssence,
            'MystiqueSoup': MystiqueSoup,
            'Pizza': Pizza,
            'RoastChicken': RoastChicken,
            'Macarons': Macarons,

            // Trap cards (thực tế có)
            'AbyssCall': AbyssCall,
            'BreatheFire': BreatheFire,
            'Quicksand': Quicksand,

            // Treasure cards (thực tế có)
            'Chest': Chest,
            'Bribery': Bribery,
            'GoldMine': GoldMine,

            // Bomb cards
            'Explosive': Explosive,

            // Empty cards
            'Empty': Empty,

        };

        // Hệ thống Rarity-based với data từ dungeonList.json
        this.stageCardPools = {};
        
        // Chuyển đổi dungeonList thành stageCardPools format
        dungeonList.forEach(dungeon => {
            this.stageCardPools[dungeon.stageId] = {
                name: dungeon.name,
                typeRatios: dungeon.typeRatios,
                availableCards: dungeon.availableCards
            };
        });

        // Màn chơi hiện tại (có thể thay đổi động)
        this.currentStage = 'dungeon_abyss_chamber';

        this.element = 'cryo';

        // Cache để tối ưu hiệu suất
        this._cachedCardWeights = null;

        // Lưu instance singleton
        CardFactory.instance = this;
    }

    /**
     * Phương thức static để lấy instance singleton
     * @returns {CardFactory} Instance duy nhất của CardFactory
     */
    static getInstance() {
        if (!CardFactory.instance) {
            CardFactory.instance = new CardFactory();
        }
        return CardFactory.instance;
    }


    /**
     * Tính toán cardWeights từ Rarity và type ratios (cache để tối ưu)
     * @returns {Object} cardWeights đã được tính toán
     */
    _calculateCardWeights() {
        if (this._cachedCardWeights) {
            return this._cachedCardWeights;
        }

        const cardWeights = {};
        const currentStage = this.stageCardPools[this.currentStage];
        const typeRatios = currentStage.typeRatios;
        const availableCards = currentStage.availableCards;

        // Tính tổng trọng số cho mỗi type
        const typeTotalWeights = {};

        for (const [typeName, typeRatio] of Object.entries(typeRatios)) {
            if (availableCards[typeName]) {
                let typeTotalWeight = 0;

                // Tính tổng trọng số của tất cả thẻ trong type này
                for (const cardName of availableCards[typeName]) {
                    if (this.cardClasses[cardName]) {
                        // Lấy rarity từ class hoặc sử dụng giá trị mặc định
                        const rarity = this.cardClasses[cardName].DEFAULT?.rarity || 3;
                        const weight = rarity * 10;
                        typeTotalWeight += weight;
                    }
                }

                typeTotalWeights[typeName] = typeTotalWeight;
            }
        }

        // Tính trọng số thực tế cho từng thẻ
        for (const [typeName, typeRatio] of Object.entries(typeRatios)) {
            if (availableCards[typeName] && typeTotalWeights[typeName]) {
                for (const cardName of availableCards[typeName]) {
                    if (this.cardClasses[cardName]) {
                        // Lấy rarity từ class hoặc sử dụng giá trị mặc định
                        const rarity = this.cardClasses[cardName].DEFAULT?.rarity || 3;
                        const baseWeight = rarity * 10;

                        // Tính trọng số thực tế = (trọng số cơ bản / tổng trọng số type) * tỷ lệ type
                        const actualWeight = (baseWeight / typeTotalWeights[typeName]) * typeRatio;
                        cardWeights[cardName] = actualWeight;
                    }
                }
            }
        }

        this._cachedCardWeights = cardWeights;
        return cardWeights;
    }

    /**
     * Tạo thẻ ngẫu nhiên
     * @param {Object} scene - Scene của Phaser
     * @param {number} x - Vị trí x
     * @param {number} y - Vị trí y
     * @param {number} index - Index của thẻ
     * @returns {Card} Thẻ ngẫu nhiên
     */
    createRandomCard(scene, x, y, index) {
        const cardWeights = this._calculateCardWeights();

        // Tính tổng trọng số thực tế
        const totalWeight = Object.values(cardWeights).reduce((sum, weight) => sum + weight, 0);

        // Nếu không có thẻ nào có sẵn, return null
        if (totalWeight === 0) {
            console.warn('CardFactory: Không có thẻ nào có sẵn trong màn chơi hiện tại');
            return null;
        }

        const random = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (const [cardType, weight] of Object.entries(cardWeights)) {
            cumulativeWeight += weight;
            if (random <= cumulativeWeight) {
                // Nếu là Coin, tạo Coin động dựa trên elementCoin
                if (cardType === 'Coin') {
                    return this.createCoin(scene, x, y, index);
                }
                const card = new this.cardClasses[cardType](scene, x, y, index);
                console.log('card', card);
                return card;
            }
        }

        // Fallback về thẻ cuối cùng nếu có lỗi làm tròn
        const lastCardType = Object.keys(cardWeights)[Object.keys(cardWeights).length - 1];
        if (lastCardType === 'Coin') {
            console.warn('Fallback lỗi : ', lastCardType);
            return this.createCoin(scene, x, y, index);
        }
        return new this.cardClasses[lastCardType](scene, x, y, index);
    }

    /**
     * Tạo thẻ theo loại   ////  có thể xóa sau này
     * @param {string} cardType - Loại thẻ
     * @param {Object} scene - Scene của Phaser
     * @param {number} x - Vị trí x
     * @param {number} y - Vị trí y
     * @param {number} index - Index của thẻ
     * @returns {Card} Thẻ được tạo
     */
    createCard(cardType, scene, x, y, index) {
        if (this.cardClasses[cardType]) {
            return new this.cardClasses[cardType](scene, x, y, index);
        }
        throw new Error(`Unknown card type: ${cardType}`);
    }

    /**
     * Tạo Coin động dựa trên elementCoin của Warrior
     * @param {Object} scene - Scene của Phaser
     * @param {number} x - Vị trí x
     * @param {number} y - Vị trí y
     * @param {number} index - Index của thẻ
     * @returns {Card} Thẻ Coin động
     */
    createCoin(scene, x, y, index) {
        const coin = new Coin(scene, x, y, index, this.element);
        return coin;
    }

    /**
     * Tạo nhân vật dựa trên localStorage hoặc mặc định là Eula
     * @param {Object} scene - Scene của Phaser
     * @param {number} x - Vị trí x
     * @param {number} y - Vị trí y
     * @param {number} index - Index của thẻ
     * @returns {Card} Thẻ nhân vật được tạo
     */
    createCharacter(scene, x, y, index) {
        const nameId = localStorage.getItem('selectedCharacter');

        // Nếu null hoặc không tìm thấy, mặc định là eula
        if (!nameId) {
            this.element = Eula.DEFAULT.element;
            return new Eula(scene, x, y, index);
        }

        // Tìm character class tương ứng
        const characterClass = this.characterClasses[nameId];

        if (characterClass) {
            // Set element từ characterClasses.DEFAULT.element
            this.element = characterClass.DEFAULT.element;
            return new characterClass(scene, x, y, index);
        }

        // Fallback về Eula nếu không tìm thấy
        this.element = Eula.DEFAULT.element;
        return new Eula(scene, x, y, index);
    }



    //--------------nhưng hàm có thể sau này xóa nếu ko dùng đến ---------------------------

    /**
     * Lấy danh sách tất cả DEFAULT của card classes
     * @returns {Array} Danh sách các DEFAULT object của card classes
     */
    getAllCardDefault() {
        return Object.values(this.cardClasses).map(cardClass => cardClass.DEFAULT);
    }

    /**
     * Thêm thẻ mới vào màn chơi
     * @param {string} stageKey - Khóa của màn chơi
     * @param {string} typeName - Tên type (enemies, food, weapons, etc.)
     * @param {string} cardName - Tên thẻ
     */
    addCardToStage(stageKey, typeName, cardName) {
        if (!this.stageCardPools[stageKey]) {
            throw new Error(`Màn chơi '${stageKey}' không tồn tại`);
        }

        if (!this.stageCardPools[stageKey].availableCards[typeName]) {
            throw new Error(`Type '${typeName}' không tồn tại trong màn chơi '${stageKey}'`);
        }

        // Thêm thẻ vào màn chơi
        if (!this.stageCardPools[stageKey].availableCards[typeName].includes(cardName)) {
            this.stageCardPools[stageKey].availableCards[typeName].push(cardName);
            this._cachedCardWeights = null; // Reset cache
        }
    }

    /**
     * Xóa thẻ khỏi màn chơi
     * @param {string} stageKey - Khóa của màn chơi
     * @param {string} typeName - Tên type
     * @param {string} cardName - Tên thẻ
     */
    removeCardFromStage(stageKey, typeName, cardName) {
        if (!this.stageCardPools[stageKey]) {
            throw new Error(`Màn chơi '${stageKey}' không tồn tại`);
        }

        if (!this.stageCardPools[stageKey].availableCards[typeName]) {
            throw new Error(`Type '${typeName}' không tồn tại trong màn chơi '${stageKey}'`);
        }

        // Xóa thẻ khỏi màn chơi
        const index = this.stageCardPools[stageKey].availableCards[typeName].indexOf(cardName);
        if (index > -1) {
            this.stageCardPools[stageKey].availableCards[typeName].splice(index, 1);
            this._cachedCardWeights = null; // Reset cache
        }
    }

    /**
     * Cập nhật tỷ lệ type trong màn chơi
     * @param {string} stageKey - Khóa của màn chơi
     * @param {string} typeName - Tên type
     * @param {number} newRatio - Tỷ lệ mới
     */
    updateStageTypeRatio(stageKey, typeName, newRatio) {
        if (!this.stageCardPools[stageKey]) {
            throw new Error(`Màn chơi '${stageKey}' không tồn tại`);
        }

        if (!this.stageCardPools[stageKey].typeRatios[typeName]) {
            throw new Error(`Type '${typeName}' không tồn tại trong màn chơi '${stageKey}'`);
        }

        this.stageCardPools[stageKey].typeRatios[typeName] = newRatio;
        this._cachedCardWeights = null; // Reset cache
    }

    /**
     * Lấy thông tin chi tiết về màn chơi
     * @returns {Object} Thông tin màn chơi
     */
    getStageInfo() {
        return this.stageCardPools;
    }

    /**
     * Lấy tổng trọng số của màn chơi hiện tại
     * @returns {number} Tổng trọng số
     */
    getCurrentStageTotalWeight() {
        const currentStage = this.stageCardPools[this.currentStage];
        return Object.values(currentStage.typeRatios).reduce((total, ratio) => {
            return total + ratio;
        }, 0);
    }

    /**
     * Lấy thông tin về trọng số của các thẻ trong màn chơi hiện tại
     * @returns {Object} Thông tin trọng số
     */
    getCurrentStageCardWeights() {
        const cardWeights = this._calculateCardWeights();
        const currentStage = this.stageCardPools[this.currentStage];

        return {
            stage: currentStage.name,
            typeRatios: currentStage.typeRatios,
            cardWeights: cardWeights,
            totalWeight: this.getCurrentStageTotalWeight()
        };
    }

    /**
     * Thiết lập màn chơi hiện tại
     * @param {string} stageKey - Khóa của màn chơi (stageId từ dungeonList.json)
     */
    setCurrentStage(stageKey) {
        if (this.stageCardPools[stageKey]) {
            this.currentStage = stageKey;
            this._cachedCardWeights = null; // Reset cache
            console.log(`Đã chuyển sang màn chơi: ${this.stageCardPools[stageKey].name}`);
        } else {
            console.warn(`Màn chơi '${stageKey}' không tồn tại, giữ nguyên màn hiện tại`);
        }
    }

}

// Tạo và export instance singleton
const cardFactory = CardFactory.getInstance();
export default cardFactory;
