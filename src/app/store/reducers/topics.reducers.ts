import { createReducer, on } from '@ngrx/store';
import * as topicsActions from '../actions/topics.actions'

export interface TopicState {
    currentTopic: string,
    usedTopics: string[],
    topics: string[],
};

export const initalTopicState: TopicState = {
    currentTopic: null,
    usedTopics: [],
    topics: ["Apple", "Chair", "Mouse", "Moon", "Ant", "Computer", "Book", "Pig", "Eraser", "Vase"]
};

const _topicReducer = createReducer(initalTopicState,
    on(topicsActions.selectTopic, (state) => {
        let topics = [...state.topics]
        let used = [...state.usedTopics]
        if (state.currentTopic) {
            used = [...used, state.currentTopic]
        }
        if (topics.length === 0) {
            topics = used
            used = []
        }
        const random = Math.floor(Math.random() * topics.length);
        let newTopic = topics.splice(random, 1)[0];
        return { ...state, currentTopic: newTopic, usedTopics: used, topics: topics }
    }));

export function topicsReducer(state, action) {
    return _topicReducer(state, action)
}