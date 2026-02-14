
# PoHE Rhythm Protocol
**Proof of Human Effort (PoHE)** is a decentralized anti-bot infrastructure designed for the Web3 ecosystem, specifically for the **Arbitrum Network**.

## 🚀 The Concept
Traditional CAPTCHAs are often bypassed by advanced AI and automated scripts. PoHE introduces a **Rhythm-based Verification** system. It analyzes the micro-timing (latency variance) between user interactions to distinguish between a human and a bot.

### Why Rhythm?
- **Bots:** Execute actions with perfect mathematical precision (e.g., exactly 500ms intervals).
- **Humans:** Naturally have "imperfect" timing (e.g., 495ms, 512ms, 480ms).
- **PoHE Logic:** Our algorithm detects this natural human variance. If the timing is too perfect, access is denied.

## 🛠 Project Structure
- `index.html`: The interactive front-end interface for the verification test.
- `logic.js`: The core JavaScript engine that calculates tap latency and detects bots.
- `README.md`: Project documentation and vision.

## 📈 Future Roadmap
- [ ] Integration with Smart Contracts on Arbitrum.
- [ ] Multi-layered behavioral analysis.
- [ ] On-chain proof of humanity rewards.

---
*Developed by Rohan Islam (rohanislam967) for the Arbitrum Audit/Grant Program.*
