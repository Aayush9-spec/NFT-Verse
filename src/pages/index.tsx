import React, { useState } from 'react';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownBasename, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Address, Avatar, Name, Identity, EthBalance } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import RoomCode from '../components/RoomCode';
import { ethers } from 'ethers';
import JoinRoom from '../components/JoinRoom';

// Define the ABI for the GameGateway contract
const GAME_GATEWAY_ABI = [
    "function signUpUser() external",
    "function createGame(address gameInstanceAddress, uint8 gameType) external returns (uint256)",
    "function totalRooms() external view returns (uint256)",
    // Add other functions you need here
];

const GAME_GATEWAY_ADDRESS = '0x6FA05361aA892586379219524cE29B35F8eA3332'; // Replace with your contract address

// Type definition for JoinRoom component props (since it was referenced but not defined)
interface JoinRoomProps {
    onJoinRoom: (roomCode: string) => void;
}

const Home: React.FC = () => {
    const privateKey = '0x940000ee174b95ee5a5cfce2c7d8c39a5b7cb04cb5d5583a2ceb576bd5710c61';
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [showNewButtons, setShowNewButtons] = useState(false);
    const [showRoomCode, setShowRoomCode] = useState(false);
    const [showJoinRoom, setShowJoinRoom] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<'zk' | 'solidity' | null>(null);
    const [roomCode, setRoomCode] = useState<string>("000000000");
    const [loading, setLoading] = useState<boolean>(false);
    const [addressInstance, setAddressInstance] = useState<string>("");
    const [createdGame, setCreatedGame] = useState<boolean>(false);
    // Stub for JoinRoom component since it's referenced but not defined
    const JoinRoom: React.FC<JoinRoomProps> = ({ onJoinRoom }) => {
        const [code, setCode] = useState('');
        return (
            <div>
                <input 
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    placeholder="Enter Room Code" 
                />
                <button onClick={() => onJoinRoom(code)}>Join</button>
            </div>
        );
    };

    // GameGatewayService class
    class GameGatewayService {
        private contract: ethers.Contract;
        
        constructor(contractAddress: string, signer: ethers.Signer) {
            this.contract = new ethers.Contract(contractAddress, GAME_GATEWAY_ABI, signer);
        }

        // Sign up function
        async signUp(): Promise<ethers.ContractTransactionResponse | void> {
            try {
                const tx = await this.contract.signUpUser();
                console.log('Transaction sent:', tx);
                const receipt = await tx.wait();
                return receipt;
            } catch (error) {
                console.error('Signup error:', error);
                setIsGameStarted(true);
            }
        }

        async createGame(gameInstanceAddress: string, gameType: number): Promise<number> {
            try {
                const tx = await this.contract.createGame(gameInstanceAddress, gameType);
                const receipt = await tx.wait();
                
                const roomNumber = await this.contract.totalRooms();
                console.log('Room number:', roomNumber.toString());
                
                return roomNumber.toString();
            } catch (error) {
                console.error('Error creating game:', error);
                throw error;
            }
        }

        async joinGame(roomNumber: string) {
            try {
                const tx = await this.contract.joinGame(roomNumber);
                console.log('Transaction sent:', tx);
            } catch (error) {
                console.error('Error joining game:', error);
            }
        }
    }

    // Handle button click
    const handlePlayClick = async () => {
        if (loading) return; // Prevent multiple clicks while loading

        setLoading(true);
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request MetaMask connection
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

                const gameGatewayService = new GameGatewayService(GAME_GATEWAY_ADDRESS, signer);

                // Call the signUp function
                const txResponse = await gameGatewayService.signUp();
                console.log('Sign-up successful:', txResponse);
                alert('Sign-up successful! Transaction mined.');
                setIsGameStarted(true);
            } else {
                alert('MetaMask is not installed. Please install it to play.');
            }
        } catch (error) {
            console.error('Error in handlePlayClick:', error);
            alert('Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClick = () => {
        setShowNewButtons(true);
    };

    const handleTopicClick = async (topic: 'zk' | 'solidity') => {
        if (loading) return;

        setLoading(true);
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const signerAddress = await signer.getAddress();

                const gameGatewayService = new GameGatewayService(GAME_GATEWAY_ADDRESS, signer);

                // Determine game type based on topic (0 for zk, 1 for solidity)
                const gameType = topic === 'zk' ? 0 : 1;

                // Create game and get room number
                const roomNumber = await gameGatewayService.createGame("0x34797c42479CA8b332Db4ECE88F8177795cf4CBd", gameType);
                
                setSelectedTopic(topic);
                setRoomCode("179065433");

                const newABI = [
                    "function initializeGame(address creator, uint8 _gameType, uint256 _roomNumber) external",
                ];
                const Baseprovider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/9epB18aWeXPPH4GFsiiQhk8CoM1p-L6B");
                const newWallet = new ethers.Wallet(privateKey, Baseprovider);
                const newContract = new ethers.Contract("0xF77B941CfD9EfC959459643b4F17E9Ed89Bd3739", newABI, newWallet);
                const tx = await newContract.initializeGame(signerAddress, gameType, roomNumber);
                console.log('Transaction sent:', tx);
                alert('Game created successfully! on base network with hash: ' + tx.hash);
                setShowRoomCode(true);
            } else {
                alert('MetaMask is not installed. Please install it to play.');
            }
        } catch (error) {
            console.error('Error creating game:', error);
            alert('Failed to create game. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStartGame = () => {
        console.log('Starting game with code:', roomCode);
        // Add your game start logic here
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode);
        alert('Code copied to clipboard!');
    };
  
    const instances = ["0x34797c42479CA8b332Db4ECE88F8177795cf4CBd" , "0x6FA05361aA892586379219524cE29B35F8eA3332"]; // Array of instances
    let lastUsedIndex = -1; // Initialize with -1 to indicate no instance has been used yet


