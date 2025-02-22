import React, { useState } from "react";
import { getVimeoVideos } from "../../server/assets";
import Button from "../../library/Button";
import VideoUploadForm from "../forms/VideoUploadForm";
import Input from "../../library/Input";
import { CheckCircle, Circle, Edit } from "react-feather";

type Props = {
  type: string;
  selection: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Vimeo = ({ type, selection, setCompleted }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [vimeoTracks, setVimeoTracks] = useState<IVimeoTrack[] | null>(null);
  const [selectedVimeoTrack, setSelectedVimeoTracks] =
    useState<IVimeoTrack | null>(null);

  const vimeoSearch = async () => {
    setLoading(true);
    const data = await getVimeoVideos(search);
    if (data?.data?.length) {
      setVimeoTracks(data.data);
    }
    setLoading(false);
  };

  return (
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
            disabled={!search}
            onClick={vimeoSearch}
            loading={loading}
            className="w-[20%]"
          >
            Search
          </Button>
        </div>
      )}

      {vimeoTracks?.length && !showForm ? (
        <div className="mt-5">
          <p>Select Video</p>
          <div className="w-full h-[250px] overflow-y-scroll">
            {vimeoTracks.map((tracks) => (
              <div
                key={tracks.uri}
                className="flex justify-between mt-3"
                onClick={() => {
                  setSelectedVimeoTracks((prev) =>
                    prev?.uri === tracks.uri ? null : tracks
                  );
                }}
              >
                <div className="flex gap-5">
                  <img
                    src={tracks.pictures.base_link}
                    className="h-[72px] w-[72px] rounded-xl"
                  />

                  <div>
                    <p className="font-bold">{tracks.name}</p>
                    <p>
                      <span>{tracks.user.name}</span>
                    </p>
                  </div>
                </div>

                {selectedVimeoTrack?.uri === tracks.uri ? (
                  <CheckCircle />
                ) : (
                  <Circle />
                )}
              </div>
            ))}
          </div>

          {selectedVimeoTrack?.uri && (
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
                src={selectedVimeoTrack?.pictures.base_link}
                className="h-[72px] w-[72px] rounded-xl"
              />

              <div>
                <p className="font-bold">{selectedVimeoTrack?.name}</p>
                <p>
                  <span>{selectedVimeoTrack?.name}</span>
                </p>
              </div>
            </div>

            <div onClick={() => setShowForm(false)} className="cursor-pointer">
              <Edit />
            </div>
          </div>

          <div className="mt-3">
            {type === "video" && selection === "vimeo" && (
              <VideoUploadForm
                platform={selection}
                title={selectedVimeoTrack?.name || ""}
                itemId={selectedVimeoTrack?.uri || "0"}
                duration={selectedVimeoTrack?.duration || 10}
                setCompleted={setCompleted}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Vimeo;
