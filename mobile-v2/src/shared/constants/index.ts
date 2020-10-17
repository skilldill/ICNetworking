export const ROUTES = {
    collegues: "/collegues",
    matches: "/matches",
    chats: "/chats",
    meetings: "/meetings",
    profile: "/profile/:edit",
    authorization: "/authorization",
    loadingPage: "/loading_page",

    // WITH PARAMS
    profileEdit: "/profile/edit",
    profileDefault: "/profile/default"
}

export const MAX_TOUCH_TRANSLATE = 100;

export enum StorageKeys {
    userId = "user_id",
    profileId = "profile_id",
    token = "token"
}

export enum StatusesUsing {
    default = "default",
    edit = "edit"
}

export const API_URLS = {
    // USERS
    users: "/api/users/",
    login: "/api/users/login/",
    logout: "/api/users/logout/",

    // PROFILES
    profiles: "/api/users/profiles/",
    profilePhoto: "/api/users/profiles/profile_pictures/",

    // EVENTS
    matches: "/api/events/matches/",

    //LISTS
    positions: "/api/users/positions/",
    interests: "/api/users/interests/",
    departments: "/api/users/departments/",

    //SEARCHABLE LISTS
    searchPositions: "/api/users/positions/?name_icontains=",
    searchIntersts: "/api/users/interests/?name_icontains=",
    searchDepartments: "/api/users/departments/?name_icontains="
}

export const DELAY_KEYBOARD = 200;