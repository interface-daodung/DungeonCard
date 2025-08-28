import MoveCardManager from './MoveCardManager.js';
import CardManager from './CardManager.js';
import AnimationManager from './AnimationManager.js';
import dungeonList from '../data/dungeonList.json';

export default class GameManager {
  constructor(scene) {
    this.scene = scene;
    this.coin = 0;

    // Khởi tạo highScores object từ localStorage
    this.highScore = this.getHighScore();

    // Tạo CardManager mới cho mỗi game session
    this.cardManager = new CardManager(scene);

    // Tạo MoveCardManager để quản lý việc di chuyển thẻ
    this.moveCardManager = new MoveCardManager();

    // Tạo AnimationManager để quản lý animation (sẽ được khởi tạo với scene sau)
    this.animationManager = new AnimationManager(scene);
  }


  /**
   * Di chuyển card từ vị trí cũ sang vị trí mới
   * @param {number} index - Vị trí card cũ
   */
  moveCharacter(index) {

    // Nếu đang xử lý animation thì không di chuyển
    if (this.animationManager.isProcessing) {
      return;
    }


    // Disable tất cả card ngay lập tức để tránh race condition
    this.cardManager.disableAllCards();

    const characterIndex = this.cardManager.getCharacterIndex();
    if (this.moveCardManager.isValidMove(characterIndex, index)) {
      const movement = this.moveCardManager.calculateMovement(characterIndex, index);
      //console.log('movement', movement);

      if (this.cardManager.getCard(index).CardEffect()) {
        this.cardManager.enableAllCards();
        return;
      }

      // hủy card cũ ở vị trí index
      this.cardManager.getCard(index).ProgressDestroy();

      this.animationManager.executeMoveAnimation(movement, () => {
        console.log('moveCharacter completed');
        movement.forEach(move => {
          // Sử dụng hàm moveCard an toàn từ CardManager
          this.cardManager.moveCard(move.from, move.to);
        });

        // Tạo card mới ở vị trí cuối của movement
        if (movement.length > 0) {
          const lastMove = movement[movement.length - 1];
          const fromIndex = lastMove.from;

          // Lấy tọa độ của vị trí cũ để tạo card mới
          const coords = this.cardManager.getGridPositionCoordinates(fromIndex);
          if (coords) {
            // Tạo card mới sử dụng CardFactory
            const newCard = this.cardManager.cardFactory.createRandomCard(this.scene, coords.x, coords.y, fromIndex);
            // Thêm card mới vào vị trí cũ
            this.cardManager.addCard(newCard, fromIndex);
            // Gọi processCreation để có hiệu ứng fade in
            if (newCard.processCreation) {
              newCard.processCreation();
            }
          }
        }

        // Enable lại tất cả card sau khi hoàn thành
        this.cardManager.enableAllCards();
      });

    } else {
      // Nếu không thể di chuyển, enable lại tất cả card
      this.cardManager.enableAllCards();
    }
  }

  /**
   * Lấy highScore của stage hiện tại
   */
  getHighScore() {
    const stageId = this.scene.stageId;

    let saved = localStorage.getItem('highScores');

    if (saved === null) {
      // Tạo object mới với stageId từ dungeonList = 0
      const newHighScores = {};

      // Lưu vào localStorage
      const json_highScores = JSON.stringify(newHighScores);
      localStorage.setItem('highScores', json_highScores);
      saved = json_highScores;
    }

    const highScores = JSON.parse(saved) || {};
    return highScores[stageId] || 0;
  }

  /**
   * Set highScore cho stage hiện tại
   */
  setHighScore(score) {
    const stageId = this.scene.stageId;

    let saved = localStorage.getItem('highScores');
    let highScores = {};

    if (saved === null) {
      // Tạo object mới với stageId từ dungeonList = 0
      highScores = {};
    } else {
      highScores = JSON.parse(saved) || {};
    }

    // Cập nhật highScore cho stage hiện tại
    highScores[stageId] = score;

    // Lưu vào localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(`GameManager: High score set for ${stageId}: ${score}`);
  }


  /**
   * Thêm coin vào coin
   */
  addCoin(points) {
    this.coin += points;
    // Cập nhật hiển thị coin trong GameScene
    if (this.scene && this.scene.coinText) {
      this.scene.coinText.setText(`🪙${this.coin}`);
      console.log(`GameManager: UI coin updated to ${this.coin}`);
    } else {
      console.warn(`GameManager: Cannot update coin UI - scene: ${!!this.scene}, coinText: ${!!this.scene?.coinText}`);
    }

    console.log(`GameManager: Added ${points} coins, total: ${this.coin}`);
  }

