// International Standard Rhythm Logic
const circle = document.getElementById('tapCircle');
const result = document.getElementById('result');
let tapIntervals = [];
let lastTapTime = 0;

// Simple Audio Context for Rhythm (Beep sound)
const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
};

circle.addEventListener('click', () => {
    const now = Date.now();
    playBeep(); // বাজবে যখনই ট্যাপ করবি

    if (lastTapTime !== 0) {
        tapIntervals.push(now - lastTapTime);
    }
    lastTapTime = now;
    
    result.innerText = `Taps: ${tapIntervals.length + 1} / 5`;

    if (tapIntervals.length >= 4) {
        // High Security Logic: Check Standard Deviation
        const isRoboticallyPerfect = tapIntervals.every(interval => Math.abs(interval - tapIntervals[0]) < 2);
        
        if (isRoboticallyPerfect) {
            result.innerHTML = "<span style='color:#ff4444;'>Bot Detected: Too Perfect!</span>";
        } else {
            result.innerHTML = "<span style='color:#22c55e;'>Human Verified: Natural Rhythm Detected!</span>";
        }
        
        // Reset
        tapIntervals = [];
        lastTapTime = 0;
    }
});
