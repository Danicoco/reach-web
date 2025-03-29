import { useEffect, useState } from "react";
import Input from "../library/Input";
import { Moon, Music, PlusCircle, Search, Sun, Video } from "react-feather";
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
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (defaultSearchText && !searchText) {
      setSearchText(defaultSearchText);
    }
  }, [defaultSearchText, searchText]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="py-5 flex justify-between w-full">
      <div className="flex gap-3 w-[80%]">
        <div className="sm:w-[85%] w-full">
          <Input
            prefix={<Search className="dark:text-white" />}
            value={searchText}
            placeholder="Search..."
            className="dark:bg-transparent"
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
          <div className="sm:flex gap-2 dark:bg-transparent dark:border-white border-[1px] bg-slate-400 rounded-full hidden w-full sm:ml-2">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex justify-center items-center w-full px-5 py-2 gap-2 cursor-pointer"
            >
              <PlusCircle className="" />
              <p className="dark:text-white">Upload</p>
            </div>
          </div>
          {open && (
            <div className="rounded-xl px-1 dark:bg-slate-400 ml-2 mt-[1px] py-3 ">
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
        </div>
      </div>

      <div className="w-[20%]" onClick={() => setDarkMode(!darkMode)}>
        <div className="flex justify-end mt-1">
        {darkMode ? <Sun fill="white" color="white" /> : <Moon color="black" fill="black" />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
