import React from 'react';

interface RoomCodeProps {
    numbers: string;  // Should be exactly 9 digits
    onStartGame?: () => void;
    onCopyCode?: () => void;
}

const RoomCode: React.FC<RoomCodeProps> = ({ numbers = "000000000", onStartGame, onCopyCode }) => {
    // Ensure we always have 9 digits, pad with zeros if needed
    const normalizedNumbers = numbers.padEnd(9, '0').slice(0, 9);
    const numberArray = normalizedNumbers.split('');

    const renderNumberGroup = (start: number, end: number) => {
        return (
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 18.65, display: 'flex'}}>
                {numberArray.slice(start, end).map((num, index) => (
                    <div key={start + index} style={{
                        width: 109.59,
                        height: 109.59,
                        paddingLeft: 38.86,
                        paddingRight: 38.86,
                        paddingTop: 31.87,
                        paddingBottom: 31.87,
                        border: '6.22px #1F2B17 solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 7.77,
                        display: 'inline-flex'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            color: '#1F2B17',
                            fontSize: 37.31,
                            fontFamily: 'Satoshi',
                            fontWeight: '900',
                            wordWrap: 'break-word'
                        }}>
                            {num}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{
            width: '100%', 
            height: '100%', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            gap: 48, 
            display: 'inline-flex',
            fontFamily: 'Satoshi'
        }}>
            <div style={{alignSelf: 'stretch', height: 191.59, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                <img 
                    src="/assets/room_code.svg" 
                    alt="Room Code"
                    style={{
                        alignSelf: 'stretch',
                        height: 48,
                        objectFit: 'contain'
                    }}
                />
                <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 18.65, display: 'inline-flex'}}>
                    {renderNumberGroup(0, 3)}
                    <div style={{
                        width: 109.59,
                        height: 109.59,
                        paddingLeft: 38.86,
                        paddingRight: 38.86,
                        paddingTop: 31.87,
                        paddingBottom: 31.87,
                        border: '6.22px solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 7.77,
                        display: 'inline-flex'
                    }}>
                        <div style={{
                            textAlign: 'center', 
                            color: '#1F2B17', 
                            fontSize: 37.31, 
                            fontFamily: 'Satoshi',
                            fontWeight: '900',
                            wordWrap: 'break-word'
                        }}>-</div>
                    </div>
                    {renderNumberGroup(3, 6)}
                    <div style={{
                        width: 109.59,
                        height: 109.59,
                        paddingLeft: 38.86,
                        paddingRight: 38.86,
                        paddingTop: 31.87,
                        paddingBottom: 31.87,
                        border: '6.22px solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 7.77,
                        display: 'inline-flex'
                    }}>
                        <div style={{
                            textAlign: 'center', 
                            color: '#1F2B17', 
                            fontSize: 37.31, 
                            fontFamily: 'Satoshi',
                            fontWeight: '900',
                            wordWrap: 'break-word'
                        }}>-</div>
                    </div>
                    {renderNumberGroup(6, 9)}
                </div>
            </div>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 700, display: 'inline-flex'}}>
                <button 
                    onClick={onStartGame}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img 
                        src="/assets/start_game.svg" 
                        alt="Start Game"
                        style={{
                            height: 80,
                            objectFit: 'contain'
                        }}
                    />
                </button>
                <button 
                    onClick={onCopyCode}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img 
                        src="/assets/copy_code.svg" 
                        alt="Copy Code"
                        style={{
                            height: 80,
                            objectFit: 'contain'
                        }}
                    />
                </button>
            </div>
        </div>
    );
};

export default RoomCode;
