import { Action, handleActions } from "redux-actions";

import { MeetingsState } from "./meetings.model";
import { MEETINGS_ACTION_TYPES } from "./meetings.actions";

const initiaState: MeetingsState = {
    meetings: []
} 

const setMeetings = (state: MeetingsState, action: Action<any[]>): MeetingsState => ({
    ...state,
    meetings: action.payload
})

const mapReducer = {
    [MEETINGS_ACTION_TYPES.SET_MEETINGS]: setMeetings
}

export const meetingsReducer = handleActions(mapReducer, initiaState);