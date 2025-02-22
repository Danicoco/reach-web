import React, { useState } from "react";
import Input from "../../library/Input";
import Button from "../../library/Button";
import { CheckCircle, Circle, Edit } from "react-feather";
import VideoUploadForm from "../forms/VideoUploadForm";
import { getYoutubeVideos } from "../../server/assets";

type Props = {
  type: string;
  selection: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const YouTube = ({ type, selection, setCompleted }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [youtubeTracks, setYoutubeTracks] = useState<IYouTubeTrack[] | null>(
    null
  );
  const [selectedYoutubeTrack, setSelectedYoutubeTracks] =
    useState<IYouTubeTrack | null>(null);

  const youtubeSearch = async () => {
    setLoading(true);
    const data = await getYoutubeVideos(search);
    if (data?.items?.length) {
      setYoutubeTracks(data.items);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-5">
        {!showForm && (
          <div className="flex justify-between gap-3">
            <Input
              className="w-[80%]"
              placeholder="Search for your video..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              loading={loading}
              disabled={!search}
              onClick={youtubeSearch}
              className="w-[20%]"
            >
              Search
            </Button>
          </div>
        )}

        {youtubeTracks?.length && !showForm ? (
          <div className="mt-5">
            <p>Select Video</p>
            <div className="w-full h-[250px] overflow-y-scroll">
              {youtubeTracks.map((tracks) => (
                <div
                  key={tracks.id.videoId}
                  className="flex justify-between mt-3"
                  onClick={() => {
                    setSelectedYoutubeTracks((prev) =>
                      prev?.id.videoId === tracks.id.videoId ? null : tracks
                    );
                  }}
                >
                  <div className="flex gap-5">
                    <img
                      src={tracks.snippet.thumbnails.default.url}
                      className="h-[72px] w-[72px] rounded-xl"
                    />

                    <div>
                      <p className="font-bold">{tracks.snippet.title}</p>
                      <p>
                        <span>{tracks.snippet.channelTitle}</span>
                      </p>
                    </div>
                  </div>

                  {selectedYoutubeTrack?.id.videoId === tracks.id.videoId ? (
                    <CheckCircle />
                  ) : (
                    <Circle />
                  )}
                </div>
              ))}
            </div>

            {selectedYoutubeTrack?.id.videoId && (
              <Button className="mt-3" onClick={() => setShowForm(true)}>
                Proceed
              </Button>
            )}
          </div>
        ) : (
          <></>
        )}

        {showForm && (
          <div className="mt-5">
            <div className="flex justify-between mt-3">
              <div className="flex gap-5">
                <img
                  src={selectedYoutubeTrack?.snippet.thumbnails.default.url}
                  className="h-[72px] w-[72px] rounded-xl"
                />

                <div>
                  <p className="font-bold">
                    {selectedYoutubeTrack?.snippet.title}
                  </p>
                  <p>
                    <span>{selectedYoutubeTrack?.snippet.channelTitle}</span>
                  </p>
                </div>
              </div>

              <div
                onClick={() => setShowForm(false)}
                className="cursor-pointer"
              >
                <Edit />
              </div>
            </div>

            <div className="mt-3">
              {type === "video" && selection === "youtube" && (
                <VideoUploadForm
                  platform={selection}
                  title={selectedYoutubeTrack?.snippet.title || ""}
                  itemId={selectedYoutubeTrack?.id.videoId || "0"}
                  duration={10}
                  setCompleted={setCompleted}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTube;
