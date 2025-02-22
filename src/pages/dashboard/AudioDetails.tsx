import { useState } from "react";
import { Heart, Pause } from "react-feather";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import Button from "../../library/Button";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import { PreloadTokenCheck } from "./effect";
import StreamIcon from "../../assets/sound.svg";
import PlayIcon from "../../assets/play-circle.png";
import AudioList from "../../components/shared/AudioList";
import {
  getMediaByID,
  getRealtedAsset,
  setFavourite,
} from "../../server/assets";
import SpotifyDrawer from "../../components/drawers/SpotifyDrawer";

const AudioDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [favourite, setFavourites] = useState(false);

  const { data } = useQuery<IMedia>(["assets-id", id], () =>
    getMediaByID(String(id))
  );

  const { data: relatedData, isLoading } = useQuery<IMedia[]>(
    ["related-assets"],
    () => getRealtedAsset(String(id), "audio")
  );

  const mutation = useMutation(setFavourite, {
    onSuccess: () => {
      queryClient.invalidateQueries("assets-id");
    },
    onMutate: () => {
      setFavourites(true);
    },
  });

  PreloadTokenCheck({ setToken, token });

  return (
    <Layout>
      <Navbar />
      <div className="sm:mx-0 ml-5">
        <div
          style={{ backgroundImage: `url(${data?.coverPicture})` }}
          className="w-full sm:h-[350px] h-[250px] rounded-xl"
        >
          <div className="flex items-center justify-center h-full">
            {open ? (
              <Pause size={70} color="white" />
            ) : (
              <img
                src={PlayIcon}
                className="cursor-pointer"
                onClick={() => {
                  if (token) {
                    setOpen(true)
                  } else {
                    localStorage.setItem("spy-id", `/dashboard/listen/${id}`);
                    window.open(`${
                      import.meta.env.VITE_SPOTIFY_LINK
                    }&redirect_uri=${import.meta.env.VITE_SPOTIFY_REDIRECT}${
                      import.meta.env.VITE_SPOTIFY_SCOPE
                    }`, "_blank");
                  }
                }
                }
              />
            )}
          </div>
        </div>
        <div className="my-5">
          <p className="font-semibold text-lg">{data?.title}</p>
          <div className="flex gap-3">
            <p>{data?.totalNoStreams} streams</p>
            <p className="-mt-4 -ml-1 -mr-2 text-4xl">.</p>
            <p>{data?.duration} minutes</p>
            <img src={StreamIcon} />
            <p>{data?.hasStreamed ? "has Streamed" : "not Streamed"}</p>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <div className="flex gap-3">
            {data?.profilePicture ? (
              <img
                src={data?.profilePicture}
                className="h-[50px] w-[50px] rounded-full"
              />
            ) : (
              <div className="h-[50px] w-[50px] rounded-full border-[1px] bg-[#6601FF]">
                <div className="flex items-center justify-center h-full">
                  <p className="text-center text-white">
                    {data?.owner?.split(" ")[0].charAt(0)}{" "}
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

          <div className="flex gap-5">
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

        <SpotifyDrawer
          token={token}
          open={open}
          id={String(data?.id) || "xc"}
          itemId={String(data?.itemId)}
        />

        <div className="my-10">
          <h3 className="text-[#6601FF] font-[600] sm:text-[20px] text-[16px] mb-3">
            Related Audios
          </h3>
          <AudioList audios={relatedData || []} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default AudioDetails;
