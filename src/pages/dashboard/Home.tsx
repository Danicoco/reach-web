import Layout from "../../components/Layout";
import { useState } from "react";
import VideoList from "../../components/shared/VideoList";
import AudioList from "../../components/shared/AudioList";
import { useQuery } from "react-query";
import { fetchMedia } from "../../server/assets";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [section, setSection] = useState("video");

  const { data, isLoading } = useQuery<IMedia[]>(["media", section], () => fetchMedia(1, 10, section));

  return (
    <Layout>
      <div>
        <Navbar from="Home" />
        <div className="flex gap-5 justify-center items-center sm:justify-start sm:items-start sm:px-0 px-2 mb-5">
          <p
            onClick={() => setSection("video")}
            className={`rounded-full px-5 py-2 ${
              section === "video" ? "bg-[#6601FF] text-white" : "cursor-pointer"
            }`}
          >
            Video
          </p>
          <p
            onClick={() => setSection("audio")}
            className={`rounded-full px-5 py-2 ${
              section === "audio" ? "bg-[#6601FF] text-white" : "cursor-pointer"
            }`}
          >
            Audio
          </p>
        </div>

        <div className="mt-2">
          {section === "video" && <VideoList videos={data?.filter(d => d.type === "video") || []} isLoading={isLoading} />}
          {section === "audio" && <AudioList isLoading={isLoading} audios={data?.filter(d => d.type === "audio") || []} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
