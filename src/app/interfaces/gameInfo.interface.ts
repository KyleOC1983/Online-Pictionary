import { Player } from './player.interface';

export interface GameInfo {
    gameId: string,
    artist: Player,
    users: Array<Player>,
    currentTopic: string,
    gameConfig: {
        maxRounds: number,
        maxScore: number,
        currentRound: number
    }
}