import Phaser from 'phaser';
import GameManager from '../core/GameManager.js';
import itemFactory from '../modules/ItemFactory.js';
import dungeonList from '../data/dungeonList.json';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    const { stageId } = data || {};
    this.stageId = stageId || 'dungeon_abyss_chamber';
    this.dungeonStageName = dungeonList.find(d => d.stageId === this.stageId).name;
    console.log('GameScene: Dungeon data:', this.dungeonStageName);
    // Tạo GameManager mới cho mỗi game session
    this.gameManager = new GameManager(this);
  }

  create() {
    // Lấy kích thước game
    const { width, height } = this.scale;

    // Background
    this.add.image(width / 2, height / 2, 'background');

    // Thêm overlay tối để làm nổi bật màn chơi
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setAlpha(0.5);

    // UI
    this.createUI();

    // Tạo deck cards - đặt ở bottom
    this.createDeck();

    this.sellButton = this.createSellWeapon();

    // Resume audio context sau user interaction
    // this.resumeAudioContext();
  }

  createUI() {
    const { width, height } = this.scale;

    // Nút ☰ Menu - đặt ở top left
    const menuButton = this.add.text(width * 0.95, height * 0.05, '☰', {
      fontSize: '32px',
      fill: '#ffffff',
      stroke: '#2d0d21',
      strokeThickness: 2
    });
    menuButton.setInteractive({ useHandCursor: true });
    menuButton.setOrigin(0.5);
    menuButton.on('pointerover', () => {
      menuButton.setScale(1.1);
      menuButton.setTint(0xd1d1d1);
    });
    menuButton.on('pointerout', () => {
      menuButton.setScale(1);
      menuButton.clearTint();
    });
    menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    //stage  
    this.stageText = this.add.text(width * 0.5, height * 0.035, this.dungeonStageName, {
      fontSize: '30px',
      fill: '#FFD700',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      stroke: '#E69500',
      strokeThickness: 2
    }).setOrigin(0.5);

    //high score
    this.highScoreText = this.add.text(width * 0.5, height * 0.07, `High Score: ${this.gameManager.highScore}`, {
      fontSize: '20px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      // stroke: '#E69500',
      // strokeThickness: 2
    }).setOrigin(0.5).setAlpha(0.8);

    // coin với icon 🪙 - đặt ở dưới nút menu
    this.coinText = this.add.text(width * 0.75, height * 0.13, `🪙${this.gameManager.coin}`, {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      strokeThickness: 2
    });



    // 3 nút item - lấy từ localStorage và tạo từ itemFactory
    const itemButtons = this.createItemButtonsFromStorage();
    const itemSpacing = 90; // Tăng khoảng cách vì item button lớn hơn
    const startX = width * 0.18;

    itemButtons.forEach((item, index) => {
      this.createItemButton(startX + (index * itemSpacing), height * 0.15, item);
    });
  }

  createDeck() {
    // Khởi tạo CardManager thông qua GameManager Tạo lưới 3x3
    this.gameManager.cardManager.initializeCreateDeck(this);
  }

  useItem(itemName) {
    // Xử lý khi sử dụng item
    console.log(`Sử dụng item: ${itemName}`);

    // Có thể thêm logic sử dụng item ở đây
    // Ví dụ: tăng damage, heal, buff, etc.

    // Hiển thị thông báo
    const { width, height } = this.scale;
    const notification = this.add.text(width / 2, height * 0.8, `Đã sử dụng ${itemName}!`, {
      fontSize: '18px',
      fill: '#f39c12',
      stroke: '#2c3e50',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Tự động ẩn thông báo sau 2 giây
    this.time.delayedCall(2000, () => {
      notification.destroy();
    });
  }

  createItemButton(x, y, itemData) {
    // Tạo container chính cho item button
    const itemButton = this.add.container(x, y);

    // Kích thước item button: 120x120
    const buttonSize = 68;

    // 1. Tạo background bo tròn bằng Graphics
    const backgroundItem = this.add.graphics();
    backgroundItem.fillStyle(0x6d6d6d, 1); // Màu nền tối
    backgroundItem.fillRoundedRect(-buttonSize / 2, -buttonSize / 2, buttonSize, buttonSize, 20);
    backgroundItem.setAlpha(0.5);

    // 2. Tạo hình ảnh item  
    const itemImage = this.add.image(0, 0, 'item', itemData.image);
    itemImage.setDisplaySize(80, 80); // Kích thước ảnh nhỏ hơn background

    // 3. Tạo text đếm ở góc trên phải
    const countText = this.add.text(buttonSize / 2, -buttonSize / 2, itemData.cooldown.toString(), {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 5
    });
    countText.setOrigin(0.5);

    // Thêm tất cả vào container
    itemButton.add([backgroundItem, itemImage, countText]);

    // Làm cho container có thể click
    itemButton.setSize(buttonSize, buttonSize);
    itemButton.setInteractive();

    // Hiệu ứng hover
    itemButton.on('pointerover', () => {
      itemButton.setScale(1.1);
    });

    itemButton.on('pointerout', () => {
      itemButton.setScale(1);
    });

    // Xử lý click
    itemButton.on('pointerdown', () => {
      this.useItem(itemData.name);
    });

    return itemButton;
  }

  /**
   * Tạo item buttons từ localStorage equipment data
   * @returns {Array} Array các item button data
   */
  createItemButtonsFromStorage() {
    try {
      const savedEquipment = localStorage.getItem('equipment');
      if (savedEquipment && savedEquipment !== 'null') {
        const equipmentData = JSON.parse(savedEquipment);

        // Kiểm tra nếu equipmentData là array và có dữ liệu
        if (Array.isArray(equipmentData) && equipmentData.length > 0) {
          // Tạo item buttons từ equipment data
          const itemButtons = equipmentData.map((nameId) => {
            // Tạo item mới từ itemFactory
            return itemFactory.createItem(nameId);

          });
          console.log('Item buttons created from equipment:', itemButtons);
          return itemButtons;
        }
      }
      // Fallback: nếu không có equipment data, trả về array rỗng
      console.log('No equipment data found, returning empty item buttons');
      return [];

    } catch (error) {
      console.error('Error creating item buttons from storage:', error);
      // Trả về array rỗng nếu có lỗi
      return [];
    }
  }
  /**
   * Tạo nút bán vũ khí cho character
   * @param {Character} character - Character cần tạo nút bán vũ khí
   * @param {number} x - Vị trí x của nút
   * @param {number} y - Vị trí y của nút
   */
  createSellWeapon() {
    const { width, height } = this.scale;
    const x = width * 0.75;
    const y = height * 0.95;

    // Tạo container cho nút bán vũ khí
    const sellButtonContainer = this.add.container(x, y);

    // Tạo background cho nút
    const buttonBackground = this.add.graphics();
    buttonBackground.fillStyle(0x051926, 0.5);
    buttonBackground.fillRoundedRect(-90, -30, 180, 60, 5);
    buttonBackground.lineStyle(2, 0xd1d1d1, 0.5);
    buttonBackground.strokeRoundedRect(-90, -30, 180, 60, 5);


    // Tạo text "→🪙"
    const sellText = this.add.text(16, 0, '→🪙', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    const PriceText = this.add.text(32, -15, '0', {
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    // Tạo hình ảnh vũ khí với texture đúng
    const weaponImage =
      this.add.image(-40, 0, '')
        // 'weapon-' + character.weapon.default.category + '-badge',
        //  character.weapon.default.id + '-badge')
        .setDisplaySize(6, 6);

    // Thêm padding left cho text để phủ lên background
    // sellText.setPadding({ left: 15, right: 5, top: 5, bottom: 5 });

    // Thêm tất cả vào container
    sellButtonContainer.add([buttonBackground, weaponImage, sellText, PriceText]);

    // Làm cho nút có thể click
    sellButtonContainer.setInteractive(new Phaser.Geom.Rectangle(-90, -30, 180, 60), Phaser.Geom.Rectangle.Contains);

    // Thêm event click
    sellButtonContainer.on('pointerdown', () => {
      const weapon = this.gameManager.cardManager.CardCharacter.weapon;

      const durability = weapon?.durability;
      if (durability > 0) {
        // Thêm logic bán vũ khí ở đây
        console.log('Bán vũ khí:', weapon.default.id);
        this.gameManager.addCoin(weapon.durability);
        // Xóa vũ khí khỏi character
        this.gameManager.cardManager.CardCharacter.weapon = null;
        this.gameManager.cardManager.CardCharacter.weaponDisplay.updateText(0);
        this.gameManager.cardManager.CardCharacter.weaponBadgeDisplay.updateTexture('');
        this.sellButton.hideButton();
      }
    });

    // Thêm hiệu ứng hover
    sellButtonContainer.on('pointerover', () => {
      sellButtonContainer.setScale(1.1);
    });

    sellButtonContainer.on('pointerout', () => {
      sellButtonContainer.setScale(1);
    });
    sellButtonContainer.setVisible(false);

    return {
      updateButton: () => {
        if (this.gameManager.cardManager.CardCharacter.weapon?.durability > 0) {
          sellButtonContainer.setVisible(true);
          const durability = this.gameManager.cardManager.CardCharacter.weapon?.durability;
          PriceText.setText(durability.toString());
          weaponImage.setTexture('weapon-' + this.gameManager.cardManager.CardCharacter.weapon.default.category + '-badge',
            this.gameManager.cardManager.CardCharacter.weapon.default.id + '-badge');
        }
      },
      hideButton: () => {
        sellButtonContainer.setVisible(false);
      }
    };
  }

}
