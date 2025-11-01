import { Game as MainGame } from './scenes/Game';
import {Game1 as MainGame1} from './scenes/Game1';
import {Game2 as MainGame2} from './scenes/Game2';
import { AUTO, Game, Types } from "phaser";

const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        width: 1920,
        height: 1265,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#FBFFCA',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 600 },
            debug: false
        }
    },
    scene: [MainGame,MainGame1,MainGame2]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
