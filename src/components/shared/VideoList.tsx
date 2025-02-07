import { MoreVertical } from "react-feather";
import Loading from "../Loading";

type Props = {
  videos: IMedia[];
  isLoading: boolean;
};

const VideoList = ({ videos, isLoading }: Props) => {
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
            <div key={video.id} className="mt-5">
              <img
                src={video.coverPicture}
                className="w-[413px] h-[200px] rounded-xl"
              />
              <div className="flex justify-between mt-3">
                <div className="flex gap-3">
                  <img
                    src={video.profilePicture}
                    className="h-[35px] w-[35px] rounded-full border-[1px] border-black bg-slate-500 p-2"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-extrabold text-xs truncate flex-wrap">
                      {video.title}
                    </p>
                    <div className="flex gap-1">
                      <p className="primary-text text-xs">{video.title}</p>
                      <span className="mb-1">.</span>
                      <p className="text-xs"> {video.totalNoStreams} streams</p>
                      <span className="mb-1">.</span>
                      <p className="text-xs">{video.duration} minutes</p>
                    </div>
                  </div>
                </div>
                <MoreVertical fill="black" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
