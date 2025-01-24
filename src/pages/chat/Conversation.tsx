import { Info } from "react-feather";
import { isSameDay } from "date-fns";
import { useQueries } from "react-query";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Nyc from "../../assets/nyc.gif";
import useAppStore from "../../utils/appStore";
import ChatImg from "../../components/ChatImg";
import { socketInstance } from "../../server/base";
import ChatInput from "../../components/ChatInput";
import MessageBox from "../../components/MessageBox";
import ChatHeader from "../../components/ChatHeader";
import { getCustomerDetails } from "../../utils/shared";
import VoteChat from "../../components/modals/VoteModal";
import { getPrompt, getUserChats } from "../../server/chat";
import ChatSuggestion from "../../components/ChatSuggestion";
import { encryptData, getSuggestions, decryptData } from "../../helper";

const Conversation = () => {
  const customer = getCustomerDetails();
  const chatMsg = useAppStore((state) => state.chatMessage);
  const fromTrending = useAppStore((state) => state.fromTrending);
  const setMessage = useAppStore((state) => state.setChatMessage);
  const { sessionId } = useParams();
  const hasNext = useRef<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const toScrollRef = useRef<boolean>(true);
  const socketRef = useRef<Socket>(socketInstance());
  const [chat, setChat] = useState<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatResponses, setChatResponses] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showRefresh, setShowRefresh] = useState<boolean>(false);

  const [
    { data: ins, isLoading: insLoading },
    { data: pis, isLoading: pisLoading },
  ] = useQueries([
    {
      queryKey: "instruction-prompt",
      queryFn: () => getPrompt("instruction"),
    },
    {
      queryKey: "post-instruction-prompt",
      queryFn: () => getPrompt("post-instruction"),
    },
  ]);

  const refreshPage = () => window.location.reload();

  const encrypt = (data: unknown) => {
    return encryptData(JSON.stringify(data));
  };

  const decrypt = (data: string) => {
    return JSON.parse(decryptData(data));
  };

  useEffect(() => {
    const key = localStorage.getItem("chat-key");
    const fetchChats = async () => {
      try {
        setLoading(true);
        const data = await getUserChats(
          limit,
          customer.id as string,
          sessionId as string
        );
        hasNext.current = data?.pageInfo?.hasNextPage;
        formatData(data.edges);
      } catch (error) {
        setErrorMessage("Something went wrong");
        setShowRefresh(true);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (!key && !fromTrending) {
      fetchChats();
    }
  }, [limit]);

  const handleScroll = () => {
    if (chatRef.current?.scrollTop === 0 && hasNext.current) {
      toScrollRef.current = false;
      setLimit((prev) => (prev += 10));
    }
  };

  const errorListener = () => {
    setErrorMessage(
      "Sorry! Cha Cha is currently experiencing overload. \n Please reload and try again."
    );
    setError(true);
    setShowRefresh(true);
    setLoading(false);
  };

  const aiResponseListener = (data: { data: string }) => {
    const { reference, respondedMessage } = decrypt(data?.data) as {
      reference: string;
      respondedMessage: string;
    };

    setChatResponses((prev) => {
      if (prev[prev.length - 1].type === "user") {
        return [...prev, { type: "ai", message: "", reference }];
      } else {
        return prev;
      }
    });
    setChatResponses((prev) => {
      const updated = [...prev];
      updated[prev.length - 1].message = respondedMessage;
      return updated;
    });
  };

  const responseStatusListener = (data: { data: string }) => {
    const { loading } = decrypt(data.data) as { loading: boolean };
    setLoading(loading);
  };

  useEffect(() => {
    const socket = socketRef.current;
    if (socket.disconnected) {
      socket.connect();
    }

    socket.on("connect", () => {});

    socket.on("v2-response", (data) => aiResponseListener(data));

    socket.on("GeneralError", errorListener);

    socket.on("v2-response-status", (data) => responseStatusListener(data));

    socket.on("disconnect", () => {});

    return () => {
      socket.off("v2-response", (data) => aiResponseListener(data));
      socket.off("GeneralError", errorListener);
      socket.off("v2-response-status", responseStatusListener);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const today = localStorage.getItem("today");
    if (!today) {
      localStorage.setItem("today", new Date().toISOString());
    } else {
      if (!isSameDay(new Date(today), new Date())) {
        localStorage.setItem("chatCount", "0");
      }
    }
  }, []);

  useEffect(() => {
    chatRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      chatRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (chatRef.current && toScrollRef.current) {
      setTimeout(() => {
        //@ts-ignore
        chatRef.current.scrollTop = chatRef.current?.scrollHeight;
      }, 5);
    }
  }, [chatResponses]);

  useEffect(() => {
    if (!toScrollRef.current && chatRef.current) {
      const totalHeight = chatRef.current?.scrollHeight;
      chatRef.current.scrollTop = totalHeight / 3;
    }
  }, [chatResponses]);

  useEffect(() => {
    if (chatMsg) {
      action();
    }
  }, []);

  const formatData = (arr: any) => {
    const newArr: any[] = [];
    arr
      .sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((v: any) => {
        newArr.push({
          type: "user",
          reference: v.reference,
          message: v.message,
        });
        if (v.aiResponse) {
          newArr.push({
            type: "ai",
            reference: v.reference,
            message: v.aiResponse,
            voteType: v.voteType,
          });
        }
      });

    setChatResponses(newArr);
  };

  const isCountValid = () => {
    const count = localStorage.getItem("chatCount");
    if (count?.length) {
      parseInt(count);
      if (parseInt(count) + 1 > 30) {
        return false;
      } else {
        const newCount = parseInt(count) + 1;
        localStorage.setItem("chatCount", newCount.toString());
        return true;
      }
    } else {
      localStorage.setItem("chatCount", "1");
      return true;
    }
  };

  const action = async (value = "") => {
    if (fromTrending) {
      useAppStore.setState({ fromTrending: false });
    }
    if (isCountValid()) {
      if (localStorage.getItem("chat-key")) {
        localStorage.removeItem("chat-key");
      }
      toScrollRef.current = true;
      setChatResponses((prev) => [
        ...prev,
        { type: "user", message: chat || chatMsg || value },
      ]);

      const payload = {
        message: chat || chatMsg || value,
        sessionId: sessionId as string,
        userId: customer.id,
        isFirstMessage: chatResponses.length ? false : true,
        systemMessage: localStorage.getItem("systemChat") as string,
        instruction: ins?.conf,
        postInstruction: pis?.conf,
        isPlayground: false,
        previousMessages: chatResponses.length
          ? chatResponses.slice(-10).map((item) => ({
              role: item.type === "ai" ? "system" : "user",
              content: item.message,
            }))
          : [],
      };

      setLoading(true);
      const format = encrypt(payload);
      socketRef.current.emit("v2-chat", { payload: format });
    } else {
      setErrorMessage(
        "We are glad you are enjoying Cha Cha. \n You have exhausted the coach's mind for today. \n See you bright and early tomorrow?"
      );
      setError(true);
    }

    resetInput();
  };

  const resetInput = () => {
    const element = document.getElementById("chat-prompt");
    if (element) {
      element.style.height = "auto";
      element.style.overflowY = "hidden";
      setChat("");
      setMessage("");
    }
  };

  const suggestedTopics = () => {
    return getSuggestions({
      all: "everyone",
      hobby: customer?.meta?.hobby,
      interest: customer?.meta?.interest,
      challenges: customer?.meta?.challenges,
      archetype: customer?.meta?.archetype,
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between h-screen p-4 bg-[#1D2D50] relative">
        <div className="max-w-[500px] mx-auto w-full">
          <ChatHeader title="" isCapitalized={false} />
        </div>
        {chatResponses.length <= 1 && loading ? (
          <div className="grid gap-3">
            <div className="absolute left-[50%] top-[20%] translate-x-[-50%] translate-y-[-20%] w-[300px] border border-white p-2">
              <p className="text-white text-base text-center">
                Our advanced personalization and specialized resource access
                takes extra brain power. This extra thinking makes our responses
                slower than chatGPT. Please be patient. It will be worth it!
              </p>
            </div>
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-40%] w-[300px]">
              <img src={Nyc} />
            </div>
          </div>
        ) : null}
        {localStorage.getItem("chat-key") && !chat.length ? (
          <div className="grid h-full max-w-[500px] mx-auto w-full">
            <ChatImg gap="15px" show={false} />
            {suggestedTopics().length ? (
              <div className="flex flex-col gap-2 w-full text-left overflow-x-auto justify-end">
                <p className="text-white text-base font-[500]">
                  Suggestions for you
                </p>
                <div className="flex gap-4">
                  {suggestedTopics().map((v, i) => (
                    <div
                      style={{ flex: "0 0 300px", minWidth: "200px" }}
                      key={i}
                    >
                      <ChatSuggestion
                        showArrow={false}
                        width="100%"
                        size="text-sm"
                        label={v}
                        sendChat={action}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div
          className={`max-w-[500px] mx-auto flex flex-col justify-between w-full z-10`}
        >
          <div
            ref={chatRef}
            className="max-h-[calc(100vh-220px)] my-5 overflow-y-auto flex flex-col gap-[28px]"
          >
            {chatResponses.length
              ? chatResponses.map((item, i) => (
                  <MessageBox
                    key={i}
                    disabled={error}
                    reference={item?.reference}
                    type={item.type}
                    voteType={item?.voteType}
                    content={item.message}
                    loading={insLoading || pisLoading || loading}
                  />
                ))
              : null}
          </div>
          <div className="grid gap-2">
            <ChatInput
              {...{ chat }}
              {...{ action }}
              {...{ setChat }}
              responses={chatResponses.length}
              loading={insLoading || pisLoading || loading}
              disabled={error}
            />
            <p className="text-white text-sm text-center">
              Cha Cha can make mistakes. Use your discretion.
            </p>
          </div>
        </div>
        {error ? (
          <div className="absolute left-[50%] z-50 translate-x-[-50%] bottom-[120px] bg-[#DA8E6B] rounded shadow-[#364566] shadow-sm px-3 py-2 max-w-[90%] sm:max-w-[50%] h-max w-full">
            <div className="flex items-center gap-2">
              <Info color="white" width={80} />
              <p className="text-white">{errorMessage}</p>
            </div>
            {showRefresh ? (
              <div
                className="bg-[#1D2D50] rounded-md cursor-pointer px-3 py-2 grid place-content-center w-fit mx-auto mt-3"
                onClick={refreshPage}
              >
                <p className="text-white">Reload Page</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <VoteChat />
    </>
  );
};

export default Conversation;
