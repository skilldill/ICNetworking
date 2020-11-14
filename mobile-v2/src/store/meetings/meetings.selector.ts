import { MeetingsState } from "./meetings.model";

export const meetingsSelector = (state: any): MeetingsState => state.meetings;