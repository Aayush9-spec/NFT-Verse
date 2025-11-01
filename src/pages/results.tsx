import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ResultsPage: React.FC = () => {
    const [loading, setLoading] = useState(true); // To control the GIF visibility
    const [commandOutput, setCommandOutput] = useState<string | null>(null); // To store the command output
    const [proof, setProof] = useState<string | null>(null);
    const [publicData, setPublicData] = useState<string | null>(null);
    const [vkey, setVkey] = useState<string | null>(null);

    
    const readFiles = async () => {
        try {
            setLoading(true); // Show loading

        

            const newABI = [
                "function verifyProof(bytes32 programVKey,bytes calldata publicValues,bytes calldata proofBytes) external view"
            ];

            const privateKey = "0x940000ee174b95ee5a5cfce2c7d8c39a5b7cb04cb5d5583a2ceb576bd5710c61";
            const BaseProvider = new ethers.JsonRpcProvider("https://polygonzkevm-cardona.g.alchemy.com/v2/TqrkzjUbI6KAgIw1BU0TZLQnl9CN8b4T");
            const newWallet = new ethers.Wallet(privateKey, BaseProvider);
            const newContract = new ethers.Contract(
                "0xCB025A58A980b8471817613755b357E76F1c75cA",
                newABI,
                newWallet
            );

            // Properly format the public values as bytes
            const publicValuesHex = "0x01000000"
            console.log(publicValuesHex)
            const result = await newContract.verifyProof(
                "0x002ddc07f16da8f0b9216be737645ad555dd619cb70467214f56e88e5baec911", 
                publicValuesHex, 
                "0x09069090220831393bc2855b7139153556c2261ce5ac848a50cd202de8c049025d73b10308d8dcfd93f436170d2364d43b066d8725d30e320780957791229467fc04661f1536069a2f8d4667539a7ae203cd4e9019ab30cfc4e87dbb0f6d631fd4ebf48a23f56dfc77525fccbe2ae63d7cb9048c0e7f07e2429497b8bb903bcd601612d215e432f3744c8dd222b257143ac21dc32d2b3a6ce2d869b27ce0ef7ea973d3aa08ce6359d259470f60ae8ab40ca56af6bbc620290e79dc6522a216fc85a8d8672c579b049be7d253b145d059c931688a139f8c552df4aac7b77e5cdad05e54b519ec0ee7b1852037e4fbbea1fcde22626765c9188f3ba1d68c6bc7a5dd261e20"
            );

            console.log('Verification result:', result.hash);
            
        } catch (error) {
            console.error('Error reading files:', error);
        } finally {
            setLoading(false); // Hide loading
        }
    };

    useEffect(() => {
        const runCommand = async () => {
            try {
                // Start by showing the loading GIF
                setLoading(true);
                setCommandOutput(null); // Clear any previous output

                // Call your API route to run the command
                const response = await fetch('/api/runCommand');
                const data = await response.json();
                await readFiles();

                if (response.ok) {
                    // Update the output once the command finishes
                    setCommandOutput(data.output);
                    // console.log(data.output)
                    // Trigger file reading only after command succeeds

                } 
            } catch (error) {
                // Handle any fetch errors
                setCommandOutput(`Failed to execute command: ${error}`);
            } finally {
                // Hide the GIF after the command has finished
                setLoading(false);
            }
        };

        // Run the command when the component mounts
        runCommand();
    }, []); // Empty dependency array to run only once

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(180deg, #1F2B17 0%, #0A1107 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
    
                color: 'white',
                overflow: 'hidden',
                flexDirection: 'column',
            }}
        >
            {/* Fullscreen Loading GIF */}
            {loading && (
                <img
                    src="/assets/loading.gif"
                    alt="Loading..."
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        top: 0,
                        left: 0,
                    }}
                />
            )}

            {/* Display the command output */}
            {!loading && (
                <img
                src="/assets/end.svg"
                alt="Loading..."
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    top: 0,
                    left: 0,
                }}
            />
            )}
        </div>
    );
};

export default ResultsPage;
