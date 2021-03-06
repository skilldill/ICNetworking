export const profileMapper = (profile: any) => ({
    id: profile.id,
    userId: profile.user,
    firstName: profile.user_data.first_name,
    lastName: profile.user_data.last_name,
    username: profile.user_data.username,
    email: profile.user_data.email,
    bio: profile.bio,
    // Так как android ругается на http, то чтобы не париться на фронте меняем на https
    avatars: profile.gallery.map(({ picture }: { picture: string }) => ({ picture: picture.replace("http", "https") })),
    positionName: profile.position_name,
    prevProfile: profile
})

export const listsNormalizer = (item: { id: number, name: string }) => ({
    
})

export const matchesMapper = (matches: any[]) => {
    const profiles = matches.map((match) => match.match_with_user_profile_data);
    return profiles.map(profileMapper);
}

export const getUniques = (arr: any[]): any[] => {
    const uniqueIds: any[] = [];
    const uniques: any[] = [];

    arr.map((item) => {
        if (!uniqueIds.includes(item.id)) {
            uniqueIds.push(item.id);
            uniques.push(item);
        }
    })

    return uniques;
}