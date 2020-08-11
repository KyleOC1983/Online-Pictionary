import { createAction, props } from '@ngrx/store';

export const setArtist = createAction("[Player] Set initial artist", props<{artist: string}>());
export const changeArtist = createAction("[Player] change current artist");

// Add player to a game
export const addPlayer = createAction("[Player] Add player to game", props<{player: string}>());
// Remove player from a game
export const removePlayer = createAction("[Player] Remove player from game", props<{playerToRemove: string}>());

