import * as Reducers from "./reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface RootState {
    player: Reducers.PlayerState,
    topics: Reducers.TopicState,
}

export const reducers: ActionReducerMap<RootState> = {
    player: Reducers.playerReducer,
    topics: Reducers.topicsReducer,
}