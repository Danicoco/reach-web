import { useEffect, useState } from "react";
import Input from "../library/Input";
import { Music, PlusCircle, Search, Video } from "react-feather";
import { UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";
import useAppStore from "../utils/appStore";

type Props = {
  mutation?: UseMutationResult<any, unknown, Asset, unknown>;
  from?: "Home" | "Explore";
  defaultSearchText?: string;
};

const Navbar = ({ mutation, from, defaultSearchText }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultSearchText && !searchText) {
      setSearchText(defaultSearchText);
    }
  }, [defaultSearchText, searchText]);

  return (
    <div className="py-5 flex justify-between">
      <div className="sm:w-[85%] w-full">
        <Input
          prefix={<Search />}
          value={searchText}
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() =>
            from === "Home"
              ? navigate(`/explore?search=${searchText}`)
              : mutation &&
                mutation.mutateAsync({
                  title: searchText,
                  limit: 20,
                  mediaCategoriesIds: [],
                })
          }
        />
      </div>
      <div className="sm:w-[15%]">
        <div className="sm:flex gap-2 bg-slate-400 rounded-full hidden w-full sm:ml-2">
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex justify-center items-center w-full px-5 py-2 gap-2 cursor-pointer"
          >
            <PlusCircle fill="white" />
            <p className="text-white">Upload</p>
          </div>
        </div>
        {open && (
          <div className="rounded-xl px-1 bg-slate-400 ml-2 mt-[1px] py-3 ">
            <div
              onClick={() => {
                setOpen(false);
                useAppStore.setState({
                  modal: { open: true, type: "upload" },
                  uploadType: "video",
                })
              }
              }
              className="flex gap-3 p-3 hover:bg-slate-200 hover:rounded-xl hover:cursor-pointer"
            >
              <Video />
              <p>Video</p>
            </div>

            <div
              onClick={() =>
                useAppStore.setState({
                  modal: { open: true, type: "upload" },
                  uploadType: "audio",
                })
              }
              className="flex gap-3 p-3 hover:bg-slate-200 hover:rounded-xl hover:cursor-pointer"
            >
              <Music />
              <p>Audio</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
