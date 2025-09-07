import { EventEmitter } from 'events';

/**
 * Global event manager cho game
 */
class GameEventsManager extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50); // Tăng số listener tối đa
    }

    /**
     * Emit event với data
     * @param {string} event - Tên event
     * @param {...any} args - Arguments
     */
    emit(event, ...args) {
        console.log(`GameEvent: ${event}`, args);
        super.emit(event, ...args);
    }

    /**
     * Listen for event với callback
     * @param {string} event - Tên event
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        super.on(event, callback);
    }

    /**
     * Remove event listener
     * @param {string} event - Tên event
     * @param {Function} callback - Callback function
     */
    off(event, callback) {
        super.off(event, callback);
    }
}

// Global instance
window.gameEvents = new GameEventsManager();

export default window.gameEvents;

