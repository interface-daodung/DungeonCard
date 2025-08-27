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

    //console.log('moveCharacter', index);
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
    
    // Kiểm tra và cập nhật highScore cho stage hiện tại
    if (this.coin > this.highScore) {
      this.setHighScore(this.coin);
      this.highScore = this.coin; // Cập nhật highScore local
      console.log(`GameManager: New high score for ${this.scene.stageId}: ${this.coin}`);
    }

    // Cập nhật hiển thị coin trong GameScene
    if (this.scene && this.scene.coinText) {
      this.scene.coinText.setText(`🪙${this.coin}`);
      console.log(`GameManager: UI coin updated to ${this.coin}`);
    } else {
      console.warn(`GameManager: Cannot update coin UI - scene: ${!!this.scene}, coinText: ${!!this.scene?.coinText}`);
    }

    console.log(`GameManager: Added ${points} coins, total: ${this.coin}`);
  }

  /**
   * Getter cho CardManager
   */
  getCardManager() {
    return this.cardManager;
  }
}
