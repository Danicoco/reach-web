import { instance, next } from "./base";

export const getNotifications = async () => {
    const { data } = await instance().get(`/v1/notification/user`).catch(e => next(e));
    return data?.data;
}