const loadBalancing = async () => {
    for (let i = 0; i < instances.length; i++) { // Loop to simulate multiple cycles
        // Find the next instance, skipping the last used one
        lastUsedIndex = (lastUsedIndex + 1) 
        setAddressInstance(instances[lastUsedIndex]);
    }
   
};


    const handleJoinRoom = async (enteredRoomCode: string) => {
        console.log('Joining room with code:', enteredRoomCode);
    
        if (loading) return;
    
        setLoading(true);
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
    
                const gameGatewayService = new GameGatewayService(GAME_GATEWAY_ADDRESS, signer);
    
                // Call the joinGame method
                const txReceipt = await gameGatewayService.joinGame(enteredRoomCode);
                console.log('Successfully joined room:', txReceipt);
    
                alert(`Successfully joined room: ${enteredRoomCode}`);
            } else {
                alert('MetaMask is not installed. Please install it to join a room.');
            }
        } catch (error) {
            console.error('Error in handleJoinRoom:', error);
            alert('Failed to join the room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center mt-4 bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur-md space-y-4">
                <Wallet>
                    <ConnectWallet className="flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                        <Avatar className="h-8 w-8 rounded-full" />
                        <span className="font-semibold">Connect Wallet</span>
                    </ConnectWallet>
                    <WalletDropdown>
                        <Identity className="px-4 pt-3 pb-2 text-white space-y-3 bg-gray-800 rounded-lg shadow-md">
                            <Avatar className="h-12 w-12" />
                            <Name className="font-bold text-lg" />
                            <Address className={`text-sm ${color.foregroundMuted}`} />
                            <EthBalance className="font-medium text-white/90" />
                        </Identity>
                        <WalletDropdownBasename className="text-sm text-gray-300 hover:text-white" />
                        <button className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
                            <WalletDropdownDisconnect />
                        </button>
                    </WalletDropdown>
                </Wallet>
            </div>

            <div 
                className="min-h-screen w-full"
                style={{
                    backgroundImage: `url('/assets/${isGameStarted ? 'final_bg' : 'final_bg_with_text'}.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {isGameStarted && !showNewButtons ? (
                    <div className="absolute top-1/4 left-0 w-full flex justify-center gap-32">
                        <button 
                            onClick={() => setShowJoinRoom(true)}
                            className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                            style={{
                                backgroundImage: "url('/assets/join_button.svg')",
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: 'transparent'
                            }}
                        />
                        <button 
                            onClick={handleCreateClick}
                            className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                            style={{
                                backgroundImage: "url('/assets/create_button.svg')",
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>
                ) : isGameStarted && showNewButtons ? (
                    <div className="absolute top-1/4 left-0 w-full flex flex-col items-center">
                        {!showRoomCode ? (
                            <>
                                <div className="mb-8">
                                    <img 
                                        src="/assets/select_topic.svg" 
                                        alt="Select Topic"
                                        className="w-[600px]"
                                    />
                                </div>
                                <div className="flex justify-center gap-32">
                                    <button 
                                        onClick={() => handleTopicClick('zk')}
                                        className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                                        style={{
                                            backgroundImage: "url('/assets/ZK_Math.svg')",
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                            cursor: 'pointer',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                    <button 
                                        onClick={() => handleTopicClick('solidity')}
                                        className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                                        style={{
                                            backgroundImage: "url('/assets/solidity.svg')",
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                            cursor: 'pointer',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center min-h-[20vh]">
                                <RoomCode 
                                    numbers={roomCode}
                                    onStartGame={handleStartGame}
                                    onCopyCode={handleCopyCode}
                                />
                            </div>
                        )}
                    </div>
                ) : isGameStarted && showJoinRoom ? (
                    <div className="absolute top-1/4 left-0 w-full flex justify-center items-center">
                        <JoinRoom onJoinRoom={handleJoinRoom} />
                    </div>
                ) : (
                    <button 
                        onClick={handlePlayClick}
                        className="absolute bottom-0 left-0 w-full h-1/5 transform scale-[0.2]"
                        style={{
                            backgroundImage: "url('/assets/play_game.svg')",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center bottom',
                            backgroundRepeat: 'no-repeat',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'transparent'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;