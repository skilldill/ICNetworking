import { createAction } from "redux-actions";
import { Dispatch } from "redux";

import { ApiService } from "shared/http";
import { profileMapper } from "shared/utils";

export const COLLEGUES_ACTION_TYPES = {
  SET_COLLEGUES: 'COLLEGUES.SET_COLLEGUES',
  SET_LOADING: 'COLLEGUES.SET_LOADING',
  SET_PAGE: 'COLLEGUES.SET_PAGE',
  SET_FILTER: "COLLEGUES.SET_FILTER",
  SET_FILTRED_COLLEGUES: "SET_FILTRED_COLLEGUES"
}

export class ColleguesActions {
  setCollegues = createAction(COLLEGUES_ACTION_TYPES.SET_COLLEGUES);
  setLoading = createAction(COLLEGUES_ACTION_TYPES.SET_LOADING);
  setPage = createAction(COLLEGUES_ACTION_TYPES.SET_PAGE);
  setFilter = createAction(COLLEGUES_ACTION_TYPES.SET_FILTER);
  setFilterdCollegues = createAction(COLLEGUES_ACTION_TYPES.SET_FILTRED_COLLEGUES);

  fetchCollegues = (withoutLoading?: boolean) => async (disparch: Dispatch, getState: () => any) => {
    // This parametr for collegues swipe, invisibel download
    !withoutLoading && disparch(this.setLoading(true));
    
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

  filter = (filters: any) => async (dispatch: Dispatch) => {
    dispatch(this.setLoading(true));

    try {
      const {data} = await ApiService.filterProfiles(filters);
      const profiles = data.map(profileMapper);
      dispatch(this.setFilterdCollegues(profiles));
    } catch(error) {
      console.log(error.message);
    } finally {
      dispatch(this.setLoading(false));
    }
  }

  // WITHOUT DISPATCH
  matching = (profileId: number, collegueProfileId: number) => async (dispatch: Dispatch) => {
    try {
      await ApiService.matching(profileId, collegueProfileId);
    } catch (error) {
      console.log(error);
    }
  }
}

export const colleguesActions = new ColleguesActions();