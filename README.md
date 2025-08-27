# Dungeon Card Game

Một game card-based dungeon crawler được xây dựng với **Phaser.js** và **ES6**, sử dụng **Vite** làm build tool.

## 🌐 Live Demo

**🎮 Chơi ngay tại:** [https://interface-daodung.github.io/DungeonCard](https://interface-daodung.github.io/DungeonCard)

## 🎮 Tính năng

- **Card-based Combat System**: Sử dụng các lá bài để tấn công, phòng thủ và sử dụng phép thuật
- **Turn-based Gameplay**: Lối chơi theo lượt với hệ thống enemy AI
- **Player Progression**: Hệ thống level, score và stats
- **Modern UI**: Giao diện đẹp mắt với animations và effects
- **Responsive Design**: Tương thích với nhiều kích thước màn hình

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (v18 trở lên)
- npm hoặc yarn

### Bước 1: Clone dự án
```bash
git clone https://github.com/interface-daodung/DungeonCard.git
cd DungeonCard
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy development server
```bash
npm run dev
```

Game sẽ mở tại `http://localhost:5173`

### Bước 4: Build production
```bash
npm run build
```

## 🚀 Deploy tự động với GitHub Actions

Dự án này sử dụng **GitHub Actions** để tự động deploy lên GitHub Pages:

### ✅ Tính năng tự động:
- **Auto-deploy** mỗi khi push code lên `main` branch
- **Build tự động** trên GitHub servers
- **Không cần** build local hay upload thủ công
- **Deploy ngay lập tức** sau khi push

### 🔧 Workflow hoạt động:
1. **Push code** → GitHub Actions tự động kích hoạt
2. **Build dự án** → Sử dụng Node.js và npm
3. **Deploy lên Pages** → Tự động tạo website

### 📁 Cấu trúc deployment:
```
.github/workflows/deploy.yml  # GitHub Actions workflow
dist/                        # Build output (auto-generated)
```

## 🏗️ Cấu trúc dự án

```
DungeonCard/
├── src/
│   ├── core/               # Core game systems
│   │   ├── AnimationManager.js # Animation management
│   │   ├── AssetManager.js     # Asset loading
│   │   ├── CardManager.js      # Card management
│   │   ├── GameManager.js      # Game state
│   │   └── MoveCardManager.js  # Card movement
│   ├── models/             # Game models
│   │   ├── cards/          # Card types
│   │   │   ├── character/  # Character cards
│   │   │   ├── enemy/      # Enemy cards
│   │   │   ├── weapon/     # Weapon cards
│   │   │   └── ...         # Other card types
│   │   └── items/          # Item models
│   ├── modules/            # Core modules
│   │   ├── Card.js         # Base card class
│   │   ├── CardFactory.js  # Card creation
│   │   └── Item.js         # Item system
│   ├── scenes/             # Game scenes
│   │   ├── MenuScene.js    # Main menu
│   │   ├── GameScene.js    # Main gameplay
│   │   ├── EquipScene.js   # Equipment
│   │   └── ...             # Other scenes
│   └── main.js             # Entry point
├── assets/                 # Game assets
│   ├── images/            # Image files
│   │   ├── cards/         # Card images
│   │   ├── character/     # Character sprites
│   │   ├── enemy/         # Enemy sprites
│   │   └── ui/            # UI elements
│   └── sounds/            # Audio files
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml         # Auto-deploy workflow
├── index.html             # Main HTML file
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎯 Cách chơi

1. **Menu**: Chọn "START GAME" để bắt đầu
2. **Character Selection**: Chọn nhân vật yêu thích
3. **Combat**: 
   - Click vào enemy để chọn mục tiêu
   - Click vào card để sử dụng
   - Sử dụng SPACE để kết thúc lượt
4. **Cards**:
   - ⚔️ **Attack**: Gây sát thương
   - 🛡️ **Defense**: Tăng phòng thủ
   - 🔮 **Magic**: Hiệu ứng đặc biệt
   - 💚 **Heal**: Hồi máu
   - 🎯 **Special**: Kỹ năng đặc biệt

## 🛠️ Công nghệ sử dụng

- **Phaser.js 3.70**: Game engine chính
- **ES6 Modules**: Modern JavaScript
- **Vite**: Build tool và dev server
- **HTML5 Canvas**: Rendering
- **CSS3**: Styling và animations
- **GitHub Actions**: Auto-deployment

## 🔧 Development

### Thêm card mới
1. Tạo class mới trong `src/models/cards/`
2. Thêm vào `CardFactory.js`
3. Cập nhật card types và logic

### Thêm scene mới
1. Tạo file scene trong `src/scenes/`
2. Import vào `main.js`
3. Thêm vào scene array

### Customize assets
- Thay thế images trong `assets/images/`
- Cập nhật preload trong scenes
- Điều chỉnh kích thước và scale

### Deploy thay đổi
```bash
git add .
git commit -m "Your changes"
git push origin main
# GitHub Actions sẽ tự động deploy!
```

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

## 🚀 Deploy Status

![Deploy Status](https://github.com/interface-daodung/DungeonCard/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

**Website luôn được cập nhật tự động!** 🎉
