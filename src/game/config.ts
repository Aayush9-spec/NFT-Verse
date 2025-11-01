import { Types } from 'phaser';
import { Game } from './scenes/Game';

export const GameConfig: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0,  y: 300 },
            debug: false
        }
    },
    scene: [Game]
};
