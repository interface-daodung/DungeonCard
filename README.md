# Dungeon Card Game

Một game card-based dungeon crawler được xây dựng với **Phaser.js** và **ES6**, sử dụng **Vite** làm build tool.

## 🎮 Tính năng

- **Card-based Combat System**: Sử dụng các lá bài để tấn công, phòng thủ và sử dụng phép thuật
- **Turn-based Gameplay**: Lối chơi theo lượt với hệ thống enemy AI
- **Player Progression**: Hệ thống level, score và stats
- **Modern UI**: Giao diện đẹp mắt với animations và effects
- **Responsive Design**: Tương thích với nhiều kích thước màn hình

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (v16 trở lên)
- npm hoặc yarn

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd dungeon-card-game
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy development server
```bash
npm run dev
```

Game sẽ mở tại `http://localhost:3000`

### Bước 4: Build production
```bash
npm run build
```

## 🏗️ Cấu trúc dự án

```
dungeon-card-game/
├── src/
│   ├── components/          # Game components
│   │   ├── Card.js         # Card logic và UI
│   │   └── Player.js       # Player character
│   ├── scenes/             # Game scenes
│   │   ├── MenuScene.js    # Main menu
│   │   └── GameScene.js    # Main gameplay
│   ├── core/               # Core game systems
│   │   ├── AssetManager.js # Asset loading management
│   │   ├── CardManager.js  # Card grid management
│   │   └── GameManager.js  # Game state management
│   └── main.js             # Entry point
├── assets/                 # Game assets
│   └── images/            # Image files
├── index.html             # Main HTML file
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎯 Cách chơi

1. **Menu**: Chọn "START GAME" để bắt đầu
2. **Combat**: 
   - Click vào enemy để chọn mục tiêu
   - Click vào card để sử dụng
   - Sử dụng SPACE để kết thúc lượt
3. **Cards**:
   - ⚔️ **Attack**: Gây sát thương
   - 🛡️ **Defense**: Tăng phòng thủ
   - 🔮 **Magic**: Hiệu ứng đặc biệt
   - 💚 **Heal**: Hồi máu

## 🛠️ Công nghệ sử dụng

- **Phaser.js 3.70**: Game engine
- **ES6 Modules**: Modern JavaScript
- **Vite**: Build tool và dev server
- **HTML5 Canvas**: Rendering
- **CSS3**: Styling và animations

## 🔧 Development

### Thêm card mới
1. Tạo class mới trong `src/components/`
2. Thêm vào `GameScene.js`
3. Cập nhật card types và logic

### Thêm scene mới
1. Tạo file scene trong `src/scenes/`
2. Import vào `main.js`
3. Thêm vào scene array

### Customize assets
- Thay thế images trong `assets/images/`
- Cập nhật preload trong scenes
- Điều chỉnh kích thước và scale

## 📝 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub.
