export const profileMapper = (profile: any) => ({
    id: profile.id,
    userId: profile.user,
    firstName: profile.user_data.first_name,
    lastName: profile.user_data.last_name,
    username: profile.user_data.username,
    email: profile.user_data.email,
    bio: profile.bio,
    avatars: profile.gallery
})

export const listsNormalizer = (item: { id: number, name: string }) => ({
    
})