// Import các thư viện cần thiết
import sharp from 'sharp';           // Thư viện xử lý ảnh hiệu suất cao
import fs from 'fs';                 // Thư viện hệ thống file
import path from 'path';             // Thư viện xử lý đường dẫn
import { fileURLToPath } from 'url'; // Hàm để lấy đường dẫn hiện tại trong ES modules

// Lấy đường dẫn thư mục hiện tại cho ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import tất cả các danh sách tài nguyên từ AssetConstants.js
import {
    COIN_ASSETS,
    CHARACTER_ASSETS,
    CHARACTER_SPRITE_ASSETS,
    WEAPON_SWORD_ASSETS,
    WEAPON_POLEARM_ASSETS,
    WEAPON_CLAYMORE_ASSETS,
    WEAPON_CATALYST_ASSETS,
    WEAPON_BOW_ASSETS,
    ENEMY_HILICHURL_ASSETS,
    ENEMY_ABYSS_ASSETS,
    ENEMY_SLIME_ASSETS,
    ENEMY_SHROOM_ASSETS,
    ENEMY_AUTOMATONS_ASSETS,
    ENEMY_KAIRAGI_ASSETS,
    ENEMY_EREMITE_ASSETS,
    ENEMY_FATUI_ASSETS,
    ENEMY_BOSS_ASSETS,
    FOOD_ASSETS,
    TRAP_ASSETS,
    TREASURE_ASSETS,
    BOMB_ASSETS,
    EMPTY_CARD,
    ITEM_ASSETS,
    ELEMENT_ASSETS,
    WEAPON_SWORD_BADGE_ASSETS,
    WEAPON_CATALYST_BADGE_ASSETS,
    WEAPON_CLAYMORE_BADGE_ASSETS,
    WEAPON_POLEARM_BADGE_ASSETS,
    WEAPON_BOW_BADGE_ASSETS,
} from '../src/utils/AssetConstants.js';

/**
 * Hàm tính toán lưới tối ưu cho sprite sheet
 * Thuật toán tìm bố cục gần với hình vuông nhất
 * @param {number} totalFrames - Tổng số sprite
 * @param {number} frameWidth - Chiều rộng của mỗi sprite
 * @param {number} frameHeight - Chiều cao của mỗi sprite
 * @returns {object} Thông tin lưới tối ưu (cols, rows, sheetW, sheetH, ratio)
 */
function bestGrid(totalFrames, frameWidth, frameHeight) {
    let best = null;
    let minDiff = Infinity;

    for (let columns = 1; columns <= totalFrames; columns++) {
        let rows = Math.ceil(totalFrames / columns);
        let sheetWidth = columns * frameWidth;
        let sheetHeight = rows * frameHeight;
        let ratio = sheetWidth / sheetHeight;
        let diff = Math.abs(ratio - 1);

        if (diff < minDiff) {
            minDiff = diff;
            best = { columns, rows, sheetWidth, sheetHeight, ratio };
        }
    }

    return best;
}


/**
 * Hàm tạo sprite sheet từ danh sách tài nguyên
 * @param {Array} assets - Danh sách tài nguyên ảnh
 * @param {string|null} outputPath - Đường dẫn lưu sprite sheet (null để tự động lấy từ firstImagePath)
 * @param {string} sheetName - Tên của sprite sheet
 */
