// Empty.js - Thẻ trống Empty
// Chức năng: Thẻ trống không có tác dụng, dùng để lấp chỗ trống

import Card from '../../modules/Card.js';

export default class Empty extends Card {
    static DEFAULT = {
        id: 'empty',
        name: 'Empty',
        type: 'empty',
        description: 'Empty - Thẻ trống không có tác dụng.',
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Empty.DEFAULT.name,
            Empty.DEFAULT.id,
            Empty.DEFAULT.type);

            this.description = Empty.DEFAULT.description;

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }


    /**
     * Override CardEffect để xử lý logic riêng của Empty
     */
    CardEffect() {
        super.CardEffect();
        return false;
    }


}
