import { instance, next } from "./base";

export const fetchMedia = async (page = 1, limit = 20, type = "video") => {
    const { data } = await instance().get(`/v1/media/`, { params: { page, limit, type } }).catch(e => next(e));
    return data?.data;
}

export const getMediaByID = async (id: string) => {
    const { data } = await instance().get(`/v1/media/${id}`).catch(e => next(e));
    return data?.data;
}

type IAuthorize = {
    "provider": string;
    "providerData": {
        "code":string;
    }
}
export const authorize = async (values: IAuthorize) => {
    const { data } = await instance().post(`/v1/media/authorize`, values).catch(e => next(e));
    return data?.data;
}

export const getRealtedAsset = async (id: string, type = "audio", page = 1) => {
    const { data } = await instance().get(`/v1/media/${id}/related?limit=10&page=${page}&type=${type}`).catch(e => next(e));
    return data?.data;
}

export const setFavourite = async (values: { id: string }) => {
    const { data } = await instance().post(`/v1/media/favorite/${values.id}`, {}).catch(e => next(e));
    return data?.data;
}

export const getFavourites = async (page = 1, limit = 10, type = "video") => {
    const { data } = await instance().get(`/v1/media/favorite?limit=${limit}&page=${page}&type=${type}
`).catch(e => next(e));
    return data?.data;
}

export const searchAssets = async (values:  Asset) => {
    const { data } = await instance().post(`/v1/media/search`, values).catch(e => next(e));
    return data?.data;
}