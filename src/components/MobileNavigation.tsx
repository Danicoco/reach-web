import { Music, Video } from "react-feather";
import { mobileNavigationData } from "./navigationData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAppStore from "../utils/appStore";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 bg-white shadow-md flex justify-center items-center w-full overflow-x-scroll">
      {open && (
        <div className="rounded-xl px-1 bg-slate-400 ml-2 mt-[1px] py-3 ">
          <div
            onClick={() => {
              setOpen(false);
              useAppStore.setState({
                modal: { open: true, type: "upload" },
                uploadType: "video",
              });
            }}
            className="flex gap-3 p-3 hover:bg-slate-200 hover:rounded-xl hover:cursor-pointer"
          >
            <Video />
            <p>Video</p>
          </div>

          <div
            onClick={() => {
              setOpen(false);
              useAppStore.setState({
                modal: { open: true, type: "upload" },
                uploadType: "audio",
              });
            }}
            className="flex gap-3 p-3 hover:bg-slate-200 hover:rounded-xl hover:cursor-pointer"
          >
            <Music />
            <p>Audio</p>
          </div>
        </div>
      )}
      <div className="flex gap-3 justify-round w-[95%] p-2">
        {mobileNavigationData.map((nav) => (
          <div
            key={nav.link}
            onClick={() =>
              nav.link ? navigate(nav.link) : setOpen((prev) => !prev)
            }
            className="p-2 flex flex-col items-center cursor-pointer"
          >
            <div className="flex justify-center items-center">
              {nav.icon(
                location.pathname.includes(nav.link) ? "#2E0173" : "#fff"
              )}
            </div>
            {nav.name && (
              <span
                className={`text-sm ${
                  location.pathname.includes(nav.link) ? "text-[@2E0173]" : ""
                }`}
              >
                {nav.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
