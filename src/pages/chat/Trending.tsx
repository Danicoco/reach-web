import { useQuery } from "react-query";
import { Loader } from "react-feather";
import { useNavigate } from "react-router-dom";

import Trend from "../../assets/trend.png";
import useAppStore from "../../utils/appStore";
import { generateSession } from "../../utils/shared";
import { getTrendingTopics } from "../../server/trendingTopics";
import ChatHeader from "../../components/ChatHeader";
import OnboardingLayout from "../../components/OnboardingLayout";

const Trending = () => {
  const navigate = useNavigate();
  const setMessage = useAppStore((state) => state.setChatMessage);

  const onNavigate = (topic: string) => {
    if (localStorage.getItem("chat-key")) {
      localStorage.removeItem("chat-key");
    }
    useAppStore.setState({ fromTrending: true });
    setMessage(topic);
    navigate(`/chat/${generateSession()}`);
  };

  const { data, isLoading } = useQuery("trending", getTrendingTopics);

  return (
    <OnboardingLayout
      hide
      className="flex flex-col items-center w-full bg-[#1D2D50] min-h-screen"
      childClassName="sm:w-[500px] w-full"
    >
      <ChatHeader
        title="Trending at NYU"
        isCapitalized={false}
        classes="mb-[43px]"
      />
      {isLoading ? (
        <div className="animate-spin flex justify-center">
          <Loader color="#ffffff" />
        </div>
      ) : data?.edges?.length ? (
        <div className="max-w-[500px] mx-auto">
          <div className="flex justify-center">
            <img src={Trend} />
          </div>
          <div className="grid gap-4">
            {data?.edges
              ?.sort(
                (a: { position: number }, b: { position: number }) =>
                  b.position - a.position
              )
              .map((d: { title: string; description: string }, i: number) => (
                <div
                  className="p-3 bg-[#F5F1E6] rounded-[12px] border-b-2 border-r-[#DC9F70] cursor-pointer"
                  key={i}
                  onClick={() => onNavigate(`${d.description}`)}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <h4 className="font-[700] text-[#1D2D50] text-[14px]">
                        {d.title}
                      </h4>
                    </div>

                    <img
                      src={`${import.meta.env.VITE_S3_URL}/chat-arrow.svg`}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-[#1D2D50] text-[14px]">
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white">No trending topic at the moment.</p>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Trending;
