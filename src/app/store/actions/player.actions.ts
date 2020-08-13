import { createAction, props } from '@ngrx/store';
import { Player } from 'src/app/interfaces/player.interface';

export const setInitialPlayer = createAction("[Player] Set initial artist", props<{player: Player}>());
export const changeArtist = createAction("[Player] change current artist");

// Add player to a game
export const addPlayer = createAction("[Player] Add player to game", props<{player: Player}>());
// Remove player from a game
export const removePlayer = createAction("[Player] Remove player from game", props<{playerToRemove: string}>());

