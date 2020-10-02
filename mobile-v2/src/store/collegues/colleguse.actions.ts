import { createAction } from "redux-actions";
import { Dispatch } from "redux";

import { ApiService } from "shared/http";

export const COLLEGUES_ACTION_TYPES = {
  setCollegues: 'COLLEGUES.SET_COLLEGUES',
  setLoading: 'COLLEGUES.SET_LOADING'
}

export class ColleguesActions {
  setCollegues = createAction(COLLEGUES_ACTION_TYPES.setCollegues);
  setLoading = createAction(COLLEGUES_ACTION_TYPES.setLoading);

  fetchCollegues = () => async (disparch: Dispatch) => {
    disparch(this.setLoading(true));

    try {
      const { data } = await ApiService.getProfiles();
      disparch(this.setCollegues(data.results));
    } catch (error) {
      console.log(error);
    } finally {
      disparch(this.setLoading(false));
    }
  }
}

export const colleguesActions = new ColleguesActions();