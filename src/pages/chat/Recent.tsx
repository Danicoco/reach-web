import { Loader } from "react-feather";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { format, isToday, isYesterday } from "date-fns";
import { truncateText } from "../../utils/shared";
import { getRecentChats } from "../../server/chat";
import OnboardingLayout from "../../components/OnboardingLayout";
import ChatHeader from "../../components/ChatHeader";
import ChatSuggestion from "../../components/ChatSuggestion";

const Recent = () => {
  const { data, isLoading } = useQuery("recent-query", getRecentChats);

  const navigate = useNavigate();

  const onNavigate = (session: string) => {
    if (localStorage.getItem("chat-key")) {
      localStorage.removeItem("chat-key");
    }
    navigate(`/chat/${session}`);
  };

  const formatDate = (dateArgs: Date) => {
    let date = "";
    if (isToday(dateArgs)) {
      date = "Today";
    } else if (isYesterday(dateArgs)) {
      date = "Yesterday";
    } else {
      date = format(dateArgs, "dd MMM yyyy");
    }

    return date;
  };

  return (
    <OnboardingLayout
      hide
      className="flex flex-col items-center w-full bg-[#1D2D50] min-h-screen"
      childClassName="sm:w-[500px] w-full"
    >
      <ChatHeader title="recent chats" classes="mb-[43px]" />
      {isLoading ? (
        <div className="animate-spin flex justify-center">
          <Loader color="#ffffff" />
        </div>
      ) : data?.chats?.length ? (
        <div className="max-w-[500px] mx-auto">
          {data?.chats
            ?.sort(
              (a: { createdAt: string }, b: { createdAt: string }) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.map(
              (
                item: {
                  createdAt: string;
                  chats: {
                    sessionId: string;
                    message: string;
                    createdAt: string;
                  }[];
                },
                i: number
              ) => (
                <div className="grid gap-[8px] mb-4" key={i}>
                  <p className="text-[#DBA270] font-[500] text-sm">
                    {formatDate(new Date(item.createdAt))}
                  </p>
                  {item.chats
                    ?.sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((v, n: number) => (
                      <div className="grid gap-3" key={n}>
                        <ChatSuggestion
                          label={truncateText(v.message, 55)}
                          key={i}
                          sendChat={() => onNavigate(v.sessionId)}
                        />
                      </div>
                    ))}
                </div>
              )
            )}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white">No recent chats.</p>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Recent;
