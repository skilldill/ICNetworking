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

export const API_URLS = {
    // USERS
    users: "/api/users/",
    login: "/api/users/login/",
    logout: "/api/users/logout/",

    // PROFILES
    profiles: "/api/profiles/",
    
}