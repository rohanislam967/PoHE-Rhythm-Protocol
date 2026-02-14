/**
 * PoHE Protocol: Multi-Layered Behavioral Verification
 * Layer 1: Rhythmic Pattern Analysis
 * Layer 2: Gyroscope-Based Physical Motion Recovery
 */

let tapData = [];
let isRecoveryActive = false;
let sensorAttached = false;

const tapArea = document.getElementById('tapCircle');
const statusDisplay = document.getElementById('result');

// 1. Primary Interaction Handler
tapArea.addEventListener('click', (event) => {
    if (isRecoveryActive) return;

    const timestamp = Date.now();
    tapData.push({ time: timestamp, x: event.clientX, y: event.clientY });

    triggerAudioFeedback();

    statusDisplay.innerText = `Interactions: ${tapData.length} / 5`;

    if (tapData.length >= 5) {
        executeSecurityAnalysis();
    }
});

// 2. Behavioral & Rhythmic Analysis Engine
function executeSecurityAnalysis() {
    let intervals = [];
    for (let i = 1; i < tapData.length; i++) {
        intervals.push(tapData[i].time - tapData[i - 1].time);
    }

    const averageInterval = intervals.reduce((a, b) => a + b) / intervals.length;
    const isBotPattern = intervals.every(gap => Math.abs(gap - intervals[0]) < 5);
    const isVelocityAnomaly = averageInterval < 200;

    if (isBotPattern || isVelocityAnomaly) {
        initiateMotionRecovery("Pattern Mismatch: Tilt device 30° to Verify");
    } else {
        finalizeVerification("Verification Success: Human Confirmed");
    }
}

// 3. Gyroscope-Based Recovery System (The "Unique" Layer)
function initiateMotionRecovery(message) {
    isRecoveryActive = true;
    statusDisplay.innerHTML = `<span style='color:#f97316;'>${message}</span>`;

    // Requesting Permission for iOS 13+ devices
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    activateMotionListener();
                }
            })
            .catch(console.error);
    } else {
        activateMotionListener();
    }
}

function activateMotionListener() {
    if (!sensorAttached) {
        window.addEventListener('deviceorientation', processMotionData);
        sensorAttached = true;
    }
}

// 4. Motion Data Processing (Gamma Tilt Logic)
function processMotionData(event) {
    const tiltAngle = event.gamma; // Range: -90 to 90

    if (Math.abs(tiltAngle) > 30) {
        window.removeEventListener('deviceorientation', processMotionData);
        sensorAttached = false;
        isRecoveryActive = false;
        finalizeVerification("Motion Verified: Proof of Human Effort Established");
    }
}

// 5. System Utilities
function finalizeVerification(message) {
    statusDisplay.innerHTML = `<span style='color:#22c55e;'>${message}</span>`;
    resetProtocol(4000);
}

function resetProtocol(delay) {
    setTimeout(() => {
        tapData = [];
        isRecoveryActive = false;
        statusDisplay.innerText = "System Ready: Waiting for Input";
    }, delay);
}

function triggerAudioFeedback() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        console.log("Audio feedback inhibited by browser policy.");
    }
}
