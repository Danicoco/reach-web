import VideoImage from "../../assets/video-image.png";
import ProfilePics from "../../assets/google.png";
import { MoreVertical } from "react-feather";

const AudioList = () => {
    const audios = [
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
    <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-20 gap-5 px-5 sm:px-0">
      {audios.map(audio => (
        <div className="flex justify-between">
        <div className="flex gap-5">
            <img src={audio.img} className="h-[72px] w-[72px]" />
            <div>
                <p className="truncate text-sm">{audio.name}</p>
                <p className="text-sm">{audio.channel}</p>
                <div className="sm:block flex gap-2 text-xs">
                    <p>{audio.streams}</p>
                    <p>{audio.duration}</p>
                </div>
            </div>
        </div>

        <MoreVertical fill="black" />
        </div>
      ))}
    </div>
  )
}

export default AudioList
