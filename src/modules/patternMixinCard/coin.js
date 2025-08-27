// Mixin logic cho coin cards
export const coin = {
    // Logic cho coin cards
    coinBehavior() {
        console.log("Coin card behavior activated");
        return {
            value: 10,
            type: "coin"
        };
    }
};
