let tapTimes = [];
const circle = document.getElementById('tapCircle');
const result = document.getElementById('result');

circle.addEventListener('click', () => {
    const currentTime = Date.now();
    tapTimes.push(currentTime);
    
    // Feedback for tap
    result.innerText = `Taps: ${tapTimes.length} / 5`;
    
    if (tapTimes.length >= 5) {
        let variances = [];
        for (let i = 1; i < tapTimes.length; i++) {
            variances.push(tapTimes[i] - tapTimes[i-1]);
        }
        
        // Human Variance Logic: Bots are too perfect (constant ms), humans are not.
        // If the difference between any two gaps is exactly 0, it might be a bot.
        const isBot = variances.every(v => v === variances[0]);
        
        if (isBot) {
            result.innerHTML = "<span style='color: #ef4444;'>Verification Failed: Bot Detected!</span>";
        } else {
            result.innerHTML = "<span style='color: #22c55e;'>Verification Success: Human Verified!</span>";
        }
        
        // Reset after 2 seconds to try again
        setTimeout(() => {
            tapTimes = [];
            result.innerText = "Waiting for input...";
        }, 2000);
    }
});
