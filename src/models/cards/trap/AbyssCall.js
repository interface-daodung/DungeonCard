// AbyssCall.js - Thẻ bẫy AbyssCall
// Chức năng: Thẻ bẫy gọi thêm enemy vào trận đấu

import Trap from '../../../modules/typeCard/trap.js';

export default class AbyssCall extends Trap {
    static DEFAULT = {
        id: 'abyss-call',
        name: 'AbyssCall',
        type: 'trap',
        description: 'AbyssCall - Bẫy gọi thêm enemy vào trận đấu khi kích hoạt.',
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            AbyssCall.DEFAULT.name,
            AbyssCall.DEFAULT.id,
            AbyssCall.DEFAULT.type);


        this.rarity = AbyssCall.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = AbyssCall.DEFAULT.description;

        this.enemyCount = this.GetRandom(1, 3); // Số lượng enemy gọi từ 1-3
        this.enemyLevel = this.GetRandom(1, 3); // Cấp độ enemy từ 1-3

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }


}
