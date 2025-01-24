import { instance, next } from "./base";

export const getTopicQuiz = async (topicId: string) => {
  const { data } = await instance()
    .get(`/v1/quizes/quiz-topic?topicId=${topicId}`)
    .catch((e) => next(e));
  return data?.data;
};

export const answerQuiz = async (values: IQuizResult) => {
  const { data } = await instance()
    .post(`/v1/quiz-results`, values)
    .catch((e) => next(e));
  return data?.data;
};

export const addTags = async (values: Partial<IQuizResult>) => {
  const { data } = await instance()
    .post(`/v1/quiz-results/tags`, values)
    .catch((e) => next(e));
  return data?.data;
};

export const addQuizFeedback = async (values: Partial<IFeedback>) => {
  const { data } = await instance()
    .post(`/v1/feedbacks`, values)
    .catch((e) => next(e));
  return data?.data;
};

export const voteTopic = async (values: { quizId: string; topic: string }) => {
  const { data } = await instance()
    .post(`/v1/quizes/vote-topic`, values)
    .catch((e) => next(e));
  return data?.data;
};

export const retrieveDashboard = async (topicId: string) => {
  const { data } = await instance()
    .get(`/v1/quizes/live-dashboard?topicId=${topicId}`)
    .catch((e) => next(e));
  return data?.data;
};
