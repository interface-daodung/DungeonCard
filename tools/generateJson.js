import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import dynamic character extraction
import { extractCharacterData } from './extractCharacterDataDynamic.js';

// Main execution function
async function main() {
    try {
        // Extract character data dynamically
        const characterData = await extractCharacterData();

        // Đường dẫn đến thư mục src/data
        const dataDir = path.join(process.cwd(), 'src', 'data');
        const outputFile = path.join(dataDir, 'cardCharacterList.json');

        // Tạo thư mục data nếu chưa tồn tại
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
            console.log('✅ Created directory: src/data');
        }

        // Ghi dữ liệu vào file JSON
        const jsonData = JSON.stringify(characterData, null, 2);
        fs.writeFileSync(outputFile, jsonData, 'utf8');
        
        console.log('✅ Successfully generated cardCharacter.json');
        console.log(`📁 File location: ${outputFile}`);
        console.log(`📊 Generated ${characterData.length} character cards:`);
        
        characterData.forEach((char, index) => {
            console.log(`   ${index + 1}. ${char.name} (${char.element}) - ${char.description}`);
        });
        
    } catch (error) {
        console.error('❌ Error generating JSON file:', error.message);
        process.exit(1);
    }
}

// Run main function
main();
