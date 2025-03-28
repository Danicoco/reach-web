import { MoreVertical } from "react-feather";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

type Props = {
  videos: IMedia[];
  isLoading: boolean;
};

const VideoList = ({ videos, isLoading }: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : !videos?.length ? (
        <div className="flex justify-center items-center h-full">
          <p>No video added yet</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 grid-cols-1 px-5 sm:px-0 gap-5">
          {videos.map((video) => (
            <div key={video.id} className="mt-5 cursor-pointer" 
            onClick={() => navigate(`/dashboard/watch/${video.id}`)}
            >
              <img
                src={video.coverPicture}
                className="w-[413px] h-[200px] rounded-xl"
              />
              <div className="flex justify-between mt-3">
                <div className="flex gap-3">
                  <img
                    src={video.profilePicture}
                    className="h-[35px] w-[35px] rounded-full border-[1px] border-black dark:bg-slate-500 p-2"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-extrabold text-xs truncate flex-wrap dark:text-white">
                      {video.title}
                    </p>
                    <div className="flex gap-1">
                      <p className="primary-text mt-1 text-xs dark:text-[#f1f1f1]">{video.owner}</p>
                      <span className="mb-2 dark:text-[#f1f1f1]">|</span>
                      <p className="text-xs mt-1 dark:text-[#f1f1f1]"> {video.totalNoStreams} streams</p>
                      <span className="mb-2 dark:text-[#f1f1f1]">|</span>
                      <p className="text-xs mt-1 dark:text-[#f1f1f1]">{video.duration} minutes</p>
                    </div>
                  </div>
                </div>
                <MoreVertical className="dark:text-white text-black" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
