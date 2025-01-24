import { decryptData } from "../helper";
import { instance, next } from "./base";

export const getRecentChats = async () => {
  const { data } = await instance()
    .get("v2/chats/recent")
    .catch((e) => next(e));

  return data?.data;
};

export const voteChat = async (payload: {
  reference: string;
  voteType?: string;
  comment?: string;
}) => {
  const { reference, ...rest } = payload;
  const { data } = await instance()
    .patch(`v2/chats/vote/${reference}`, rest)
    .catch((e) => next(e));

  return data?.data;
};

export const sendMessage = async (payload: SendMessage) => {
  const { data, headers } = await instance(import.meta.env.VITE_AI_URL, true)
    .post(`v2/chat/send-message`, payload)
    .catch((e) => next(e));
  return { data, reference: decryptData(headers["ref"]) };
};

export const getUserChats = async (
  limit: number,
  userId: string,
  sessionId: string
) => {
  const { data } = await instance()
    .get(`v2/chats?userId=${userId}&sessionId=${sessionId}&limit=${limit}`)
    .catch((e) => next(e));

  return data?.data;
};

export const getPrompt = async (type: string) => {
  const { data } = await instance()
    .get(`/v1/prompts/user-message-system?type=${type}`)
    .catch((e) => next(e));
  return data?.data;
};
