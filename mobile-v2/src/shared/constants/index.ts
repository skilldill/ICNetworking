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

export enum FilterTypeNames {
    position = "positions",
    skills = "skills",
    department = "departments",
    interest = "interests"
}

export const API_URLS = {
    // USERS
    users: "/api/users/",
    login: "/api/users/login/",
    logout: "/api/users/logout/",

    // PROFILES
    profiles: "/api/users/profiles/",
    profilePhoto: "/api/users/profiles/profile_pictures/",
    profilesFilter: "/api/users/profiles/filter_by_inline/",

    // EVENTS
    matches: "/api/events/matches/",

    //LISTS
    positions: "/api/users/positions/",
    interests: "/api/users/interests/",
    departments: "/api/users/departments/",

    //SEARCHABLE LISTS
    searchPositions: "/api/users/positions/?name__icontains=",
    searchIntersts: "/api/users/interests/?name__icontains=",
    searchDepartments: "/api/users/departments/?name__icontains=",

    //MEETINGS
    meetings: "/api/events/meetings"
}

export const DELAY_KEYBOARD = 200;

export const DATE_FORMAT = "DD-MM-YYYY";