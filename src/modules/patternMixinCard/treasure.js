// Mixin logic cho treasure cards
export const treasure = {
    // Logic cho treasure cards
    treasureBehavior() {
        console.log("Treasure card behavior activated");
        return {
            type: "treasure",
            value: 50,
            rarity: "common"
        };
    },
    
    // Method để open treasure
    openTreasure() {
        console.log("TODO: Treasure opened - implement treasure logic");
        return {
            opened: true,
            value: 50,
            items: []
        };
    },
    
    // Method để get treasure value
    getTreasureValue() {
        console.log("TODO: Get treasure value - implement value calculation");
        return {
            value: 50,
            currency: "gold"
        };
    }
};
