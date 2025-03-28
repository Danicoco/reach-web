import { useState } from "react";
import { Eye, Heart } from "react-feather";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import Button from "../../library/Button";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import {
  getMediaByID,
  getRealtedAsset,
  setFavourite,
} from "../../server/assets";
import VideoList from "../../components/shared/VideoList";
import Loading from "../../components/Loading";

const VideoDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [favourite, setFavourites] = useState(false);

  const { data, isLoading: videoLoading } = useQuery<IMedia>(
    ["assets-video-id", id],
    () => getMediaByID(String(id))
  );

  const { data: relatedData, isLoading } = useQuery<IMedia[]>(
    ["related-video-assets"],
    () => getRealtedAsset(String(id), "video")
  );

  const mutation = useMutation(setFavourite, {
    onSuccess: () => {
      queryClient.invalidateQueries("assets-video-id");
    },
    onMutate: () => {
      setFavourites((prev) => !prev);
    },
  });

  return (
    <Layout>
      {videoLoading ? (
        <Loading />
      ) : (
        <div className="sm:mx-0 ml-5">
          <Navbar />
          <div
            //   style={{ backgroundImage: `url(${data?.coverPicture})` }}
            className="w-full sm:h-[500px] h-[250px] rounded-xl"
          >
            {data?.platform?.toLowerCase() === "youtube" ? (
              <iframe
                className="w-full h-full"
                src={`${import.meta.env.VITE_PLAYER}/youtube?uri=${
                  data?.itemId
                }&access=${localStorage.getItem("access")}&height=450&mediaId=${
                  data?.id
                }`}
                title={data?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                className="w-full h-full"
                src={`${import.meta.env.VITE_PLAYER}/vimeo?uri=${
                  data?.itemId
                }&access=${localStorage.getItem("access")}&mediaId=${data?.id}`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title={data?.title}
              ></iframe>
            )}
          </div>
          <div className="my-5">
            <p className="font-semibold text-lg">{data?.title}</p>
            <div className="flex gap-3">
              <p>{data?.totalNoStreams} streams</p>
              <p className="-mt-4 -ml-1 -mr-2 text-4xl">.</p>
              <p>{data?.duration} minutes</p>
              <Eye size={15} fill="gray" className="mt-1" />
              <p>{data?.hasStreamed ? "has Streamed" : "not Streamed"}</p>
            </div>
          </div>

          <div className="sm:flex flex-wrap sm:justify-between mt-10">
            <div className="flex gap-3">
              {data?.profilePicture ? (
                <img
                  src={data?.profilePicture}
                  className="h-[50px] w-[50px] rounded-full"
                />
              ) : (
                <div className="h-[50px] w-[50px] rounded-full border-[1px] dark:bg-[#6601FF]">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-center dark:text-white">
                      {data?.owner?.split(" ")[0].charAt(0)}
                      {""}
                      {data?.owner?.split(" ")[1].charAt(0)}
                    </p>
                  </div>
                </div>
              )}
              <div>
                <p>{data?.owner}</p>
                <p>{data?.totalSubscribers} subscribers</p>
              </div>
            </div>

            <div className="flex gap-5 sm:mt-0 mt-5">
              <Button
                disabled={data?.isSubscribed}
                color={data?.isSubscribed ? "white" : "none"}
              >
                {data?.isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
              <Heart
                className="mt-1"
                size={40}
                onClick={() => mutation.mutate({ id: String(data?.id) })}
                fill={data?.isFavorite || favourite ? "red" : "white"}
                color={data?.isFavorite || favourite ? "red" : "black"}
              />
            </div>
          </div>

          <div className="my-10">
            <h3 className="text-[#6601FF] font-[600] sm:text-[20px] text-[16px] mb-3">
              Related Videos
            </h3>
            <VideoList videos={relatedData || []} isLoading={isLoading} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default VideoDetails;
