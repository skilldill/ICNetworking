export interface ProfileState {
    profile: any | null,
    userId: number | null,
    profileId: number | null,
    loading: boolean,
    status: "default" | "edit" | null
}