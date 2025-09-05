import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import dynamic character extraction
import { extractCharacterData } from './extractCharacterDataDynamic.js';
// Import card data extraction
import { extractAllCardData } from './extractCardDataComplete.js';

// Main execution function
async function main() {
    try {
        console.log('🚀 Bắt đầu generate JSON files...\n');
        
        // Extract character data dynamically
        console.log('📖 Đang trích xuất dữ liệu Character...');
        const characterData = await extractCharacterData();

        // Đường dẫn đến thư mục src/data
        const dataDir = path.join(process.cwd(), 'src', 'data');
        const characterOutputFile = path.join(dataDir, 'cardCharacterList.json');

        // Tạo thư mục data nếu chưa tồn tại
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
            console.log('✅ Created directory: src/data');
        }

        // Ghi dữ liệu character vào file JSON
        const characterJsonData = JSON.stringify(characterData, null, 2);
        fs.writeFileSync(characterOutputFile, characterJsonData, 'utf8');
        
        console.log('✅ Successfully generated cardCharacterList.json');
        console.log(`📁 File location: ${characterOutputFile}`);
        console.log(`📊 Generated ${characterData.length} character cards:`);
        
        characterData.forEach((char, index) => {
            console.log(`   ${index + 1}. ${char.name} (${char.element}) - ${char.description}`);
        });
        
        console.log('\n' + '='.repeat(50) + '\n');
        
        // Extract all card data (non-character)
        console.log('📖 Đang trích xuất dữ liệu tất cả cards (không bao gồm Character)...');
        const allCardData = await extractAllCardData();
        
        // Lưu dữ liệu all cards vào file JSON
        const libraryCardsOutputFile = path.join(dataDir, 'libraryCards.json');
        const libraryCardsJsonData = JSON.stringify(allCardData, null, 2);
        fs.writeFileSync(libraryCardsOutputFile, libraryCardsJsonData, 'utf8');
        
        console.log('✅ Successfully generated libraryCards.json');
        console.log(`📁 File location: ${libraryCardsOutputFile}`);
        
        console.log('\n🎉 Hoàn thành generate tất cả JSON files!');
        console.log('📋 Files đã được tạo:');
        console.log(`   - cardCharacterList.json (${characterData.length} character cards)`);
        console.log(`   - libraryCards.json (${Object.values(allCardData).reduce((sum, arr) => sum + arr.length, 0)} total cards)`);
        
    } catch (error) {
        console.error('❌ Error generating JSON files:', error.message);
        process.exit(1);
    }
}

// Run main function
main();
