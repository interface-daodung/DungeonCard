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

        this.cardClasses = {};

        // Thêm method add để thêm các class vào cardClasses
        this.cardClasses.add = function (classes) {
            classes.forEach(cls => {
                this[cls.name] = cls;
            });
        };

        // Coin cards
        this.cardClasses.add([Coin]);

        // Weapon cards
        this.weaponClasses = [
            SwordSteampunk,
            SwordForest,
            SwordSkyward,
            SwordSplendor,
            SwordTraveler,
            SwordSacrificial
        ];
        this.cardClasses.add(this.weaponClasses);

        // Enemy cards - Hilichurl
        this.enemyClasses = [
            AnemoSamachurl,
            ElectroSamachurl,
            DendroSamachurl,
            GeoSamachurl,
            HydroSamachurl,
            HilichurlFighter,
            HilistrayWater,
            WoodenShieldwall,
            Lawachurl,
            RockShieldwall,
            Berserker,
            Blazing,
            IceShieldwall,
            Shooter,
            Crackling,
            CryoShooter,
            ElectroShooter
        ];
        this.cardClasses.add(this.enemyClasses);

        // Food cards
        this.foodClasses = [
            LifeEssence,
            MystiqueSoup,
            Pizza,
            RoastChicken,
            Macarons
        ];
        this.cardClasses.add(this.foodClasses);

        // Trap cards
        this.trapClasses = [
            AbyssCall,
            BreatheFire,
            Quicksand
        ];
        this.cardClasses.add(this.trapClasses);

        // Treasure cards
        this.treasureClasses = [
            Chest,
            Bribery,
            GoldMine
        ];
        this.cardClasses.add(this.treasureClasses);

        // Bomb cards
        this.cardClasses.add([Explosive]);

        // Empty cards
        this.cardClasses.add([Empty]);

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
                        // Kiểm tra xem rarity có được định nghĩa trong DEFAULT không
                        if (!this.cardClasses[cardName].DEFAULT?.rarity) {
                            console.error(`CardFactory: Thẻ '${cardName}' không thể được tạo ngẫu nhiên - thiếu thuộc tính rarity trong DEFAULT`);
                            continue; // Bỏ qua thẻ này nhưng không ảnh hưởng đến thẻ khác
                        }

                        // Lấy rarity từ class
                        const rarity = this.cardClasses[cardName].DEFAULT.rarity;
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
                        // Kiểm tra xem rarity có được định nghĩa trong DEFAULT không
                        if (!this.cardClasses[cardName].DEFAULT?.rarity) {
                            // Thẻ này đã được log lỗi ở trên, bỏ qua ở đây
                            continue;
                        }

                        // Lấy rarity từ class
                        const rarity = this.cardClasses[cardName].DEFAULT.rarity;
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
    createRandomCard(scene, index) {
        const { x, y } = scene.gameManager.cardManager.getGridPositionCoordinates(index);

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
                    return this.createCoin(scene, index);
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
            return this.createCoin(scene, index);
        }
        return new this.cardClasses[lastCardType](scene, x, y, index);
    }


    /**
     * Tạo Coin động dựa trên elementCoin của Warrior
     * @param {Object} scene - Scene của Phaser
     * @param {number} x - Vị trí x
     * @param {number} y - Vị trí y
     * @param {number} index - Index của thẻ
     * @returns {Card} Thẻ Coin động
     */
    createCoin(scene, index, score = null) {
        const { x, y } = scene.gameManager.cardManager.getGridPositionCoordinates(index);
        const coin = new Coin(scene, x, y, index, this.element);
        if (score) {
            coin.setScore(score);
        }
        return coin;
    }

    createEmpty(scene, index) {
        const { x, y } = scene.gameManager.cardManager.getGridPositionCoordinates(index);
        return new Empty(scene, x, y, index);
    }

    /**
     * Tính toán trọng số động cho danh sách thẻ hợp lệ
     * @param {Array} validCardKeys - Danh sách các thẻ Key hợp lệ
     * @returns {Object} Trọng số của các thẻ hợp lệ
     */
    _calculateDynamicCardWeights(validCardKeys) {
        const currentStage = this.stageCardPools[this.currentStage];
        const typeRatios = currentStage.typeRatios;
        const availableCards = currentStage.availableCards;
        
        const cardWeights = {};
        
        // Tính tổng trọng số cho mỗi type (chỉ tính cho các thẻ trong validCardKeys)
        const typeTotalWeights = {};
        
        for (const [typeName, typeRatio] of Object.entries(typeRatios)) {
            if (availableCards[typeName]) {
                let typeTotalWeight = 0;
                
                // Chỉ tính cho các thẻ có trong validCardKeys
                for (const cardName of availableCards[typeName]) {
                    if (validCardKeys.includes(cardName) && this.cardClasses[cardName]) {
                        // Kiểm tra xem rarity có được định nghĩa trong DEFAULT không
                        if (!this.cardClasses[cardName].DEFAULT?.rarity) {
                            console.error(`CardFactory: Thẻ '${cardName}' không thể được tạo ngẫu nhiên - thiếu thuộc tính rarity trong DEFAULT`);
                            continue;
                        }
                        
                        // Lấy rarity từ class
                        const rarity = this.cardClasses[cardName].DEFAULT.rarity;
                        const weight = rarity * 10;
                        typeTotalWeight += weight;
                    }
                }
                
                if (typeTotalWeight > 0) {
                    typeTotalWeights[typeName] = typeTotalWeight;
                }
            }
        }
        
        // Tính trọng số thực tế cho từng thẻ (chỉ cho các thẻ trong validCardKeys)
        for (const [typeName, typeRatio] of Object.entries(typeRatios)) {
            if (availableCards[typeName] && typeTotalWeights[typeName]) {
                for (const cardName of availableCards[typeName]) {
                    if (validCardKeys.includes(cardName) && this.cardClasses[cardName]) {
                        // Kiểm tra xem rarity có được định nghĩa trong DEFAULT không
                        if (!this.cardClasses[cardName].DEFAULT?.rarity) {
                            continue;
                        }
                        
                        // Lấy rarity từ class
                        const rarity = this.cardClasses[cardName].DEFAULT.rarity;
                        const baseWeight = rarity * 10;
                        
                        // Tính trọng số thực tế = (trọng số cơ bản / tổng trọng số type) * tỷ lệ type
                        const actualWeight = (baseWeight / typeTotalWeights[typeName]) * typeRatio;
                        cardWeights[cardName] = actualWeight;
                    }
                }
            }
        }
        
        return cardWeights;
    }

    /**
     * Tạo thẻ từ danh sách các thẻ Key hợp lệ với trọng số được tính toán động
     * @param {Object} scene - Scene của Phaser
     * @param {number} index - Index của thẻ
     * @param {Array} validCardKeys - Danh sách các thẻ Key hợp lệ
     * @returns {Card} Thẻ được tạo
     */
    createCard(scene, index, validCardKeys) {
        const { x, y } = scene.gameManager.cardManager.getGridPositionCoordinates(index);
        
        // Tính toán trọng số động dựa trên validCardKeys
        const cardWeights = this._calculateDynamicCardWeights(validCardKeys);
        
        // Tính tổng trọng số thực tế
        const totalWeight = Object.values(cardWeights).reduce((sum, weight) => sum + weight, 0);
        
        // Nếu không có thẻ nào hợp lệ, return null
        if (totalWeight === 0) {
            console.warn('CardFactory: Không có thẻ nào hợp lệ trong danh sách được cung cấp');
            return null;
        }
        
        // Chọn thẻ ngẫu nhiên dựa trên trọng số
        const random = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        
        for (const [cardKey, weight] of Object.entries(cardWeights)) {
            cumulativeWeight += weight;
            if (random <= cumulativeWeight) {
                // Nếu là Coin, tạo Coin động dựa trên elementCoin
                if (cardKey === 'Coin') {
                    return this.createCoin(scene, index);
                }
                
                // Tạo thẻ từ cardClasses
                if (this.cardClasses[cardKey]) {
                    const card = new this.cardClasses[cardKey](scene, x, y, index);
                    console.log('Tạo thẻ:', cardKey, 'từ danh sách hợp lệ');
                    return card;
                } else {
                    console.error(`CardFactory: Không tìm thấy class cho thẻ '${cardKey}'`);
                    continue;
                }
            }
        }
        
        // Fallback về thẻ cuối cùng nếu có lỗi làm tròn
        const lastCardKey = Object.keys(cardWeights)[Object.keys(cardWeights).length - 1];
        if (lastCardKey === 'Coin') {
            console.warn('Fallback về Coin:', lastCardKey);
            return this.createCoin(scene, index);
        }
        
        if (this.cardClasses[lastCardKey]) {
            console.warn('Fallback về thẻ:', lastCardKey);
            return new this.cardClasses[lastCardKey](scene, x, y, index);
        }
        
        console.error('CardFactory: Không thể tạo thẻ fallback');
        return null;
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
