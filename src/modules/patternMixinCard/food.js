// Mixin logic cho food cards
export const food = {
    // Logic cho food cards với demo todo log
    foodBehavior() {
        console.log("Food card behavior activated");
        console.log("TODO: Implement food consumption logic");
        console.log("TODO: Add healing effects");
        console.log("TODO: Add buff effects");
        console.log("TODO: Add food animation");
        
        return {
            healing: 20,
            type: "food"
        };
    },
    
    // Demo method cho food
    consumeFood() {
        console.log("TODO: Food consumed - implement healing logic");
        return {
            consumed: true,
            healing: 20
        };
    }
};
