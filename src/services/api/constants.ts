const PER_PAGE = 9;
export const PEXELS_API_KEY = "8zIFR0ELJFyD5tyA0YTcrAj7NwA0JgCWkYUdBVsJFhKVx4z0zfetXVsj"
export const PEXELS_BASE_API = "https://api.pexels.com/v1/";
export const PEXELS_GET = `${PEXELS_BASE_API}curated?page=1&per_page=${PER_PAGE}`;
export const PEXELS_SEARCH = (query: string) => `${PEXELS_BASE_API}search?&per_page=${PER_PAGE}&&query=${query}`;
