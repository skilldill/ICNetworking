import { ProfileState } from "./profile.model";

export const profileSelector = (state: any): ProfileState => state.profile;