const canvas = document.getElementById('dvtCanvas');
const ctx = canvas.getContext('2d');
const target = document.getElementById('trace-target');
const statusMsg = document.getElementById('status-msg');

let isTracing = false;
let traceData = [];
let startTime;

function initCanvas() {
    canvas.width = 300;
    canvas.height = 150;
    // Draw guide line
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(20, 75);
    ctx.lineTo(280, 75);
    ctx.stroke();
}

const startVerification = (e) => {
    isTracing = true;
    traceData = [];
    startTime = Date.now();
    statusMsg.innerText = "Tracing... Keep Steady!";
    statusMsg.style.color = "#94a3b8";
    
    // Change state after 1.5s to test human reflex
    setTimeout(() => {
        if(isTracing) {
            statusMsg.innerText = "REFLEX TEST: SLOW DOWN!";
            statusMsg.style.color = "#f59e0b";
            target.style.background = "#ef4444";
            target.style.boxShadow = "0 0 20px #ef4444";
        }
    }, 1500);
};

const trackMovement = (e) => {
    if (!isTracing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    const currentTime = Date.now() - startTime;
    
    if (traceData.length > 0) {
        const last = traceData[traceData.length - 1];
        const dist = Math.sqrt(Math.pow(x - last.x, 2) + Math.pow(y - last.y, 2));
        const dt = currentTime - last.t;
        const velocity = dist / (dt || 1);
        traceData.push({ x, y, t: currentTime, v: velocity });
    } else {
        traceData.push({ x, y, t: currentTime, v: 0 });
    }
    target.style.left = `${x - 15}px`;
    target.style.top = `${y - 15}px`;
};

const stopVerification = () => {
    if (!isTracing) return;
    isTracing = false;

    const normalPhase = traceData.filter(d => d.t < 1500);
    const reactionPhase = traceData.filter(d => d.t >= 1500 && d.t < 2500);

    const avgV1 = normalPhase.reduce((a, b) => a + b.v, 0) / (normalPhase.length || 1);
    const avgV2 = reactionPhase.reduce((a, b) => a + b.v, 0) / (reactionPhase.length || 1);
    const jitter = normalPhase.map(d => Math.abs(d.v - avgV1)).reduce((a, b) => a + b, 0) / (normalPhase.length || 1);

    // AI/Bot Detection Logic
    const hasReactionDelay = (avgV1 / (avgV2 || 0.1)) < 5; 
    const hasNaturalJitter = jitter > 0.01; 

    if (hasNaturalJitter && hasReactionDelay && traceData.length > 15) {
        statusMsg.innerText = "VERIFIED: HUMAN REFLEX DETECTED";
        statusMsg.style.color = "#22c55e";
    } else {
        statusMsg.innerText = "FAILED: BOT-LIKE PRECISION";
        statusMsg.style.color = "#ef4444";
    }
    
    target.style.background = "#3b82f6";
    target.style.boxShadow = "0 0 15px #3b82f6";
};

target.addEventListener('mousedown', startVerification);
target.addEventListener('touchstart', startVerification);
window.addEventListener('mousemove', trackMovement);
window.addEventListener('touchmove', trackMovement);
window.addEventListener('mouseup', stopVerification);
window.addEventListener('touchend', stopVerification);

initCanvas();
