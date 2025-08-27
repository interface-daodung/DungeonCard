import BlackHole from '../models/items/BlackHole.js';
import Catalyst from '../models/items/Catalyst.js';
import Claw from '../models/items/Claw.js';
import Cooldown from '../models/items/Cooldown.js';
import Corruption from '../models/items/Corruption.js';
import HealingPotion from '../models/items/HealingPotion.js';
import Refinement from '../models/items/Refinement.js';
import Repair from '../models/items/Repair.js';
import Seasoning from '../models/items/Seasoning.js';
import Sword from '../models/items/Sword.js';
import TaxWaiver from '../models/items/TaxWaiver.js';
import Toxic from '../models/items/Toxic.js';

/**
 * Class ItemFactory - Singleton factory để tạo và quản lý các item trong game
 */
class ItemFactory {
    constructor() {
        if (ItemFactory.instance) {
            return ItemFactory.instance;
        }

        // Khởi tạo danh sách items
        this.items = new Map();
        this.initializeItems();

        ItemFactory.instance = this;
    }

    /**
     * Lấy instance duy nhất của ItemFactory
     * @returns {ItemFactory} Instance của ItemFactory
     */
    static getInstance() {
        if (!ItemFactory.instance) {
            ItemFactory.instance = new ItemFactory();
        }
        return ItemFactory.instance;
    }

    /**
     * Khởi tạo danh sách items cơ bản - CHỈ LƯU CLASS CONSTRUCTOR, KHÔNG TẠO INSTANCE
     */
    initializeItems() {
        // Lưu class constructor, KHÔNG tạo instance
        this.items.set('healing-potion', HealingPotion);
        this.items.set('toxic', Toxic);
        this.items.set('claw', Claw);
        this.items.set('cooldown', Cooldown);
        this.items.set('sword', Sword);
        this.items.set('catalyst', Catalyst);
        this.items.set('refinement', Refinement);
        this.items.set('seasoning', Seasoning);
        this.items.set('repair', Repair);
        this.items.set('black-hole', BlackHole);
        this.items.set('tax-waiver', TaxWaiver);
        this.items.set('corruption', Corruption);
    }

    /**
     * Tạo item mới từ template - CHỈ TẠO INSTANCE KHI ĐƯỢC GỌI
     * @param {string} itemKey - Key của item template
     * @returns {Item|null} Item mới hoặc null nếu không tìm thấy template
     */
    createItem(itemKey) {
        const ItemClass = this.items.get(itemKey);
        if (ItemClass) {
            // Tạo instance mới trực tiếp từ class
            return new ItemClass();
        }
        return null;
    }

    /**
     * Lấy danh sách tất cả item keys
     * @returns {Array<string>} Danh sách item keys
     */
    getItemKeys() {
        return Array.from(this.items.keys());
    }
}

// Tạo và export instance singleton
const itemFactory = ItemFactory.getInstance();
export default itemFactory;
