import React from 'react';

const Home = () => {
    return (
        <div className="relative">
            <div 
                className="min-h-screen w-full"
                style={{
                    backgroundImage: "url('/assets/final_bg_with_text.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div 
                className="absolute bottom-0 left-0 w-full h-1/5 transform scale-[0.2]"
                style={{
                    backgroundImage: "url('/assets/play_game.svg')",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center bottom',
                    backgroundRepeat: 'no-repeat'
                }}
            />
        </div>
    );
};

export default Home;