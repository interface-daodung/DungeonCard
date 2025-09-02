// Quicksand.js - Thẻ bẫy Quicksand
// Chức năng: Thẻ bẫy cát lún làm chậm và gây damage cho người chơi

import Trap from '../../../modules/typeCard/trap.js';

export default class Quicksand extends Trap {
    static DEFAULT = {
        id: 'quicksand',
        name: 'Quicksand',
        type: 'trap',
        description: 'Quicksand - Bẫy cát lún gây damage và làm chậm người chơi khi kích hoạt.',
        rarity: 2
    };
    constructor(scene, x, y, index) {
        super(scene, x, y, index,
            Quicksand.DEFAULT.name,
            Quicksand.DEFAULT.id,
            Quicksand.DEFAULT.type);

        this.rarity = Quicksand.DEFAULT.rarity; // Độ hiếm của thẻ (1-5, 1 là hiếm nhất)
        this.description = Quicksand.DEFAULT.description;

        this.damage = this.GetRandom(5, 12); // Damage từ 5-12

        // Tạo card và thêm vào scene
        this.createCard();
        scene.add.existing(this);
    }

}
