import { Dispatch } from "redux";
import { createAction, Action } from "redux-actions";
import { ApiService } from "shared/http";

export const MEETINGS_ACTION_TYPES = {
    SET_MEETINGS: "MEETINGS.SET_MEETINGS"
}

class MeetingsActions {
    setMeetings = createAction<Action<any[]>>(MEETINGS_ACTION_TYPES.SET_MEETINGS);

    fetchMeetings = () => (dispatch: Dispatch) => {}

    createMeeting = (data: { name: string, participants: number[], dateTime: string }) => async (dispatch: Dispatch) => {
        try {
            console.log(data);
            await ApiService.createMeeting(data);
        } catch(error) {
            console.log(error.message);
        }
    }
}

export const meetingsActions = new MeetingsActions();