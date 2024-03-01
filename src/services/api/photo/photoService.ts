import {PEXELS_API_KEY, PEXELS_GET, PEXELS_SEARCH} from "../constants";

export const getPhotos = async () => {
    try {
        const response = await fetch(PEXELS_GET, {
            headers: {
                Authorization: `${PEXELS_API_KEY}`
            }
        });
        return await response.json();
    } catch (er) {
        return { photos : []}
    }
};

export const searchPhotos = async (query: string) => {
    try {
        const response = await fetch(PEXELS_SEARCH(query), {
            headers: {
                Authorization: `${PEXELS_API_KEY}`
            }
        });
        return await response.json();
    } catch (er) {
        return { photos : []}
    }
};
