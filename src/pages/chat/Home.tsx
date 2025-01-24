import { useEffect } from "react";
import { Loader } from "react-feather";
import { useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import Button from "../../library/Button";
import ChatImg from "../../components/ChatImg";
//import useAppStore from "../../utils/appStore";
import { getUserMessage } from "../../server/user";
import { generateSession } from "../../utils/shared";
import ChatHeader from "../../components/ChatHeader";
import OnboardingLayout from "../../components/OnboardingLayout";
import PendingWeeklyAnswer from "../../components/modals/PendingWeeklyAnswer";
import Feedback from "../../components/modals/Feedback";
import InviteFriend from "../../components/modals/InviteFriend";

const ChatHome = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("user-message", getUserMessage);

  const startChat = () => {
    localStorage.setItem("chat-key", "msg");
    // if (!isLoading && !data?.hasAnswered) {
    //   useAppStore.setState({
    //     pendingWeeklyAnswer: { topicName: data?.topic, link: data?.link },
    //     modal: { open: true, type: "pendingWeeklyAnswer" },
    //   });
    //   return;
    // }
    navigate(`/chat/${generateSession()}`);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("systemChat", data?.systemChatMessage);
    }
  }, [data]);

  return (
    <>
      <OnboardingLayout
        className="flex flex-col items-center min-h-screen bg-[#1D2D50] py-5"
        childClassName="sm:w-[500px] w-full"
        hide
      >
        <ChatHeader
          title=""
          isCapitalized={false}
          classes="mb-[43px]"
          isHome={true}
          loading={isLoading}
          path={"/dashboard"}
        />
        {isLoading ? (
          <div className="animate-spin flex justify-center">
            <Loader color="#ffffff" />
          </div>
        ) : (
          <div className="flex flex-col gap-[70px] mt-[100px]">
            <ChatImg />
            <div>
              <div className="flex gap-5 flex-col ">
                <div className="grid grid-cols-2 gap-3 justify-between mx-auto">
                  <div
                    className="px-3 py-4 rounded-[18px] bg-[#F5F1E6] cursor-pointer col-span-1"
                    onClick={() => navigate("/recent")}
                  >
                    <div className="flex gap-1">
                      <p className="text-[13px] text-[#1D2D50]">
                        Your recent chats
                      </p>
                      <img
                        width={20}
                        src={`${import.meta.env.VITE_S3_URL}/chat-arrow.svg`}
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => navigate("/trending-topics")}
                    className="px-3 py-4 rounded-[18px] bg-[#F5F1E6] cursor-pointer col-span-1"
                  >
                    <div className="flex gap-2">
                      <p className="text-[13px] text-[#1D2D50]">
                        Trending at NYU
                      </p>
                      <img
                        width={20}
                        src={`${import.meta.env.VITE_S3_URL}/chat-arrow.svg`}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[80%] mx-auto mt-4">
                  <Button onClick={startChat} color="orange" className="w-full">
                    <p className="text-base text-[#ffffff] font-semibold">
                      Start Chat
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <PendingWeeklyAnswer />
        <Feedback />
        <InviteFriend />
      </OnboardingLayout>
    </>
  );
};

export default ChatHome;
