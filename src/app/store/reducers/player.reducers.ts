import { createReducer, on } from '@ngrx/store';
import * as playerActions from '../actions/player.actions';
import { Player } from 'src/app/interfaces/player.interface';

export interface PlayerState {
    artist: Player
    players: Array<Player>,
};

export const initialPlayerState: PlayerState = {
    artist: null,
    players: []
};

const _playerReducer = createReducer(initialPlayerState,
    on(playerActions.setInitialPlayer, (state, {player}) =>{
        player.isArtist = true
        player.isHost = true
        let newPlayers = [...state.players, player]
        return {...state, players: newPlayers, artist: player }
        }),
    on(playerActions.addPlayer, (state, {player}) => ({...state, players:[...state.players, player]})),
    on(playerActions.removePlayer, (state, {playerToRemove}) => ({...state, players: state.players.filter((player => player.displayName !== playerToRemove))})),
    on(playerActions.changeArtist, (state) => {
        let oldArtist: Player = {...state.artist}
        oldArtist.isArtist = false
        let newPlayers: Array<Player> = [...state.players, oldArtist]
        let newArtist: Player = newPlayers.shift();
        newArtist.isArtist = true
        return {...state, players: newPlayers, artist: newArtist}})
    );

export function playerReducer(state, action) {
    return _playerReducer(state, action)
}