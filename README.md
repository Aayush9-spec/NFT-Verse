# ChillQuest 🎮🔐

## Overview

**ChillQuest** is an innovative multiplayer learning platform designed for crypto beginners to explore and master blockchain concepts through interactive quizzes and challenges.

![image](https://github.com/user-attachments/assets/4d1c2eab-93b6-474e-8683-e20ad8094487)
![image](https://github.com/user-attachments/assets/08c4ce64-aa7b-4300-bd0e-0c617a43aaac)


## 🌟 Key Features

- **Zero-Knowledge Learning**: Explore blockchain concepts without intrusive wallet interactions
- **Seamless Onboarding**: Minimal friction with advanced SP1 proof generation
- **Skill Validation**: On-chain proof of completion
- **Collaborative Learning**: Foster knowledge exchange and community building

## 🛠️ Technology Stack

- **Frontend**: Next.js
- **Blockchain**: Ethereum, Polygon zkEVM
- **ZK Proofs**: Succinct Prover Network
- **Smart Contracts**: Solidity
- **Deployment**: Forge

## 💡 Unique Approach

ChillQuest revolutionizes blockchain learning by:
- Generating ZK proofs using Succinct Prover Network
- Aggregating level-specific ZK equality circuit proofs
- Verifying comprehensive proof via Polygon zkEVM
- Major transactions happening on fastest of L2s
- Eliminating repetitive MetaMask wallet popups

## 📚 Learning Paths

Currently supports:
- ZK Math
- Solidity Concepts

## 🎯 Use Cases

### 1. Learn & Network
- Educators and students explore blockchain concepts
- Build deeper understanding through interactive challenges

### 2. Skill Validation
- Demonstrate blockchain knowledge via on-chain proofs
- Add credibility to learning journey

### 3. Collaborative Problem-Solving
- Post-game discussions
- Share diverse solution approaches
- Enhance collective learning

## 📂 Project Structure

```
ChillQuest/
│
├── ZKvm/                   # Rust-based Succinct Prover implementation
│   └── ...
│
├── contracts/              # Blockchain contracts
│   └── Game/
│       ├── contracts/
│       ├── scripts/
│       └── tests/
│
├── frontend/               # Next.js game implementation
│   └── ...
```

## 🔨 Prerequisites

- Node.js (v18+)
- npm or yarn
- MetaMask or Web3 wallet
- Foundry (Forge)
- Hardhat

## 💻 Installation

### 1. Clone Repository
```bash
git clone https://github.com/VeerChaurasia/ChillQuest.git
cd ChillQuest
```

### 2. Install Dependencies
```bash
# Root project dependencies
npm install

# Frontend dependencies
cd frontend
npm install

# Contracts dependencies
cd ../contracts/Game
forge install
```

## 🏗️ Smart Contract Development

### Forge Commands
```bash
# Install dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test

# Deploy contracts
forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

### Hardhat Commands (Currently Unavalible)
```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy contracts
npx hardhat run scripts/deploy.js --network <network-name>
```

## 🖥️ Frontend Development
```bash
# Start development server
cd frontend
npm run dev

# Build for production
npm run build

# Deploy to production
npm run deploy
```

## 🔐 Environment Variables

Create `.env` files with:
- `PRIVATE_KEY`
- `RPC_URL`
- `ALCHEMY_API_KEY`
- Other blockchain/deployment credentials

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


**Happy Learning with ChillQuest! 🚀🧠**
