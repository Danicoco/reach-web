import React, { useState } from "react";
import AudioUploadForm from "../forms/AudioUploadForm";
import Input from "../../library/Input";
import Button from "../../library/Button";
import { getSpotifyMusic } from "../../server/assets";
import { CheckCircle, Circle, Edit } from "react-feather";

type Props = {
  type: string;  
  token: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Spotify = ({ type, setCompleted, token }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [spotifyTracks, setSpotifyTracks] = useState<ISpotifyTrack[]>([]);
  const [selectedSpotifyItem, setSelectedSpotifyItem] =
    useState<ISpotifyTrack | null>(null);

  const spotifySearch = async () => {
    setLoading(true);
    const data = await getSpotifyMusic(search, token);
    if (data?.tracks?.items) {
      setSpotifyTracks(data.tracks.items);
    }
    setLoading(false);
  };

  return (
    <div className="mt-5">
      {!showForm && (
        <div className="flex justify-between gap-3">
          <Input
            className="w-[80%]"
            placeholder="Search for your music..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            disabled={!search}
            onClick={spotifySearch}
            className="w-[20%]"
            loading={loading}
          >
            Search
          </Button>
        </div>
      )}

      {spotifyTracks.length && !showForm ? (
        <div className="mt-5">
          <p>Select Audio</p>
          <div className="w-full h-[250px] overflow-y-scroll">
            {spotifyTracks.map((tracks) => (
              <div
                key={tracks.id}
                className="flex justify-between mt-3"
                onClick={() => {
                  setSelectedSpotifyItem((prev) =>
                    prev?.id === tracks.id ? null : tracks
                  );
                }}
              >
                <div className="flex gap-5">
                  <img
                    src={tracks.album.images[0].url}
                    className="h-[72px] w-[72px] rounded-xl"
                  />

                  <div>
                    <p className="font-bold">{tracks.name}</p>
                    <p>
                      {tracks.artists.map((artist) => (
                        <span key={artist.id}>{artist.name}</span>
                      ))}
                    </p>
                  </div>
                </div>

                {selectedSpotifyItem?.id === tracks.id ? (
                  <CheckCircle />
                ) : (
                  <Circle />
                )}
              </div>
            ))}
          </div>

          {selectedSpotifyItem?.id && (
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
                src={selectedSpotifyItem?.album.images[0].url}
                className="h-[72px] w-[72px] rounded-xl"
              />

              <div>
                <p className="font-bold">{selectedSpotifyItem?.name}</p>
                <p>
                  {selectedSpotifyItem?.artists.map((artist) => (
                    <span key={artist.id}>{artist.name}</span>
                  ))}
                </p>
              </div>
            </div>

            <div onClick={() => setShowForm(false)} className="cursor-pointer">
              <Edit />
            </div>
          </div>

          <div className="mt-3">
            {type === "audio" && (
              <AudioUploadForm
                title={selectedSpotifyItem?.name || ""}
                itemId={selectedSpotifyItem?.id || "0"}
                duration={selectedSpotifyItem?.duration_ms || 10}
                setCompleted={setCompleted}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Spotify;
