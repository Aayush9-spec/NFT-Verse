import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const game = useRef<Phaser.Game | null>(null);

    useLayoutEffect(() => {
        if (game.current === null && gameContainerRef.current) {
            game.current = StartGame(gameContainerRef.current.id);

            if (typeof ref === 'function') {
                ref({ game: game.current, scene: null });
            } else if (ref) {
                ref.current = { game: game.current, scene: null };
            }

            // Handle window resize
            const handleResize = () => {
                if (game.current) {
                    game.current.scale.resize(window.innerWidth, window.innerHeight);
                }
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, [ref]);

    useEffect(() => {
        const handleSceneCreated = (scene: Phaser.Scene) => {
            if (currentActiveScene) {
                currentActiveScene(scene);
            }
            if (typeof ref === 'function') {
                ref({ game: game.current, scene });
            } else if (ref) {
                ref.current = { game: game.current, scene };
            }
        };

        EventBus.on('scene-created', handleSceneCreated);

        return () => {
            EventBus.off('scene-created', handleSceneCreated);
        };
    }, [ref, currentActiveScene]);

    return (
        <div 
            id="game-container"
            ref={gameContainerRef}
            className="w-full h-full"
            style={{ 
                touchAction: 'none',
                margin: 0,
                padding: 0,
                overflow: 'hidden'
            }}
        />
    );
});

export default PhaserGame;
