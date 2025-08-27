import Phaser from 'phaser';
import { GradientText } from '../utils/GradientText.js';
import { HeaderUI } from '../utils/HeaderUI.js';
import cardCharacterList from '../data/cardCharacterList.json';
import { SpritesheetCharacter } from '../utils/SpritesheetCharacter.js';

export default class SelectCharacterScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectCharacterScene' });

    this.cards = cardCharacterList;

    // Khởi tạo currentCardIndex với logic thông minh
    this.currentCardIndex = this.initializeCurrentCardIndex();
  }

  preload() {
    // Assets đã được load bởi LoadingScene
  }

  create() {
    const { width, height } = this.scale;

    // Background
    const background = this.add.image(width / 2, height / 2, 'background');
    background.setDisplaySize(width, height);

    // Nếu không có background image, tạo background mặc định
    if (!this.textures.exists('background')) {
      this.add.rectangle(width / 2, height / 2, width, height, 0x2c3e50);
    }

    this.headerUI = HeaderUI.createHeaderUI(this, width, height);

    // Tiêu đề
    GradientText.createGameTitle(this, 'CHARACTER', width / 2, height * 0.12);

    // Panel thông tin thẻ (phía trên)
    this.createInfoPanel(width, height);

    // Hiển thị thẻ hiện tại (giữa màn hình)
    this.createCurrentCardDisplay(width, height);

    // Nút navigation (trái/phải)
    this.createNavigationButtons(width, height);

    // Nút back về MenuScene
    this.createBackButton(width, height);

    // Hiển thị thẻ đầu tiên
    this.updateCardDisplay();
  }

  createInfoPanel(width, height) {
    // Panel nền
    const panelBg = this.add.graphics();
    panelBg.fillStyle(0x96576a, 0.8);
    panelBg.fillRoundedRect(width * 0.1, height * 0.15, width * 0.8, height * 0.25, 20);
    panelBg.lineStyle(3, 0x1f0614, 1);
    panelBg.strokeRoundedRect(width * 0.1, height * 0.15, width * 0.8, height * 0.25, 20);

    // Thông tin thẻ
    this.cardNameText = this.add.text(width * 0.5, height * 0.18, '', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    this.cardLevelText = this.add.text(width * 0.82, height * 0.18, 'level 1', {
      fontSize: '20px',
      fill: '#FFD700',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold'
    }).setOrigin(0.5);

    this.cardElementImage = this.add.image(width * 0.1 + 32, height * 0.15 + 32, 'element-cryo');
    this.cardElementImage.setDisplaySize(32, 32);

    this.cardDescriptionText = this.add.text(width * 0.5, height * 0.26, '', {
      fontSize: '20px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      wordWrap: { width: width * 0.75 },
      align: 'center'
    }).setOrigin(0.5);

    this.cardHPText = this.add.text(width * 0.5, height * 0.32, '❤️ 7', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      wordWrap: { width: width * 0.75 },
      align: 'center'
    }).setOrigin(0.5);
    this.cardHPText.hp = 7;

    // Nút Upgrade
    this.upgradeButton = this.add.text(width * 0.5, height * 0.36, 'UPGRADE', {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      backgroundColor: '#95245b',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    this.upgradeButton.setInteractive({ useHandCursor: true });
    this.upgradeButton.on('pointerover', () => {
      // Chỉ hover nếu chưa max level
      if (this.cards[this.currentCardIndex].level < 9) {
        this.upgradeButton.setTint(0xd1d1d1); // Màu vàng gold
        this.upgradeButton.setScale(1.1);
        this.upgradeButton.setStyle({ fill: '#ffee8dff' });
        this.cardHPText.setText(`🪙${this.upgradeCharacterPrice()}`);
      }
    });
    this.upgradeButton.on('pointerout', () => {
      this.upgradeButton.clearTint();
      this.upgradeButton.setScale(1);
      this.upgradeButton.setStyle({ fill: '#ffffff' });
      this.cardHPText.setText(`❤️ ${this.cardHPText.hp}`);
    });
    this.upgradeButton.on('pointerdown', () => {
      // Chỉ upgrade nếu chưa max level
      if (this.cards[this.currentCardIndex].level < 9) {
        console.log('Upgrade button clicked!');
        this.upgradeCharacter();
      }
    });
  }

  createCurrentCardDisplay(width, height) {
    // Container cho thẻ hiện tại
    this.currentCardContainer = this.add.container(width / 2, height * 0.65);

    // Thẻ hiện tại
    this.currentCardImage = this.add.image(0, 0, 'eula');
    this.currentCardImage.setDisplaySize(300, 514); // Tỷ lệ 7:12

    // Viền thẻ - lưu reference để có thể thay đổi style sau này
    this.cardBorder = this.add.graphics();
    this.cardBorder.lineStyle(4, 0xffffff, 1);
    this.cardBorder.fillStyle(0xffffff, 1);
    this.cardBorder.fillRoundedRect(-152, -259, 304, 518, 28);
    this.cardBorder.strokeRoundedRect(-152, -259, 304, 518, 28);

    this.currentCardContainer.add(this.cardBorder);
    this.currentCardContainer.add(this.currentCardImage);
  }

  createNavigationButtons(width, height) {
    // Nút Previous (trái)
    this.prevButton = this.add.text(width * 0.2, height * 0.65, '◀', {
      fontSize: '28px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      padding: { x: 20, y: 15 }
    }).setOrigin(0.5);

    this.prevButton.setInteractive({ useHandCursor: true });
    this.prevButton.on('pointerover', () => {
      // this.prevButton.setBackgroundColor('#2980b9');
    });
    this.prevButton.on('pointerout', () => {
      // this.prevButton.setBackgroundColor('#3498db');
    });
    this.prevButton.on('pointerdown', () => {
      this.previousCard();
    });

    // Nút Next (phải)
    this.nextButton = this.add.text(width * 0.8, height * 0.65, '▶', {
      fontSize: '28px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      padding: { x: 20, y: 15 }
    }).setOrigin(0.5);

    this.nextButton.setInteractive({ useHandCursor: true });
    this.nextButton.on('pointerover', () => {
      this.nextButton.setScale(1.1);
    });
    this.nextButton.on('pointerout', () => {
      this.nextButton.setScale(1);
    });
    this.nextButton.on('pointerdown', () => {
      this.nextCard();
    });
  }

  createBackButton(width, height) {
    this.backButton = this.add.text(width * 0.5, height * 0.9, 'SELECT', {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      backgroundColor: '#622945',
      padding: { x: 25, y: 12 }
    }).setOrigin(0.5);

    this.backButton.setInteractive({ useHandCursor: true });
    this.backButton.on('pointerover', () => {
      this.backButton.setScale(1.1);
      this.backButton.setTint(0xd1d1d1);
    });
    this.backButton.on('pointerout', () => {
      this.backButton.setScale(1);
      this.backButton.clearTint();
    });
    this.backButton.on('pointerdown', () => {
      localStorage.setItem('selectedCharacter', this.cards[this.currentCardIndex].id);
      this.scene.start('MenuScene');
    });
  }

  updateCardDisplay() {
    const currentCard = this.cards[this.currentCardIndex];

    // Load level từ localStorage
    let CharacterLevel = localStorage.getItem('CharacterLevel');
    if (CharacterLevel) {
      try {
        CharacterLevel = JSON.parse(CharacterLevel);
        if (CharacterLevel[currentCard.id]) {
          currentCard.level = CharacterLevel[currentCard.id];
        } else {
          currentCard.level = 1;
        }
      } catch (error) {
        console.warn('Error parsing CharacterLevel from localStorage:', error);
        currentCard.level = 1;
      }
    } else {
      currentCard.level = 1;
    }

    // Cập nhật thông tin panel
    this.cardNameText.setText(currentCard.name);
    this.cardElementImage.setTexture(`element-${currentCard.element.toLowerCase()}`);
    this.cardDescriptionText.setText(currentCard.description);
    this.cardHPText.setText(`❤️ ${currentCard.hp + currentCard.level - 1}`);
    this.cardLevelText.setText(`level ${currentCard.level}`);


    // Hiển thị level hoặc MAX
    if (currentCard.level >= 9) {
      this.upgradeButton.setText('MAX LEVEL');
      this.upgradeButton.setStyle({ fill: '#FFFFFF' });
      this.upgradeButton.setScale(1);
    } else {
      this.upgradeButton.setText(`UPGRADE`);
    }

    this.cardHPText.hp = currentCard.hp + currentCard.level - 1;

    // Cập nhật hình ảnh thẻ và style dựa trên level
    if (currentCard.level > 2) {
      // Nếu level > 2, sử dụng SpritesheetCharacter.create và style vàng
      this.currentCardContainer.remove(this.currentCardImage, true);
      this.currentCardImage = SpritesheetCharacter.create(this, 0, 0, currentCard.id + '-sprite', 300, 514);
      this.currentCardContainer.add(this.currentCardImage);
      
      // Thay đổi style viền thành màu vàng
      this.cardBorder.clear();
      this.cardBorder.lineStyle(4, 0xdcc06f, 1);
      this.cardBorder.fillStyle(0xdcc06f, 1);
      this.cardBorder.fillRoundedRect(-152, -259, 304, 518, 28);
      this.cardBorder.strokeRoundedRect(-152, -259, 304, 518, 28);
    } else {
      // Nếu level ≤ 2, sử dụng image thường và style trắng
      this.currentCardContainer.remove(this.currentCardImage, true);
      this.currentCardImage = this.add.image(0, 0, currentCard.id);
      this.currentCardImage.setDisplaySize(300, 514);
      this.currentCardContainer.add(this.currentCardImage);
      
      // Thay đổi style viền thành màu trắng
      this.cardBorder.clear();
      this.cardBorder.lineStyle(4, 0xffffff, 1);
      this.cardBorder.fillStyle(0xffffff, 1);
      this.cardBorder.fillRoundedRect(-152, -259, 304, 518, 28);
      this.cardBorder.strokeRoundedRect(-152, -259, 304, 518, 28);
    }

    // Cập nhật trạng thái nút navigation
    this.prevButton.setAlpha(this.currentCardIndex === 0 ? 0.5 : 1);
    this.nextButton.setAlpha(this.currentCardIndex === this.cards.length - 1 ? 0.5 : 1);
  }

  previousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.updateCardDisplay();
    }
  }

  nextCard() {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
      this.updateCardDisplay();
    }
  }

  /**
   * Tính giá upgrade character
   * @returns {number} Giá upgrade (level * 100)
   */
  upgradeCharacterPrice() {
    return this.cards[this.currentCardIndex].level * 100;
  }

  /**
   * Upgrade character level và lưu vào localStorage
   */
  upgradeCharacter() {
    const currentCard = this.cards[this.currentCardIndex];

    // Kiểm tra max level
    if (currentCard.level >= 9) {
      console.log(`Character ${currentCard.name} is already at max level!`);
      return;
    }

    // Lấy CharacterLevel từ localStorage
    let CharacterLevel = localStorage.getItem('CharacterLevel');

    // Nếu chưa có, tạo object mới
    if (!CharacterLevel) {
      CharacterLevel = {};
    } else {
      // Parse JSON nếu có
      try {
        CharacterLevel = JSON.parse(CharacterLevel);
      } catch (error) {
        console.warn('Error parsing CharacterLevel from localStorage:', error);
        CharacterLevel = {};
      }
    }

    // Tăng level
    currentCard.level += 1;
    CharacterLevel[currentCard.id] = currentCard.level;

    // Lưu vào localStorage
    localStorage.setItem('CharacterLevel', JSON.stringify(CharacterLevel));

    // Cập nhật hiển thị
    this.updateCardDisplay();

    console.log(`Character ${currentCard.name} upgraded to level ${currentCard.level}`);
  }

  /**
   * Khởi tạo currentCardIndex với logic thông minh
   * @returns {number} Index của card được chọn hoặc 0 nếu không có
   */
  initializeCurrentCardIndex() {
    // Giá trị mặc định là 0
    let defaultIndex = 0;

    // Kiểm tra xem có selectedCharacter trong localStorage không
    const selectedCharacter = localStorage.getItem('selectedCharacter');

    if (selectedCharacter !== null) {
      try {
        // Parse selectedCharacter để lấy object card
        const selectedCard = selectedCharacter;

        // Tìm index của card được chọn trong mảng cards
        const selectedIndex = this.cards.findIndex(card => card.id === selectedCard);

        if (selectedIndex !== -1) {
          // Nếu tìm thấy, trả về index đó
          console.log(`SelectCharacterScene: Đã tìm thấy selectedCharacter "${selectedCard}" tại index ${selectedIndex}`);
          return selectedIndex;
        } else {
          // Nếu không tìm thấy, sử dụng giá trị mặc định
          console.warn(`SelectCharacterScene: Không tìm thấy selectedCharacter "${selectedCard}" trong mảng cards, sử dụng index mặc định ${defaultIndex}`);
          return defaultIndex;
        }
      } catch (error) {
        // Nếu có lỗi parse JSON, sử dụng giá trị mặc định
        console.warn(`SelectCharacterScene: Lỗi parse selectedCharacter, sử dụng index mặc định ${defaultIndex}`, error);
        return defaultIndex;
      }
    } else {
      // Nếu không có selectedCharacter, sử dụng giá trị mặc định
      console.log(`SelectCharacterScene: Không có selectedCharacter, sử dụng index mặc định ${defaultIndex}`);
      return defaultIndex;
    }
  }
}

