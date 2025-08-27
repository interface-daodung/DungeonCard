import Phaser from 'phaser';
import { GradientText } from '../utils/GradientText.js';
import { HeaderUI } from '../utils/HeaderUI.js';

// === BẢNG MÀU CHỦ ĐẠO ===
const COLOR_LIGHT = 0x96576a;      // Màu sáng (nâu nhạt) - dùng cho viền, thumb slider
const COLOR_DARK = 0x1f0614;       // Màu tối (nâu rất đậm) - dùng cho nền thẻ, track slider

export default class LibraryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LibraryScene' });
    }

    preload() {
        // Load ảnh empty cho thẻ
        this.load.image('empty', 'assets/images/cards/empty.webp');
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, 'background');

        // Thêm overlay tối để làm nổi bật màn chơi
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setAlpha(0.5);

        // Tiêu đề
        GradientText.createGameTitle(this, 'Library Cards', width / 2, height * 0.12);

        // Tạo UI header (coin và settings)
        HeaderUI.createHeaderUI(this, width, height);

        // Tạo panel con trước
        var cardPanel = this.createCardPanel();

        // Tạo scrollable panel với logic mới
        var panel = this.rexUI.add.scrollablePanel({
            // === VỊ TRÍ VÀ KÍCH THƯỚC ===
            x: width / 2,                    // Vị trí X (giữa màn hình)
            y: height * 0.52,                 // Vị trí Y (60% từ trên xuống)
            height: height * 0.7,            // Chiều cao panel (60% chiều cao màn hình)
            width: width * 0.9,

            // === CHẾ ĐỘ CUỘN ===
            scrollMode: 'y',                 // Chỉ cho phép cuộn theo chiều dọc ('y', 'x', hoặc 'xy')

            // === NỀN PANEL ===
            background: this.rexUI.add.roundRectangle({
                strokeColor: COLOR_LIGHT,    // Màu viền nền
                radius: 10                   // Độ bo góc nền
            }),

            // === PANEL NỘI DUNG ===
            panel: {
                child: cardPanel,            // Nội dung chính (grid thẻ)
                mask: { padding: 10 }        // Vùng che nội dung (padding 1px)
            },

            // === THANH CUỘN (SLIDER) ===
            slider: {
                track: this.rexUI.add.roundRectangle({
                    width: 20,               // Chiều rộng thanh track
                    radius: 10,              // Độ bo góc track
                    color: COLOR_DARK        // Màu thanh track
                }),
                thumb: this.rexUI.add.roundRectangle({
                    radius: 13,              // Độ bo góc thumb (nút kéo)
                    color: COLOR_LIGHT       // Màu thumb
                })
            },

            // === CUỘN BẰNG CHUỘT ===
            mouseWheelScroller: {
                focus: false,                // Không cần focus để cuộn
                speed: 0.1                   // Tốc độ cuộn (0.1 = chậm, 1.0 = bình thường)
            },

            // === HỖ TRỢ TOUCH ===
            touchScroll: true,               // Bật touch scroll
            touchScrollBehavior: 'pan',      // Hành vi touch scroll

            // === KHOẢNG CÁCH GIỮA CÁC PHẦN ===
            space: {
                left: 20,                    // Khoảng cách trái
                right: 20,                   // Khoảng cách phải
                top: 20,                     // Khoảng cách trên
                bottom: 20,                  // Khoảng cách dưới
                panel: 5,                    // Khoảng cách với panel
            }
        })
            .layout()

            // === THIẾT LẬP TƯƠNG TÁC CHO CHILDREN ===
            .setChildrenInteractive({
                targets: cardPanel.children  // Sử dụng tất cả cardContainer
            })

            // === XỬ LÝ CLICK EVENT ===
            .on('child.click', (child) => {
                console.log(`LibraryScene: Card clicked!`);
                console.log(`Child object:`, child);
                console.log(`Card Index: ${child.cardIndex}`);
                console.log(`Card Name: ${child.name}`);
                // child chính là card container được click
            });

        // Nút quay về Menu
        this.createBackButton(width, height);
    }


    createBackButton(width, height) {
        // Nút quay về Menu
        const backButton = this.add.text(width * 0.5, height * 0.9, 'BACK', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            backgroundColor: '#622945',
            padding: { x: 25, y: 12 }
        }).setOrigin(0.5);

        // Làm cho nút có thể click
        backButton.setInteractive({ useHandCursor: true });

        // Hiệu ứng hover
        backButton.on('pointerover', () => {
            backButton.setScale(1.1);
            backButton.setTint(0xd1d1d1);
        });

        backButton.on('pointerout', () => {
            backButton.setScale(1);
            backButton.clearTint();
        });

        // Event click
        backButton.on('pointerdown', () => {
            // Chuyển về MenuScene
            this.scene.start('MenuScene');
        });
    }

    createCardPanel() {
        // Tạo sizer chính (container dọc)
        var panel = this.rexUI.add.sizer({
            orientation: 'y',                    // Sắp xếp theo chiều dọc (y-axis)
            space: { item: 30 }                 // Khoảng cách giữa các item (10px)
        });

        // === TẠO 12 HÀNG, MỖI HÀNG 3 THẺ ===
        for (let row = 0; row < 12; row++) {
            // Tạo sizer cho mỗi hàng (container ngang)
            var rowSizer = this.rexUI.add.sizer({
                orientation: 'x',                // Sắp xếp theo chiều ngang (x-axis)
                space: { item: 30 }             // Khoảng cách giữa các thẻ (10px)
            });

            // === THÊM 3 THẺ VÀO HÀNG NÀY ===
            for (let col = 0; col < 3; col++) {
                let cardIndex = row * 3 + col;   // Tính index thẻ (0-35)
                let cardContainer = this.createCard(cardIndex + 1); // Tạo thẻ (ID từ 1-36)
                rowSizer.add(cardContainer);     // Thêm thẻ vào hàng
            }

            // Thêm hàng vào panel chính
            panel.add(rowSizer);
        }

        return panel;
    }

    createCard(cardIndex, width = 160, height = 274.3) {
        // === NỀN THẺ ===
        let background = this.rexUI.add.roundRectangle({
            x: 0, y: 0,                          // Vị trí (0,0) - sẽ được đặt bởi container
            width: width + 4,                        // Chiều rộng thẻ (từ tham số)
            height: height + 4,                      // Chiều cao thẻ (từ tham số)
            strokeColor: 0xffffff,            // Màu viền thẻ
            strokeThickness: 2,
            radius: Math.min(width, height) * 0.08, // Độ bo góc scale theo kích thước
        });

        // === ẢNH THẺ ===
        let cardImage = this.add.image(0, 0, 'eula')  // Vị trí ảnh (trên giữa thẻ)
            .setDisplaySize(width, height); // Kích thước hiển thị ảnh scale theo thẻ

        // === TÊN THẺ ===
        let text = this.add.text(0, height * 0.35, `Card ${cardIndex}`, {  // Vị trí text (dưới giữa thẻ)
            fontSize: Math.max(8, width * 0.15), // Kích thước chữ scale theo width
            fill: '#ffffff',                     // Màu chữ trắng
            fontFamily: 'Arial',                 // Font chữ
            stroke: '#000000',                   // Màu viền chữ (đen)
            strokeThickness: Math.max(1, width * 0.02) // Độ dày viền chữ scale theo width
        }).setOrigin(0.5);                       // Căn giữa text

        // === CONTAINER CHỨA TẤT CẢ ===
        let child = this.add.container()
            .setSize(width, height)              // Kích thước container (bằng kích thước thẻ)
            .add([background, cardImage, text]);  // Thêm các thành phần vào container

        // Lưu cardIndex vào container để có thể truy cập sau này
        child.cardIndex = cardIndex;
        child.name = `card_${cardIndex}`;  // Thêm name để dễ nhận diện

        return child;
    }
}