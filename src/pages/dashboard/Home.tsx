import { PlusCircle, Search } from "react-feather";

import Layout from "../../components/Layout";
import Input from "../../library/Input";
import { useState } from "react";
import VideoList from "../../components/shared/VideoList";
import AudioList from "../../components/shared/AudioList";

const Home = () => {
  const [section, setSection] = useState("video");

  return (
    <Layout>
      <div>
        <div className="py-5 flex justify-between">
          <div className="sm:w-[70%] w-full">
            <Input prefix={<Search />} placeholder="Search..." />
          </div>
          <div className="sm:flex gap-2 bg-slate-400 rounded-full hidden">
            <div className="flex justify-center items-center px-5 py-2 gap-2">
              <PlusCircle fill="white" />
              <p className="text-white">Upload</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
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
          {section === "video" && <VideoList />}
          {section === "audio" && <AudioList />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
