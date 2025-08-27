// Mixin logic cho bomb cards
export const bomb = {
    // Logic cho bomb cards
    bombBehavior() {
        console.log("Bomb card behavior activated");
        return {
            type: "bomb",
            isExplosive: true,
            damage: 40,
            radius: 2
        };
    },
    
    // Method để explode bomb
    explode() {
        console.log("TODO: Bomb exploded - implement explosion logic");
        return {
            exploded: true,
            damage: 40,
            radius: 2,
            affected: []
        };
    },
    
    // Method để defuse bomb
    defuse() {
        console.log("TODO: Bomb defused - implement defuse logic");
        return {
            defused: true,
            safe: true
        };
    },
    
    // Method để get explosion timer
    getTimer() {
        console.log("TODO: Get bomb timer - implement timer logic");
        return {
            timer: 3,
            ticking: true
        };
    }
};
