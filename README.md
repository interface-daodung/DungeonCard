# Dungeon Card Game

Một game card-based dungeon crawler được xây dựng với **Phaser.js 3.70** và **ES6**, sử dụng **Vite** làm build tool.

**🎮 Phiên bản hiện tại:** `4.2.0`

## 🌐 Live Demo

**🎮 Chơi ngay tại:** [https://interface-daodung.github.io/DungeonCard](https://interface-daodung.github.io/DungeonCard)

## 🎮 Tính năng

- **Card-based Combat System**: Sử dụng các lá bài để tấn công, phòng thủ và sử dụng phép thuật
- **Turn-based Gameplay**: Lối chơi theo lượt với hệ thống enemy AI thông minh
- **Player Progression**: Hệ thống level, score và stats chi tiết
- **Modern UI**: Giao diện đẹp mắt với animations và effects sử dụng RexUI
- **Responsive Design**: Tương thích với nhiều kích thước màn hình
- **Sprite Sheet Optimization**: Tối ưu hóa tài nguyên với sprite sheet tự động
- **Advanced Asset Management**: Quản lý tài nguyên hiệu quả với AssetManager
- **Animation System**: Hệ thống animation mạnh mẽ với AnimationManager
- **Weapon Trading System**: Hệ thống bán vũ khí thông minh với giá trị dựa trên độ bền

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

## 🛠️ Công cụ phát triển

### Tạo sprite sheet
```bash
# Tạo sprite sheet cho tất cả tài nguyên
npm run gen-atlas

# Tạo dữ liệu JSON cho game
npm run gendata

# Clone và resize ảnh equipment
npm run clone-equip
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
│   │   ├── AnimationManager.js # Animation management system
│   │   ├── AssetManager.js     # Asset loading & management
│   │   ├── CardManager.js      # Card management system
│   │   └── GameManager.js      # Game state management
│   ├── utils/             # Utility functions
│   │   ├── AssetConstants.js   # Asset constants & paths
│   │   ├── SpritesheetWrapper.js # Sprite sheet utilities
│   │   ├── CalculatePositionCard.js # Card positioning
│   │   ├── PriorityEmitter.js  # Event system with priority
│   │   ├── GradientButton.js   # Custom UI components
│   │   ├── GradientText.js     # Text effects
│   │   └── HeaderUI.js         # Header UI components
│   ├── models/             # Game models
│   │   ├── cards/          # Card types & implementations
│   │   │   ├── character/  # Character cards
│   │   │   ├── enemy/      # Enemy cards
│   │   │   ├── weapon/     # Weapon cards
│   │   │   └── ...         # Other card types
│   │   └── items/          # Item models
│   ├── modules/            # Core modules
│   │   ├── Card.js         # Base card class
│   │   ├── CardFactory.js  # Card creation factory
│   │   ├── Item.js         # Item system
│   │   └── typeCard/       # Card type implementations
│   │       └── character.js # Character card với weapon trading system
│   ├── scenes/             # Game scenes
│   │   ├── LoadingScene.js # Loading screen
│   │   ├── MenuScene.js    # Main menu
│   │   ├── SelectCharacterScene.js # Character selection
│   │   ├── EquipScene.js   # Equipment management
│   │   ├── LibraryScene.js # Card library
│   │   ├── MapScenes.js    # Map navigation
│   │   ├── GameScene.js    # Main gameplay với weapon trading UI
│   │   └── TestGraphicsRenderTexture.js # Testing scene
│   ├── data/               # Game data
│   │   ├── atlas/          # Sprite sheet metadata
│   │   ├── cardCharacterList.json # Character data
│   │   └── dungeonList.json # Dungeon data
│   └── main.js             # Entry point
├── tools/                  # Development tools
│   ├── generateAtlas.js    # Sprite sheet generator
│   ├── generateJson.js     # JSON data generator
│   ├── cloneAndResizeEquip.js # Image processing tool
│   ├── extractCharacterDataDynamic.js # Character data extractor
│   └── README.md           # Tools documentation
├── resources/              # Source assets
│   ├── background/         # Background images
│   ├── badge/             # Weapon badges
│   ├── cards/             # Card images
│   ├── element/           # Element icons
│   └── item/              # Item images
├── public/                 # Public assets
│   ├── assets/            # Game assets
│   │   ├── images/        # Processed images
│   │   └── sounds/        # Audio files
│   └── assets_sprite_sheet/ # Generated sprite sheets
├── dist/                   # Build output
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml         # Auto-deploy workflow
├── index.html             # Main HTML file
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎯 Cách chơi

1. **Menu**: Chọn "START GAME" để bắt đầu
2. **Character Selection**: Chọn nhân vật yêu thích từ danh sách
3. **Equipment**: Tùy chỉnh trang bị và vũ khí
4. **Library**: Xem thư viện thẻ và thông tin
5. **Map**: Chọn dungeon để khám phá
6. **Combat**: 
   - Click vào enemy để chọn mục tiêu
   - Click vào card để sử dụng
   - Sử dụng SPACE để kết thúc lượt
7. **Cards**:
   - ⚔️ **Attack**: Gây sát thương
   - 🛡️ **Defense**: Tăng phòng thủ
   - 🔮 **Magic**: Hiệu ứng đặc biệt
   - 💚 **Heal**: Hồi máu
   - 🎯 **Special**: Kỹ năng đặc biệt
8. **Weapon Trading**:
   - 🪙 **Sell Weapon**: Bán vũ khí để nhận tiền dựa trên độ bền
   - Nút bán vũ khí xuất hiện khi có vũ khí với độ bền > 0
   - Giá trị bán = độ bền hiện tại của vũ khí
   - Vũ khí mới chỉ được nhận nếu có độ bền cao hơn vũ khí hiện tại

## 🛠️ Công nghệ sử dụng

- **Phaser.js 3.70**: Game engine chính
- **RexUI Plugin**: UI components nâng cao
- **ES6 Modules**: Modern JavaScript
- **Vite 5.0**: Build tool và dev server
- **Sharp**: Image processing cho sprite sheets
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

### Weapon Trading System
Hệ thống bán vũ khí được tích hợp trong:
- **GameScene.js**: UI nút bán vũ khí với vị trí cố định
- **Character.js**: Logic xử lý vũ khí và độ bền
- **Cơ chế hoạt động**:
  - Nút xuất hiện khi character có vũ khí với độ bền > 0
  - Giá trị bán = độ bền hiện tại
  - Vũ khí mới chỉ được nhận nếu có độ bền cao hơn
  - Tự động ẩn/hiện nút dựa trên trạng thái vũ khí

### Tạo sprite sheet
```bash
# Tạo sprite sheet cho tài nguyên mới
npm run gen-atlas

# Tạo dữ liệu JSON
npm run gendata
```

### Customize assets
- Thay thế images trong `resources/`
- Chạy `npm run gen-atlas` để tạo sprite sheet
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

## 📊 Phiên bản

 **v4.2.0**: Thêm Weapon Trading System, nút bán vũ khí thông minh với giá trị dựa trên độ bền
- **v4.1.0**: Cải thiện sprite sheet system, thêm RexUI plugin, tối ưu hóa performance
- **v4.0.0**: Refactor codebase, thêm advanced asset management
- **v3.0.0**: Thêm turn-based combat system
- **v2.0.0**: Cải thiện UI/UX
- **v1.0.0**: Phiên bản đầu tiên
