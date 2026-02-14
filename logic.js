let tapTimes = [];
const circle = document.getElementById('tapCircle');
const result = document.getElementById('result');

circle.addEventListener('click', () => {
    const now = Date.now();
    tapTimes.push(now);
    
    // Audio feedback for interaction
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    osc.connect(audioCtx.destination);
    osc.start(); 
    osc.stop(audioCtx.currentTime + 0.05);

    result.innerText = `Taps: ${tapTimes.length} / 5`;

    if (tapTimes.length >= 5) {
        let gaps = [];
        for (let i = 1; i < tapTimes.length; i++) {
            gaps.push(tapTimes[i] - tapTimes[i-1]);
        }

        const avgGap = gaps.reduce((a, b) => a + b) / gaps.length;
        
        // Strict Security Thresholds
        const isTooFast = avgGap < 200; 
        const isTooSlow = avgGap > 1000;
        const isPerfectlyConsistent = gaps.every(g => Math.abs(g - gaps[0]) < 5);

        if (isTooFast) {
            result.innerHTML = "<span style='color:#f97316;'>Suspicious Speed: Access Denied</span>";
        } else if (isTooSlow) {
            result.innerHTML = "<span style='color:#f97316;'>Timeout: Please Tap Faster</span>";
        } else if (isPerfectlyConsistent) {
            result.innerHTML = "<span style='color:#ef4444;'>Bot Pattern Detected: Request Blocked</span>";
        } else {
            result.innerHTML = "<span style='color:#22c55e;'>Verification Success: Human Confirmed</span>";
        }

        // Reset system after 2.5 seconds
        setTimeout(() => { 
            tapTimes = []; 
            result.innerText = "Waiting for input..."; 
        }, 2500);
    }
});
