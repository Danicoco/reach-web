import VideoImage from "../../assets/video-image.png";
import ProfilePics from "../../assets/google.png";
import { MoreVertical } from "react-feather";

const VideoList = () => {
  const videos = [
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
    {
      img: VideoImage,
      profilePics: ProfilePics,
      name: "Best places to travel for vacation",
      channel: "Let's Travel",
      streams: "10k streams",
      duration: "1 day ago",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 px-5 sm:px-0 gap-5">
      {videos.map((video) => (
        <div className="mt-5">
          <img src={video.img} />
          <div className="flex justify-between mt-3">
            <div className="flex gap-3">
              <img src={video.profilePics} className="h-[35px] w-[35px] rounded-full border-[1px] border-black bg-slate-500 p-2" />
              <div className="flex flex-col gap-2">
                <p className="font-extrabold text-xs">{video.name}</p>
                <div className="flex gap-1">
                  <p className="primary-text text-xs">{video.channel}</p>
                  <span>.</span>
                  <p className="text-xs"> {video.streams}</p>
                  <span>.</span>
                  <p className="text-xs">{video.duration}</p>
                </div>
              </div>
            </div>
            <MoreVertical fill="black" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
