import fs from 'fs';
import path from 'path';

// Đọc CardFactory và lấy tất cả các card classes
function getCardClassesFromFactory() {
    try {
        const cardFactoryPath = path.join(process.cwd(), 'src', 'modules', 'CardFactory.js');
        const cardFactoryContent = fs.readFileSync(cardFactoryPath, 'utf8');
        
        const cardClasses = {
            weapon: [],
            enemy: [],
            food: [],
            trap: [],
            treasure: [],
            bomb: [],
            coin: [],
            empty: []
        };
        
        // Tìm các import statements cho weapon classes
        const weaponImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/weapon\/(\w+)\.js['"`];/g);
        if (weaponImports) {
            weaponImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/weapon\/(\w+)\.js['"`];/);
                if (match) {
                    cardClasses.weapon.push({
                        className: match[1],
                        fileName: match[2] + '.js',
                        path: 'weapon'
                    });
                }
            });
        }
        
        // Tìm các import statements cho enemy classes
        const enemyImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/enemy\/(\w+)\.js['"`];/g);
        if (enemyImports) {
            enemyImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/enemy\/(\w+)\.js['"`];/);
                if (match) {
                    cardClasses.enemy.push({
                        className: match[1],
                        fileName: match[2] + '.js',
                        path: 'enemy'
                    });
                }
            });
        }
        
        // Tìm các import statements cho food classes
        const foodImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/food\/(\w+)\.js['"`];/g);
        if (foodImports) {
            foodImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/food\/(\w+)\.js['"`];/);
                if (match) {
                    cardClasses.food.push({
                        className: match[1],
                        fileName: match[2] + '.js',
                        path: 'food'
                    });
                }
            });
        }
        
        // Tìm các import statements cho trap classes
        const trapImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/trap\/(\w+)\.js['"`];/g);
        if (trapImports) {
            trapImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/trap\/(\w+)\.js['"`];/);
                if (match) {
                    cardClasses.trap.push({
                        className: match[1],
                        fileName: match[2] + '.js',
                        path: 'trap'
                    });
                }
            });
        }
        
        // Tìm các import statements cho treasure classes
        const treasureImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/treasure\/(\w+)\.js['"`];/g);
        if (treasureImports) {
            treasureImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/treasure\/(\w+)\.js['"`];/);
                if (match) {
                    cardClasses.treasure.push({
                        className: match[1],
                        fileName: match[2] + '.js',
                        path: 'treasure'
                    });
                }
            });
        }
        
        // Tìm các import statements cho bomb classes
        const bombImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/bomb\/(\w+)\.js['"`];/g);
        if (bombImports) {
            bombImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/bomb\/(\w+)\.js['"`];/);
                if (match) {
                    cardClasses.bomb.push({
                        className: match[1],
                        fileName: match[2] + '.js',
                        path: 'bomb'
                    });
                }
            });
        }
        
        // Tìm các import statements cho các class khác (Coin, Empty)
        const otherImports = cardFactoryContent.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/(\w+)\.js['"`];/g);
        if (otherImports) {
            otherImports.forEach(importStmt => {
                const match = importStmt.match(/import\s+(\w+)\s+from\s+['"`]\.\.\/models\/cards\/(\w+)\.js['"`];/);
                if (match) {
                    const className = match[1];
                    const fileName = match[2];
                    
                    if (fileName === 'Coin') {
                        cardClasses.coin.push({
                            className: className,
                            fileName: fileName + '.js',
                            path: ''
                        });
                    } else if (fileName === 'Empty') {
                        cardClasses.empty.push({
                            className: className,
                            fileName: fileName + '.js',
                            path: ''
                        });
                    }
                }
            });
        }
        
        return cardClasses;
        
    } catch (error) {
        console.error('❌ Lỗi khi đọc CardFactory.js:', error.message);
        return {};
    }
}

// Lấy DEFAULT object từ một file card - cải thiện để xử lý enemy
function extractDefaultFromFile(filePath, fileName) {
    try {
        console.log(`📖 Reading ${fileName}...`);
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Thử nhiều pattern khác nhau để tìm DEFAULT
        let defaultMatch = null;
        
        // Pattern 1: static DEFAULT với khoảng trắng và xuống dòng
        defaultMatch = fileContent.match(/static\s+DEFAULT\s*=\s*\{([\s\S]*?)\};/);
        
        // Pattern 2: DEFAULT không có static với khoảng trắng và xuống dòng
        if (!defaultMatch) {
            defaultMatch = fileContent.match(/DEFAULT\s*=\s*\{([\s\S]*?)\};/);
        }
        
        // Pattern 3: Tìm từ DEFAULT đến dấu } cuối cùng
        if (!defaultMatch) {
            const defaultIndex = fileContent.indexOf('DEFAULT');
            if (defaultIndex !== -1) {
                const fromDefault = fileContent.substring(defaultIndex);
                const braceIndex = fromDefault.lastIndexOf('}');
                if (braceIndex !== -1) {
                    const defaultPart = fromDefault.substring(0, braceIndex + 1);
                    const match = defaultPart.match(/DEFAULT\s*=\s*\{([\s\S]*?)\}/);
                    if (match) {
                        defaultMatch = match;
                    }
                }
            }
        }
        
        if (defaultMatch) {
            // Parse the DEFAULT object
            const defaultContent = `{${defaultMatch[1]}}`;
            
            // Clean up the content
            let cleanContent = defaultContent
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
                .replace(/\/\/.*$/gm, '') // Remove line comments
                .replace(/'/g, '"') // Replace single quotes with double quotes
                .replace(/(\w+):/g, '"$1":') // Add quotes to property names
                .replace(/,\s*}/g, '}') // Remove trailing commas
                .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim();
            
            try {
                const defaultObj = JSON.parse(cleanContent);
                console.log(`✅ Extracted ${defaultObj.name || fileName}`);
                return defaultObj;
            } catch (parseError) {
                console.error(`❌ JSON Parse Error in ${fileName}:`, parseError.message);
                
                // Fallback: try to extract individual properties với regex cải thiện
                const idMatch = fileContent.match(/id:\s*['"`]([^'"`]+)['"`]/);
                const nameMatch = fileContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
                const elementMatch = fileContent.match(/element:\s*['"`]([^'"`]+)['"`]/);
                const typeMatch = fileContent.match(/type:\s*['"`]([^'"`]+)['"`]/);
                const categoryMatch = fileContent.match(/category:\s*['"`]([^'"`]+)['"`]/);
                const hpMatch = fileContent.match(/hp:\s*(\d+)/);
                const descMatch = fileContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
                const rarityMatch = fileContent.match(/rarity:\s*(\d+)/);
                const clanMatch = fileContent.match(/clan:\s*['"`]([^'"`]+)['"`]/);
                
                if (idMatch && nameMatch) {
                    const fallbackObj = {
                        id: idMatch[1],
                        name: nameMatch[1],
                        element: elementMatch ? elementMatch[1] : 'none',
                        type: typeMatch ? typeMatch[1] : 'card',
                        category: categoryMatch ? categoryMatch[1] : 'none',
                        hp: hpMatch ? parseInt(hpMatch[1]) : 10,
                        description: descMatch ? descMatch[1] : `${nameMatch[1]} card`,
                        rarity: rarityMatch ? parseInt(rarityMatch[1]) : 1,
                        clan: clanMatch ? clanMatch[1] : 'none'
                    };
                    
                    console.log(`✅ Fallback extracted ${nameMatch[1]}`);
                    return fallbackObj;
                }
                
                return null;
            }
        } else {
            console.warn(`⚠️  No DEFAULT found in ${fileName}`);
            return null;
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message);
        return null;
    }
}

export async function extractAllCardData() {
    console.log('🚀 Bắt đầu trích xuất dữ liệu từ CardFactory...');
    
    const cardClasses = getCardClassesFromFactory();
    const allCardData = {
        weapon: [],
        enemy: [],
        food: [],
        trap: [],
        treasure: [],
        bomb: [],
        coin: [],
        empty: []
    };
    
    // Xử lý từng loại card
    Object.keys(cardClasses).forEach(category => {
        if (Array.isArray(cardClasses[category])) {
            cardClasses[category].forEach(cardInfo => {
                const filePath = path.join(process.cwd(), 'src', 'models', 'cards', cardInfo.path, cardInfo.fileName);
                const cardData = extractDefaultFromFile(filePath, cardInfo.fileName);
                
                if (cardData) {
                    // Không ghi đè category nếu đã có từ file
                    if (!cardData.category) {
                        cardData.category = category;
                    }
                    cardData.className = cardInfo.className;
                    allCardData[category].push(cardData);
                }
            });
        }
    });
    
    // Xử lý coin và empty nếu có (chỉ xử lý nếu chưa được xử lý trong vòng lặp trên)
    if (cardClasses.coin && cardClasses.coin.length > 0 && allCardData.coin.length === 0) {
        cardClasses.coin.forEach(cardInfo => {
            const filePath = path.join(process.cwd(), 'src', 'models', 'cards', cardInfo.fileName);
            const cardData = extractDefaultFromFile(filePath, cardInfo.fileName);
            
            if (cardData) {
                cardData.category = 'coin';
                cardData.className = cardInfo.className;
                allCardData.coin.push(cardData);
            }
        });
    }
    
    if (cardClasses.empty && cardClasses.empty.length > 0 && allCardData.empty.length === 0) {
        cardClasses.empty.forEach(cardInfo => {
            const filePath = path.join(process.cwd(), 'src', 'models', 'cards', cardInfo.fileName);
            const cardData = extractDefaultFromFile(filePath, cardInfo.fileName);
            
            if (cardData) {
                cardData.category = 'empty';
                cardData.className = cardInfo.className;
                allCardData.empty.push(cardData);
            }
        });
    }
    
    // Tổng kết
    console.log('\n📊 Tổng kết dữ liệu đã trích xuất:');
    Object.keys(allCardData).forEach(category => {
        if (allCardData[category].length > 0) {
            console.log(`  ${category}: ${allCardData[category].length} cards`);
        }
    });
    
    return allCardData;
}

// Chạy script nếu được gọi trực tiếp
if (process.argv[1] && process.argv[1].endsWith('extractCardDataComplete.js')) {
    extractAllCardData().then(data => {
        console.log('\n🎉 Hoàn thành trích xuất dữ liệu!');
        
        // Lưu dữ liệu vào file JSON để dễ xem
        const outputPath = path.join(process.cwd(), 'src', 'data', 'libraryCards.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`💾 Dữ liệu đã được lưu vào: ${outputPath}`);
        
        // Hiển thị một số ví dụ
        console.log('\n📋 Ví dụ dữ liệu đã trích xuất:');
        if (data.weapon.length > 0) {
            console.log('Weapon:', data.weapon[0]);
        }
        if (data.enemy.length > 0) {
            console.log('Enemy:', data.enemy[0]);
        }
    }).catch(error => {
        console.error('❌ Lỗi:', error);
    });
}
