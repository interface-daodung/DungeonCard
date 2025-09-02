// Import các thư viện cần thiết
import sharp from 'sharp';           // Thư viện xử lý ảnh hiệu suất cao
import fs from 'fs';                 // Thư viện hệ thống file
import path from 'path';             // Thư viện xử lý đường dẫn
import { fileURLToPath } from 'url'; // Hàm để lấy đường dẫn hiện tại trong ES modules

// Lấy đường dẫn thư mục hiện tại cho ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Hàm clone và resize ảnh equip.webp
 * Tạo bản sao với kích thước 256x256
 */
async function cloneAndResizeEquip() {
    try {
        console.log('🖼️  DungeonCard Equip Image Cloner & Resizer');
        console.log('=============================================');

        // Đường dẫn file gốc
        const sourcePath = path.join(__dirname, '..', 'public', 'assets', 'images', 'ui', 'equipment-slot.webp');
        
        // Đường dẫn file đích (trong thư mục assets/images)
        const targetDir = path.join(__dirname, '..', 'public', 'assets', 'images');
        const targetPath = path.join(targetDir, 'equip-256x256.webp');

        // Kiểm tra file gốc có tồn tại không
        if (!fs.existsSync(sourcePath)) {
            console.error('❌ Không tìm thấy file gốc:', sourcePath);
            return;
        }

        console.log(`📁 File gốc: ${sourcePath}`);
        console.log(`📁 File đích: ${targetPath}`);

        // Lấy thông tin ảnh gốc
        const sourceMetadata = await sharp(sourcePath).metadata();
        console.log(`📏 Kích thước gốc: ${sourceMetadata.width}x${sourceMetadata.height}`);

        // Tạo thư mục đích nếu chưa có
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
            console.log(`📁 Đã tạo thư mục: ${targetDir}`);
        }

        // Clone và resize ảnh lên 256x256
        console.log('🔄 Đang xử lý ảnh...');
        
        await sharp(sourcePath)
            .resize(256, 256, {
                fit: 'contain',        // Giữ nguyên tỷ lệ, không bị méo
                background: { r: 0, g: 0, b: 0, alpha: 0 } // Nền trong suốt
            })
            .webp({ 
                quality: 90,           // Chất lượng WebP
                effort: 6              // Mức độ nén (0-6)
            })
            .toFile(targetPath);

        console.log('✅ Hoàn thành!');
        console.log(`📁 File đã được tạo: ${targetPath}`);
        console.log(`📏 Kích thước mới: 256x256 pixels`);

        // Kiểm tra file đã tạo
        const targetMetadata = await sharp(targetPath).metadata();
        console.log(`📊 Thông tin file mới:`);
        console.log(`   - Kích thước: ${targetMetadata.width}x${targetMetadata.height}`);
        console.log(`   - Định dạng: ${targetMetadata.format}`);
        console.log(`   - Kênh màu: ${targetMetadata.channels}`);

    } catch (error) {
        console.error('❌ Lỗi khi xử lý ảnh:', error);
        process.exit(1);
    }
}

// Chạy chương trình
cloneAndResizeEquip();
