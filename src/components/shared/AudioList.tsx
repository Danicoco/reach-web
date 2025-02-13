import { MoreVertical } from "react-feather";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

type Props = {
  audios: IMedia[];
  isLoading: boolean;
};

const AudioList = ({ audios, isLoading }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        !audios?.length ?
        <div className="flex justify-center items-center h-full">
          <p>No audio added yet</p>
        </div>
        :
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-20 gap-3 px-5 sm:px-0">
          {audios.map((audio) => (
            <div
              key={audio.id}
              className="flex justify-between"
              onClick={() => navigate(`/dashboard/listen/${audio.id}`)}
            >
              <div className="flex gap-5 cursor-pointer">
                <img
                  src={audio.coverPicture}
                  className="h-[72px] w-[72px] rounded-xl"
                />
                <div>
                  <p className="truncate text-sm font-bold text-ellipsis">
                    {audio.title}
                  </p>
                  <p className="text-sm">{audio.owner}</p>
                  <div className="sm:block flex gap-2 text-xs">
                    <p>{audio.totalNoStreams} streams</p>
                    <p>{audio.duration} minutes</p>
                  </div>
                </div>
              </div>

              <MoreVertical fill="black" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudioList;
