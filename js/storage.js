// ================================
// LOCAL STORAGE MANAGEMENT
// ================================
// This module handles saving and loading game progress
// Perfect for tracking high scores and last played level

const GameStorage = {
    // Key names for localStorage
    KEYS: {
        BEST_SCORE: 'memoryGame_bestScore',
        LAST_LEVEL: 'memoryGame_lastLevel',
        TOTAL_GAMES: 'memoryGame_totalGames'
    },

    /**
     * Save the best score to localStorage
     * @param {number} score - The score to save
     */
    saveBestScore(score) {
        try {
            const currentBest = this.getBestScore();
            if (score > currentBest) {
                localStorage.setItem(this.KEYS.BEST_SCORE, score.toString());
                console.log('✅ New best score saved:', score);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Error saving best score:', error);
            return false;
        }
    },

    /**
     * Get the best score from localStorage
     * @returns {number} The best score, or 0 if none exists
     */
    getBestScore() {
        try {
            const score = localStorage.getItem(this.KEYS.BEST_SCORE);
            return score ? parseInt(score, 10) : 0;
        } catch (error) {
            console.error('❌ Error loading best score:', error);
            return 0;
        }
    },

    /**
     * Save the last level played
     * @param {string} level - The level name (easy, medium, hard)
     */
    saveLastLevel(level) {
        try {
            localStorage.setItem(this.KEYS.LAST_LEVEL, level);
        } catch (error) {
            console.error('❌ Error saving last level:', error);
        }
    },

    /**
     * Get the last level played
     * @returns {string|null} The last level, or null if none exists
     */
    getLastLevel() {
        try {
            return localStorage.getItem(this.KEYS.LAST_LEVEL);
        } catch (error) {
            console.error('❌ Error loading last level:', error);
            return null;
        }
    },

    /**
     * Increment the total games played counter
     */
    incrementGamesPlayed() {
        try {
            const current = this.getTotalGames();
            localStorage.setItem(this.KEYS.TOTAL_GAMES, (current + 1).toString());
        } catch (error) {
            console.error('❌ Error incrementing games played:', error);
        }
    },

    /**
     * Get total number of games played
     * @returns {number} Total games played
     */
    getTotalGames() {
        try {
            const total = localStorage.getItem(this.KEYS.TOTAL_GAMES);
            return total ? parseInt(total, 10) : 0;
        } catch (error) {
            console.error('❌ Error loading total games:', error);
            return 0;
        }
    },

    /**
     * Clear all saved data (useful for testing or reset feature)
     */
    clearAllData() {
        try {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            console.log('✅ All game data cleared');
        } catch (error) {
            console.error('❌ Error clearing data:', error);
        }
    }
};

// Initialize best score display on page load
document.addEventListener('DOMContentLoaded', () => {
    const bestScoreElement = document.getElementById('bestScore');
    if (bestScoreElement) {
        bestScoreElement.textContent = GameStorage.getBestScore();
    }
});