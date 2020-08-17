export const MIN_DIFF_TOUCH = 60;
export const MIN_DIFF_SCROLL_PARTNER = 160;
export const ANGLE_COEFF = 0.1;
export const MIN_DIFF_MODAL = 100;

export enum MEETING_STATUSES {
    CONFIRMED = "CONFIRMED",
    AWAITING = "AWAITING",
}

export const DATE_FORMAT = 'DD-MM-YYYY';
export const KEY_ONBOARDING = 'isShowedOnboarding';

export const API_URLS = {
    base: process.env.REACT_APP_BASE_API_URL || "",
    auth: "/auth/local",
    interests: "/interests",
    skills: "/skills",
    userInfo: "/user-infos"
}