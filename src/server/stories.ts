import { instance, next } from "./base";

export const getUserStories = async (topicId: string, userId: string) => {
  const { data } = await instance()
    .get(`/v1/stories?topicId=${topicId}&userId=${userId}&status=published`)
    .catch((e) => next(e));
  return data?.data?.edges;
};

export const fetchGallery = async () => {
  const { data } = await instance()
    .get(`/v1/galleries`)
    .catch((e) => next(e));
  return data?.data;
};