async function createAtlas(assets, outputPath = null, sheetName) {
    try {
        console.log(`\nĐang xử lý ${sheetName}...`);
        console.log(`Tìm thấy ${assets.length} ảnh`);

        // Kiểm tra nếu không có ảnh nào
        if (assets.length === 0) {
            console.log(`Không tìm thấy ảnh cho ${sheetName}`);
            return;
        }

        // Lấy kích thước của ảnh đầu tiên để xác định kích thước sprite
        const firstImagePath = path.join(__dirname, '..', 'public', assets[0].path);
        const firstImageMetadata = await sharp(firstImagePath).metadata();
        const spriteWidth = firstImageMetadata.width;   // Chiều rộng sprite
        const spriteHeight = firstImageMetadata.height; // Chiều cao sprite

        console.log(`Kích thước sprite: ${spriteWidth}x${spriteHeight}`);

        // Nếu outputPath không được truyền vào, tự động lấy từ thư mục assets/images
        let finalOutputPath = outputPath;
        if (!finalOutputPath) {
            const assetsImagesDir = path.dirname(path.join(__dirname, '..', 'public', assets[0].path));
            const sheetFileName = `${sheetName.toLowerCase().replace(/\s+/g, '-')}.webp`;
            finalOutputPath = path.join(assetsImagesDir, sheetFileName);
        }

        console.log(`Đường dẫn đầu ra: ${finalOutputPath}`);

        // Tính toán lưới tối ưu sử dụng hàm bestGrid
        const grid = bestGrid(assets.length, spriteWidth, spriteHeight);
        console.log(`Bố cục lưới: ${grid.columns}x${grid.rows} (${grid.sheetWidth}x${grid.sheetHeight})`);

        // Tạo canvas trống với kích thước đã tính
        const canvas = sharp({
            create: {
                width: grid.sheetWidth,      // Chiều rộng canvas
                height: grid.sheetHeight,     // Chiều cao canvas
                channels: 4,             // 4 kênh màu (RGBA)
                background: { r: 0, g: 0, b: 0, alpha: 0 } // Nền trong suốt
            }
        });

        // Chuẩn bị các thao tác ghép ảnh
        const compositeOperations = [];
        let currentIndex = 0;

        // Duyệt qua từng vị trí trong lưới theo thứ tự hàng-cột
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.columns; col++) {
                // Nếu đã hết sprite thì dừng
                if (currentIndex >= assets.length) break;

                const asset = assets[currentIndex];
                const imagePath = path.join(__dirname, '..', 'public', asset.path);

                // Kiểm tra file có tồn tại không
                if (!fs.existsSync(imagePath)) {
                    console.warn(`Cảnh báo: Không tìm thấy file: ${imagePath}`);
                    currentIndex++;
                    continue;
                }

                // Tính vị trí đặt sprite trong lưới
                const x = col * spriteWidth;   // Vị trí X
                const y = row * spriteHeight;  // Vị trí Y

                // Thêm thao tác ghép ảnh vào danh sách
                compositeOperations.push({
                    input: imagePath,  // Đường dẫn ảnh đầu vào
                    top: y,            // Vị trí Y trên canvas
                    left: x            // Vị trí X trên canvas
                });

                console.log(`  ${asset.key}: vị trí (${x}, ${y})`);
                currentIndex++;
            }
        }

        // Tạo sprite sheet bằng cách ghép tất cả ảnh
        const spriteSheet = await canvas.composite(compositeOperations).webp({ quality: 90 });

        // Lưu sprite sheet ra file
        await spriteSheet.toFile(finalOutputPath);
        console.log(`✓ Đã lưu sprite sheet: ${finalOutputPath}`);

        // Tạo file metadata JSON chứa thông tin chi tiết về sprite
        const metadata = {
            frames: {},
            meta: {
                image: path.basename(finalOutputPath),
                size: {
                    w: grid.sheetWidth,
                    h: grid.sheetHeight
                },
                scale: "1",
                path: path.relative(path.join(__dirname, '..', 'public'), finalOutputPath)
            }
        };

        // Thêm thông tin frames cho từng sprite
        assets.forEach((asset, index) => {
            // Tính vị trí của mỗi sprite trong lưới
            const row = Math.floor(index / grid.columns);
            const col = index % grid.columns;

            metadata.frames[asset.key] = {
                frame: {
                    x: col * spriteWidth,
                    y: row * spriteHeight,
                    w: spriteWidth,
                    h: spriteHeight
                }
            };
        });

        // Lưu metadata ra file JSON trong thư mục src/data/sprite_sheets
        const fileName = path.basename(finalOutputPath, '.webp');
        const metadataPath = path.join(__dirname, '..', 'src', 'data', 'atlas', `${fileName}.json`);
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        console.log(`✓ Đã lưu metadata: ${metadataPath}`);

    } catch (error) {
        console.error(`Lỗi khi tạo sprite sheet cho ${sheetName}:`, error);
    }
}

/**
 * Hàm chính của chương trình - Xử lý tất cả các loại tài nguyên
 */
