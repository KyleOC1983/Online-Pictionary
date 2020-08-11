import { createAction, props } from '@ngrx/store';

export const selectTopic = createAction('[topicState] set current topic', props <{topic: string}>())
