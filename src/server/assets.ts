import { instance, next } from "./base";

export const fetchMedia = async (page = 1, limit = 20, type = "video") => {
    const { data } = await instance().get(`/v1/media`, { params: { page, limit, type } }).catch(e => next(e));
    return data?.data;
}
