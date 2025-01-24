import { instance, next } from "./base";

export const getTrendingTopics = async () => {
  const { data } = await instance()
    .get("v2/trending-topics")
    .catch((e) => next(e));

  return data?.data;
};
