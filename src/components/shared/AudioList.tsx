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
    <div className="grid grid-cols-2 gap-20">
      {audios.map(audio => (
        <div className="flex justify-between">
        <div className="flex gap-5">
            <img src={audio.img} className="h-[72px] w-[72px]" />
            <div>
                <p>{audio.name}</p>
                <p>{audio.channel}</p>
                <div>
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
