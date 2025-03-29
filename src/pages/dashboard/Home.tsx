import { useState } from "react";
import { useQuery } from "react-query";

import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { PreloadTokenCheck } from "./effect";
import { fetchMedia } from "../../server/assets";
import VideoList from "../../components/shared/VideoList";
import Upload from "../../components/modals/Upload";
import AudioList from "../../components/shared/AudioList";

const Home = () => {
  const [section, setSection] = useState("video");
  const [token, setToken] = useState("");

  const { data, isLoading } = useQuery<IMedia[]>(["media", section], () =>
    fetchMedia(1, 10, section)
  );
  
  PreloadTokenCheck({ setToken, token });

  return (
    <Layout>
      <div>
        <div className="mx-3">
        <Navbar from="Home" />
        </div>
        <div className="flex gap-5 justify-center items-center sm:justify-start sm:items-start sm:px-0 px-2 mb-5">
          <p
            onClick={() => setSection("video")}
            className={`rounded-full px-5 py-2 ${
              section === "video" ? "dark:bg-[#6601FF] dark:text-white" : "cursor-pointer"
            }`}
          >
            Video
          </p>
          <p
            onClick={() => setSection("audio")}
            className={`rounded-full px-5 py-2 ${
              section === "audio" ? "dark:bg-[#6601FF] dark:text-white" : "cursor-pointer"
            }`}
          >
            Audio
          </p>
        </div>

        <div className="mt-2">
          {section === "video" && (
            <VideoList
              videos={data?.filter((d) => d.type === "video") || []}
              isLoading={isLoading}
            />
          )}
          {section === "audio" && (
            <AudioList
              isLoading={isLoading}
              audios={data?.filter((d) => d.type === "audio") || []}
            />
          )}
        </div>
      </div>

      <Upload token={token} />
    </Layout>
  );
};

export default Home;
