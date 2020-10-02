import { createAction } from "redux-actions";
import { Dispatch } from "redux";

export const COLLEGUES_ACTION_TYPES = {
  setCollegues: 'COLLEGUES.SET_COLLEGUES',
  setLoading: 'COLLEGUES.SET_LOADING'
}

export class ColleguesActions {
  setCollegues = createAction(COLLEGUES_ACTION_TYPES.setCollegues);
  setLoading = createAction(COLLEGUES_ACTION_TYPES.setLoading);

  fetchCollegues = () => async (disparch: Dispatch) => {

  }
}

export const colleguesActions = new ColleguesActions();