import { instance, next } from "./base";

export const getTransactions = async (page = 1, limit = 20) => {
    const { data } = await instance().get(`/v1/wallet/transactions`, { params: { page, limit } }).catch(e => next(e));
    return data?.data;
}
