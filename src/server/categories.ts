import { instance, next } from "./base";

export const getCategories = async (page = 1, limit = 10) => {
    const { data } = await instance().get(`/v1/media/category`, { params: { page, limit } }).catch(e => next(e));
    return data?.data;
}