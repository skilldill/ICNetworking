import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { ApiService } from "shared/http";
import { matchesMapper } from "shared/utils";

export const MATCHES_ACTION_TYPES = {
    SET_MATCHES: "MATCHES.SET_MATCHES",
    SET_LOADING: "MATCHES.SET_LOADING",
    SET_SELECT_MODE: "MATCHES.SET_SELECT_MODE"
}

class MatchesActions {
    setMatches = createAction(MATCHES_ACTION_TYPES.SET_MATCHES);
    setLoading = createAction(MATCHES_ACTION_TYPES.SET_LOADING);
    setSelectMode = createAction(MATCHES_ACTION_TYPES.SET_SELECT_MODE);

    fetchMatches = () => async (dispatch: Dispatch) => {
        dispatch(this.setLoading(true));

        try {
            const { data } = await ApiService.getMatches();
            const profiles = matchesMapper(data.results);
            
            dispatch(this.setMatches(profiles));
        } catch(error) {
            console.log(error.message);
        } finally {
            dispatch(this.setLoading(false));
        }
    }
}

export const matchesActions = new MatchesActions();