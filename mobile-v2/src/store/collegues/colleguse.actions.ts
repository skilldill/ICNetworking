import { createAction } from "redux-actions";
import { Dispatch } from "redux";

import { ApiService } from "shared/http";
import { profileMapper } from "shared/utils";

export const COLLEGUES_ACTION_TYPES = {
  setCollegues: 'COLLEGUES.SET_COLLEGUES',
  setLoading: 'COLLEGUES.SET_LOADING',
  setPage: 'COLLEGUES.SET_PAGE'
}

export class ColleguesActions {
  setCollegues = createAction(COLLEGUES_ACTION_TYPES.setCollegues);
  setLoading = createAction(COLLEGUES_ACTION_TYPES.setLoading);
  setPage = createAction(COLLEGUES_ACTION_TYPES.setPage);

  fetchCollegues = () => async (disparch: Dispatch, getState: () => any) => {
    disparch(this.setLoading(true));
    const { page } = getState().collegues;

    try {
      const { data } = await ApiService.getProfiles(page);
      const profiles = data.results.map(profileMapper);
      disparch(this.setCollegues(profiles));

      // TEST SET PAGE
      disparch(this.setPage(page + 1));
    } catch (error) {
      console.log(error);
    } finally {
      disparch(this.setLoading(false));
    }
  }
}

export const colleguesActions = new ColleguesActions();