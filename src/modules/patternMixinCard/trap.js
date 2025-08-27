// Mixin logic cho trap cards
export const trap = {
    // Logic cho trap cards
    trapBehavior() {
        console.log("Trap card behavior activated");
        return {
            type: "trap",
            isActive: true,
            damage: 25,
            effect: "damage"
        };
    },
    
    // Method để activate trap
    activateTrap() {
        console.log("TODO: Trap activated - implement trap logic");
        return {
            activated: true,
            damage: 25,
            effect: "damage"
        };
    },
    
    // Method để disarm trap
    disarmTrap() {
        console.log("TODO: Trap disarmed - implement disarm logic");
        return {
            disarmed: true,
            safe: true
        };
    }
};
