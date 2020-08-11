import { createReducer, on } from '@ngrx/store';
import * as playerActions from '../actions/player.actions';

export interface PlayerState {
    artist: string,
    players: Array<string>,
};

export const initialPlayerState: PlayerState = {
    artist: "",
    players: []
};

const _playerReducer = createReducer(initialPlayerState,
    on(playerActions.setArtist, (state, {artist}) =>({...state, artist: artist})),
    on(playerActions.addPlayer, (state, {player}) => ({...state, players:[...state.players, player]})),
    on(playerActions.removePlayer, (state, {playerToRemove}) => ({...state, players: state.players.filter((player => player !== playerToRemove))})),
    on(playerActions.changeArtist, (state) => {
        let newPlayers = [...state.players, state.artist]
        let newArtist = newPlayers.shift();
        return {...state, players: newPlayers, artist: newArtist}})
    );

export function playerReducer(state, action) {
    return _playerReducer(state, action)
}