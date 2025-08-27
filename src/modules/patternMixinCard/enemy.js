// Mixin logic cho enemy cards
export const enemy = {
    // Logic cho enemy cards
    /**
     * Thêm hiển thị UI cho card
     */
    addDisplayHUD() {
        // Thêm hiển thị UI cho card
        this.hpDisplay = this.createDisplay({
            fillColor: 0xFF0000,
            text: this.health.toString()
        }, 'rightTop');
    },
    /**
     * Nhận damage từ người chơi
     * @param {number} damage - Lượng damage nhận vào
     */
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - this.defense); // Trừ đi defense
        this.updateHealth(this.health - actualDamage);

        console.log(`Anemo Samachurl nhận ${actualDamage} damage, máu còn lại: ${this.health}`);

        return actualDamage;
    },
    /**
     * Hiệu ứng khi card được kích hoạt
     */
    CardEffect() {
        console.log(this.name + ' đang chạy hiệu ứng...');
        // Logic khi card được kích hoạt (nếu có)
        this.scene.gameManager.cardManager.CardCharacter.takeDamage(this.health);
        this.scene.gameManager.addCoin(this.score);
        return false;
    }
};
