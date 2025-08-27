/**
 * Class Item - Class cơ bản cho tất cả các item trong game
 * Chỉ dùng làm class mẫu, không dùng trực tiếp
 */
class Item {
    constructor(name, nameId, image, power, cooldown, description, maxLevel = 5) {
        this.name = name;
        this.nameId = nameId;
        this.image = image;
        this._power = power;      // Sử dụng _power để tránh xung đột với getter
        this._cooldown = cooldown; // Sử dụng _cooldown để tránh xung đột với getter
        this.description = description;
        this.level = 0;
        this.maxLevel = maxLevel;
    }

    /**
     * Lấy power theo level hiện tại
     * @returns {number} Power đã được tính toán theo level
     */
    get power() {
        return this._power * (1 + this.level * 0.2); // Tăng 20% mỗi level
    }

    /**
     * Lấy cooldown theo level hiện tại
     * @returns {number} Cooldown đã được tính toán theo level
     */
    get cooldown() {
        return Math.max(0, this._cooldown - this.level * 0.5); // Giảm 0.5 mỗi level, tối thiểu 0
    }

    /**
     * Kiểm tra có thể nâng cấp không
     * @returns {boolean} true nếu còn khả năng upgrade
     */
    isUpgrade() {
        return this.level < this.maxLevel;
    }

    /**
     * Nâng cấp item
     * @returns {boolean} true nếu nâng cấp thành công
     */
    upgrade() {
        if (this.isUpgrade()) {
            this.level++;
            return true;
        }
        return false;
    }

    /**
     * Lấy giá theo level
     * @returns {number} Giá của item
     */
    getPrice() {
        if (this.level === 0) return 1000;
        return this.level * 100;
    }

    /**
     * Lấy thông tin item dưới dạng object
     * @returns {Object} Thông tin item
     */
    getInfo() {
        return {
            name: this.name,
            nameId: this.nameId,
            image: this.image,
            power: this.power,
            cooldown: this.cooldown,
            description: this.description,
            level: this.level,
            maxLevel: this.maxLevel
        };
    }

}

export default Item;
