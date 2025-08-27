import fs from 'fs';
import path from 'path';

// Mock minimal browser environment
global.window = { 
    cordova: undefined,
    devicePixelRatio: 1,
    innerWidth: 1024,
    innerHeight: 768
};
global.document = { 
    createElement: () => ({ 
        getContext: () => ({}),
        addEventListener: () => {},
        removeEventListener: () => {}
    })
};

// Get character files from CardFactory by reading the file manually
function getCharacterFiles() {
    try {
        // Đọc file CardFactory.js
        const cardFactoryPath = path.join(process.cwd(), 'src', 'modules', 'CardFactory.js');
        const cardFactoryContent = fs.readFileSync(cardFactoryPath, 'utf8');
        
        // Tìm phần characterClasses trong constructor
        const characterClassesMatch = cardFactoryContent.match(/this\.characterClasses\s*=\s*\{([\s\S]*?)\};/);
        
        if (!characterClassesMatch) {
            console.error('❌ Không tìm thấy characterClasses trong CardFactory.js');
            return [];
        }
        
        const characterClassesContent = characterClassesMatch[1];
        const characterFiles = [];
        
        // Parse các import statements để lấy tên class
        const importMatches = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/character\/(\w+)\.js['"`];/g);
        
        if (importMatches) {
            for (const importMatch of importMatches) {
                // Extract class name from import statement
                const classMatch = importMatch.match(/import\s+(\w+)\s+from/);
                if (classMatch) {
                    const className = classMatch[1];
                    const fileName = className + '.js';
                    characterFiles.push(fileName);
                }
            }
        }
        
        console.log(`📋 Tìm thấy ${characterFiles.length} character files từ CardFactory:`, characterFiles);
        return characterFiles;
        
    } catch (error) {
        console.error('❌ Lỗi khi đọc CardFactory.js:', error.message);
        // Fallback về danh sách cũ nếu có lỗi
        return [
            'Eula.js',
            'Furina.js', 
            'Mavuika.js',
            'Nahida.js',
            'Raiden.js',
            'Venti.js',
            'Zhongli.js'
        ];
    }
}

// List of character files to extract (dynamically from CardFactory)
const characterFiles = getCharacterFiles();

export async function extractCharacterData() {
    const characterData = [];
    
    for (const fileName of characterFiles) {
        try {
            console.log(`📖 Reading ${fileName}...`);
            
            // Read file content as text
            const filePath = path.join(process.cwd(), 'src', 'models', 'cards', 'character', fileName);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            // Extract DEFAULT object using regex
            const defaultMatch = fileContent.match(/static\s+DEFAULT\s*=\s*\{([\s\S]*?)\};/);
            
            if (defaultMatch) {
                // Parse the DEFAULT object
                const defaultContent = `{${defaultMatch[1]}}`;
                
                // Clean up the content (remove comments, fix quotes, etc.)
                let cleanContent = defaultContent
                    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
                    .replace(/\/\/.*$/gm, '') // Remove line comments
                    .replace(/'/g, '"') // Replace single quotes with double quotes
                    .replace(/(\w+):/g, '"$1":') // Add quotes to property names
                    .replace(/,\s*}/g, '}') // Remove trailing commas
                    .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
                    .replace(/\s+/g, ' ') // Normalize whitespace
                    .trim(); // Remove leading/trailing whitespace
                
                console.log(`🔍 Cleaned content for ${fileName}:`, cleanContent);
                
                try {
                    const defaultObj = JSON.parse(cleanContent);
                    characterData.push(defaultObj);
                    console.log(`✅ Extracted ${defaultObj.name || fileName}`);
                } catch (parseError) {
                    console.error(`❌ JSON Parse Error in ${fileName}:`, parseError.message);
                    console.error(`📝 Raw content:`, defaultContent);
                    
                    // Fallback: try to extract individual properties with better regex
                    const idMatch = fileContent.match(/id:\s*['"`]([^'"`]+)['"`]/);
                    const nameMatch = fileContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
                    const elementMatch = fileContent.match(/element:\s*['"`]([^'"`]+)['"`]/);
                    const hpMatch = fileContent.match(/hp:\s*(\d+)/);
                    const descMatch = fileContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
                    
                    // Validate required fields
                    if (!idMatch) {
                        console.error(`❌ Missing 'id' field in ${fileName}`);
                        continue;
                    }
                    if (!nameMatch) {
                        console.error(`❌ Missing 'name' field in ${fileName}`);
                        continue;
                    }
                    if (!elementMatch) {
                        console.error(`❌ Missing 'element' field in ${fileName}`);
                        continue;
                    }
                    
                    // Validate element type
                    const validElements = ['cryo', 'hydro', 'pyro', 'dendro', 'electro', 'anemo', 'geo'];
                    if (!validElements.includes(elementMatch[1])) {
                        console.error(`❌ Invalid element '${elementMatch[1]}' in ${fileName}. Valid elements: ${validElements.join(', ')}`);
                        continue;
                    }
                    
                    // Validate HP
                    const hp = hpMatch ? parseInt(hpMatch[1]) : 10;
                    if (hp < 1 || hp > 100) {
                        console.warn(`⚠️  Unusual HP value ${hp} in ${fileName}`);
                    }
                    
                    // Create fallback object
                    const fallbackObj = {
                        id: idMatch[1],
                        name: nameMatch[1],
                        element: elementMatch[1],
                        hp: hp,
                        description: descMatch ? descMatch[1] : `${nameMatch[1]} character`
                    };
                    
                    characterData.push(fallbackObj);
                    console.log(`✅ Fallback extracted ${nameMatch[1]} (${elementMatch[1]}) - HP: ${hp}`);
                }
            } else {
                console.warn(`⚠️  No DEFAULT found in ${fileName}`);
            }
            
        } catch (error) {
            console.error(`❌ Error processing ${fileName}:`, error.message);
        }
    }
    
    return characterData;
}


