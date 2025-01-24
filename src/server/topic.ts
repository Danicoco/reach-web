import { instance, next } from "./base";

export const getDashboardData = async () => {
  const { data } = await instance()
    .get("/v1/topics/dashboard")
    .catch((e) => next(e));
  return data?.data;
};

export const fetchTopicsToVote = async () => {
  const { data } = await instance()
    .get(`/v1/vote-topic/fetch?voteable=true`)
    .catch((e) => next(e));
  return data?.data;
};

export const voteATopic = async (values: Partial<IVoteTopic>) => {
    const { data } = await instance()
      .post("/v1/vote-topic", values)
      .catch((e) => next(e));
    return data?.data;
  };