  gameOver() {
    console.log('gameover!');
    
    // Lấy tên character hiện tại
    const characterName = this.cardManager.CardCharacter?.constructor?.DEFAULT?.id;
    
    if (characterName) {
      // Lấy characterHighScore từ localStorage
      let characterHighScores = JSON.parse(localStorage.getItem('characterHighScores')) || {};
      
      // Kiểm tra và cập nhật highScore cho character
      if (!characterHighScores[characterName] || this.coin > characterHighScores[characterName]) {
        characterHighScores[characterName] = this.coin;
        localStorage.setItem('characterHighScores', JSON.stringify(characterHighScores));
        console.log(`GameManager: New character high score for ${characterName}: ${this.coin}`);
      }
    }
    
    // Kiểm tra và cập nhật highScore cho stage hiện tại
    if (this.coin > this.highScore) {
      this.setHighScore(this.coin);
      this.highScore = this.coin; // Cập nhật highScore local
      console.log(`GameManager: New high score for ${this.scene.stageId}: ${this.coin}`);
    }

    // Lấy danh sách tất cả thẻ
    const allCards = this.cardManager.getAllCards();
 
    // Destroy từng thẻ một cách tuần tự với delay 200ms
    let currentIndex = 0;
    
    const destroyNextCard = () => {
      if (currentIndex >= allCards.length) {
        // Đã destroy hết thẻ, hiển thị dialog game over
        this.showGameOverDialog();
        return;
      }
//animation destroy card






      const card = allCards[currentIndex];
      if (card && card.ProgressDestroy) {
        card.ProgressDestroy();
        console.log(`GameManager: Destroying card ${card.name || card.type} at index ${currentIndex}`);
      }
      
      currentIndex++;
      
      // Lặp lại sau 200ms
      setTimeout(destroyNextCard, 200);
    };

    // Bắt đầu destroy thẻ
    destroyNextCard();
  }

  /**
   * Hiển thị dialog game over
   */
  showGameOverDialog() {
    console.log('GameManager: Showing game over dialog');
    
    // Tạo dialog game over
    const dialog = this.scene.add.container(0, 0);
    
    // Background mờ
    const background = this.scene.add.graphics();
    background.fillStyle(0x000000, 0.7);
    background.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
    dialog.add(background);
    
    // Container chính cho dialog
    const dialogContainer = this.scene.add.container(0, 0);
    dialogContainer.setPosition(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
    
    // Background cho dialog
    const dialogBg = this.scene.add.graphics();
    dialogBg.fillStyle(0x2c3e50, 0.95);
    dialogBg.lineStyle(3, 0xecf0f1, 1);
    dialogBg.fillRoundedRect(-200, -150, 400, 300, 20);
    dialogBg.strokeRoundedRect(-200, -150, 400, 300, 20);
    dialogContainer.add(dialogBg);
    
    // Tiêu đề
    const title = this.scene.add.text(0, -100, 'GAME OVER', {
      fontSize: '32px',
      fill: '#e74c3c',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    dialogContainer.add(title);
    
    // Thông tin điểm số
    const scoreText = this.scene.add.text(0, -50, `Score: ${this.coin}`, {
      fontSize: '24px',
      fill: '#ecf0f1',
      fontFamily: 'Arial, sans-serif'
    });
    scoreText.setOrigin(0.5);
    dialogContainer.add(scoreText);
    
    // High score
    const highScoreText = this.scene.add.text(0, -10, `High Score: ${this.highScore}`, {
      fontSize: '20px',
      fill: '#f39c12',
      fontFamily: 'Arial, sans-serif'
    });
    highScoreText.setOrigin(0.5);
    dialogContainer.add(highScoreText);
    
    // Nút Restart
    const restartButton = this.scene.add.text(0, 50, 'Restart', {
      fontSize: '24px',
      fill: '#2ecc71',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
      this.scene.scene.restart();
      dialog.destroy();
    });
    restartButton.on('pointerover', () => {
      restartButton.setStyle({ fill: '#27ae60' });
    });
    restartButton.on('pointerout', () => {
      restartButton.setStyle({ fill: '#2ecc71' });
    });
    dialogContainer.add(restartButton);
    
    // Nút Menu
    const menuButton = this.scene.add.text(0, 100, 'Menu', {
      fontSize: '24px',
      fill: '#3498db',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    });
    menuButton.setOrigin(0.5);
    menuButton.setInteractive();
    menuButton.on('pointerdown', () => {
      this.scene.scene.start('MenuScene');
      dialog.destroy();
    });
    menuButton.on('pointerover', () => {
      menuButton.setStyle({ fill: '#2980b9' });
    });
    menuButton.on('pointerout', () => {
      menuButton.setStyle({ fill: '#3498db' });
    });
    dialogContainer.add(menuButton);
    
    // Thêm vào scene
    dialog.add(dialogContainer);
    this.scene.add.existing(dialog);
    
    // Làm cho dialog có thể tương tác
    dialog.setDepth(1000);
  }
}
