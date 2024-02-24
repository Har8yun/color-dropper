import {PEXELS_API_KEY, PEXELS_GET, PEXELS_SEARCH} from "../constants";

export const getPhotos = async () => {
    const response = await fetch(PEXELS_GET, {
        headers: {
            Authorization: `${PEXELS_API_KEY}`
        }
    });
    return await response.json();
};

export const searchPhotos = async (query: string) => {
    const response = await fetch(PEXELS_SEARCH(query), {
        headers: {
            Authorization: `${PEXELS_API_KEY}`
        }
    });
    return await response.json();
};