async function main() {
    try {
        console.log('🎨 DungeonCard Advanced Sprite Sheet Generator');
        console.log('==============================================');

        // Tạo thư mục đầu ra cho JSON metadata nếu chưa có
        const jsonOutputDir = path.join(__dirname, '..', 'src', 'data', 'atlas');
        if (!fs.existsSync(jsonOutputDir)) {
            fs.mkdirSync(jsonOutputDir, { recursive: true });
            console.log(`Đã tạo thư mục đầu ra cho JSON: ${jsonOutputDir}`);
        }

        // Định nghĩa các nhóm tài nguyên cần xử lý
        const assetGroups = [
            { name: 'Item', assets: ITEM_ASSETS },                              // Vật phẩm
            { name: 'Element', assets: ELEMENT_ASSETS },
            { name: 'Coin', assets: COIN_ASSETS },                             // Tiền xu


            { name: 'Character', assets: CHARACTER_ASSETS },                   // Nhân vật

            { name: 'Enemy Hilichurl', assets: ENEMY_HILICHURL_ASSETS },      // Kẻ địch Hilichurl
            { name: 'Enemy Abyss', assets: ENEMY_ABYSS_ASSETS },              // Kẻ địch Abyss
            { name: 'Enemy Slime', assets: ENEMY_SLIME_ASSETS },              // Kẻ địch Slime
            { name: 'Enemy Shroom', assets: ENEMY_SHROOM_ASSETS },            // Kẻ địch Shroom
            { name: 'Enemy Automatons', assets: ENEMY_AUTOMATONS_ASSETS },    // Kẻ địch Automatons
            { name: 'Enemy Kairagi', assets: ENEMY_KAIRAGI_ASSETS },          // Kẻ địch Kairagi
            { name: 'Enemy Eremite', assets: ENEMY_EREMITE_ASSETS },          // Kẻ địch Eremite
            { name: 'Enemy Fatui', assets: ENEMY_FATUI_ASSETS },              // Kẻ địch Fatui
            { name: 'Enemy Boss', assets: ENEMY_BOSS_ASSETS },                // Kẻ địch Boss

            { name: 'Weapon Sword', assets: WEAPON_SWORD_ASSETS },             // Vũ khí kiếm
            { name: 'Weapon Polearm', assets: WEAPON_POLEARM_ASSETS },         // Vũ khí giáo
            { name: 'Weapon Claymore', assets: WEAPON_CLAYMORE_ASSETS },       // Vũ khí đại kiếm
            { name: 'Weapon Catalyst', assets: WEAPON_CATALYST_ASSETS },       // Vũ khí pháp khí
            { name: 'Weapon Bow', assets: WEAPON_BOW_ASSETS },                 // Vũ khí cung

            { name: 'Food', assets: FOOD_ASSETS },                              // Thức ăn
            { name: 'Trap', assets: TRAP_ASSETS },                              // Cảm biến
            { name: 'Treasure', assets: TREASURE_ASSETS },                      // Kho báu
            { name: 'Bomb', assets: BOMB_ASSETS },                              // Bomb

            { name: 'Weapon Sword Badge', assets: WEAPON_SWORD_BADGE_ASSETS },   // Bảng định danh vũ khí kiếm
            { name: 'Weapon Catalyst Badge', assets: WEAPON_CATALYST_BADGE_ASSETS }, // Bảng định danh vũ khí pháp khí
            { name: 'Weapon Claymore Badge', assets: WEAPON_CLAYMORE_BADGE_ASSETS },   // Bảng định danh vũ khí đại kiếm
            { name: 'Weapon Polearm Badge', assets: WEAPON_POLEARM_BADGE_ASSETS },     // Bảng định danh vũ khí giáo
            { name: 'Weapon Bow Badge', assets: WEAPON_BOW_BADGE_ASSETS }             // Bảng định danh vũ khí cung
        ];

        // Xử lý từng nhóm tài nguyên riêng biệt
        for (const group of assetGroups) {
            if (group.assets && group.assets.length > 0) {
                // Truyền null để tự động lấy vị trí từ thư mục chứa firstImagePath
                await createAtlas(group.assets, null, group.name);
            }
        }

        // Tạo sprite sheet kết hợp cho tất cả kẻ địch
        const allEnemyAssets = [
            ...ENEMY_HILICHURL_ASSETS,
            ...ENEMY_ABYSS_ASSETS,
            ...ENEMY_SLIME_ASSETS,
            ...ENEMY_SHROOM_ASSETS,
            ...ENEMY_AUTOMATONS_ASSETS,
            ...ENEMY_KAIRAGI_ASSETS,
            ...ENEMY_EREMITE_ASSETS,
            ...ENEMY_FATUI_ASSETS,
            ...ENEMY_BOSS_ASSETS
        ];

        if (allEnemyAssets.length > 0) {
            const sheetFileName = `${'All Enemies'.toLowerCase().replace(/\s+/g, '-')}.webp`;
            const finalOutputPath = path.join(path.join(__dirname, '..', 'public',
                'assets', 'images', 'cards', 'enemy'), sheetFileName);
            await createAtlas(allEnemyAssets, finalOutputPath, 'All Enemies');
        }

        // Tạo sprite sheet kết hợp cho tất cả vũ khí
        const allWeaponAssets = [
            ...WEAPON_SWORD_ASSETS,         // Spread operator để kết hợp mảng
            ...WEAPON_POLEARM_ASSETS,
            ...WEAPON_CLAYMORE_ASSETS,
            ...WEAPON_CATALYST_ASSETS,
            ...WEAPON_BOW_ASSETS
        ];

        // Tạo sprite sheet kết hợp cho tất cả weapon badges
        const allWeaponBadgeAssets = [
            ...WEAPON_SWORD_BADGE_ASSETS,
            ...WEAPON_CATALYST_BADGE_ASSETS,
            ...WEAPON_CLAYMORE_BADGE_ASSETS,
            ...WEAPON_POLEARM_BADGE_ASSETS,
            ...WEAPON_BOW_BADGE_ASSETS
        ];

        if (allWeaponBadgeAssets.length > 0) {
            const sheetFileName = `${'All Weapon Badges'.toLowerCase().replace(/\s+/g, '-')}.webp`;
            const finalOutputPath = path.join(path.join(__dirname, '..', 'public',
                'assets', 'images', 'badge'), sheetFileName);
            await createAtlas(allWeaponBadgeAssets, finalOutputPath, 'All Weapon Badges');
        }

        if (allWeaponAssets.length > 0) {
            const sheetFileName = `${'All Weapons'.toLowerCase().replace(/\s+/g, '-')}.webp`;
            const finalOutputPath = path.join(path.join(__dirname, '..', 'public',
                'assets', 'images', 'cards', 'weapon'), sheetFileName);
            await createAtlas(allWeaponAssets, finalOutputPath, 'All Weapons');
        }

        // Tạo sprite sheet kết hợp cho tất cả các thẻ
        console.log('\n🃏 Đang tạo sprite sheet kết hợp cho tất cả các thẻ...');

        const allCardAssets = [
            //coin
            ...COIN_ASSETS,

            //character
            ...CHARACTER_ASSETS,

            //weapon
            ...WEAPON_SWORD_ASSETS,
            ...WEAPON_POLEARM_ASSETS,
            ...WEAPON_CLAYMORE_ASSETS,
            ...WEAPON_CATALYST_ASSETS,
            ...WEAPON_BOW_ASSETS,

            //enemy
            ...ENEMY_HILICHURL_ASSETS,
            ...ENEMY_ABYSS_ASSETS,
            ...ENEMY_SLIME_ASSETS,
            ...ENEMY_SHROOM_ASSETS,
            ...ENEMY_AUTOMATONS_ASSETS,
            ...ENEMY_KAIRAGI_ASSETS,
            ...ENEMY_EREMITE_ASSETS,
            ...ENEMY_FATUI_ASSETS,
            ...ENEMY_BOSS_ASSETS,

            //food
            ...FOOD_ASSETS,

            //trap
            ...TRAP_ASSETS,

            //treasure
            ...TREASURE_ASSETS,

            //bomb
            ...BOMB_ASSETS
        ];

        if (allCardAssets.length > 0) {
            const sheetFileName = `${'All Cards'.toLowerCase().replace(/\s+/g, '-')}.webp`;
            const finalOutputPath = path.join(path.join(__dirname, '..', 'public',
                'assets', 'images', 'cards'), sheetFileName);
            await createAtlas(allCardAssets, finalOutputPath, 'All Cards');
        }

        console.log('\n🎉 Hoàn thành tạo sprite sheet!');
    } catch (error) {
        console.error('❌ Lỗi trong hàm main:', error);
        process.exit(1);
    }
}

// Chạy chương trình
main();
