// ================================
// AUDIO MANAGEMENT SYSTEM
// ================================
// This module handles all game sounds
// Ensures sounds don't overlap and provides fallback

const GameAudio = {
    // Sound file paths (you can replace these with actual sound files)
    sounds: {
        match: '', // We'll use Web Audio API to generate sounds
        wrong: '',
        win: ''
    },

    // Audio context for generating sounds
    audioContext: null,

    // Track if audio is initialized
    initialized: false,

    /**
     * Initialize the audio system
     * Must be called after user interaction (browser requirement)
     */
    init() {
        if (this.initialized) return;

        try {
            // Create audio context for generating sounds
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('✅ Audio system initialized');
        } catch (error) {
            console.warn('⚠️ Audio not available:', error);
            this.initialized = false;
        }
    },

    /**
     * Play a match sound (happy, high-pitched)
     */
    playMatchSound() {
        if (!this.initialized) this.init();
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Happy ascending tone
            oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
            oscillator.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        } catch (error) {
            console.warn('⚠️ Error playing match sound:', error);
        }
    },

    /**
     * Play a wrong sound (gentle, not scary)
     */
    playWrongSound() {
        if (!this.initialized) this.init();
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Gentle descending tone
            oscillator.frequency.setValueAtTime(392.00, this.audioContext.currentTime); // G4
            oscillator.frequency.exponentialRampToValueAtTime(329.63, this.audioContext.currentTime + 0.1); // E4

            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.15);
        } catch (error) {
            console.warn('⚠️ Error playing wrong sound:', error);
        }
    },

    /**
     * Play a celebration sound (game complete)
     */
    playWinSound() {
        if (!this.initialized) this.init();
        if (!this.audioContext) return;

        try {
            // Play a happy melody
            const notes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
            const duration = 0.15;

            notes.forEach((freq, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                const startTime = this.audioContext.currentTime + (index * duration);
                oscillator.frequency.setValueAtTime(freq, startTime);

                gainNode.gain.setValueAtTime(0.3, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            });
        } catch (error) {
            console.warn('⚠️ Error playing win sound:', error);
        }
    },

    /**
     * Play a button click sound
     */
    playClickSound() {
        if (!this.initialized) this.init();
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
        } catch (error) {
            console.warn('⚠️ Error playing click sound:', error);
        }
    }
};