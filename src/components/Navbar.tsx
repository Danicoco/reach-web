import { useEffect, useState } from "react";
import Input from "../library/Input";
import { PlusCircle, Search } from "react-feather";
import { UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";

type Props = {
  mutation?: UseMutationResult<any, unknown, Asset, unknown>
  from?: "Home" | "Explore"
  defaultSearchText?: string;
}

const Navbar = ({ mutation, from, defaultSearchText }: Props) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultSearchText && !searchText) {
      setSearchText(defaultSearchText)
    }
  }, [defaultSearchText, searchText]);

  return (
    <div className="py-5 flex justify-between">
      <div className="sm:w-[70%] w-full">
        <Input prefix={<Search />} value={searchText} placeholder="Search..." onChange={(e) => setSearchText(e.target.value)} onPressEnter={() => from === "Home" ? navigate(`/explore?search=${searchText}`) : mutation && mutation.mutateAsync({ title: searchText, limit: 20, mediaCategoriesIds: [] })} />
      </div>
      <div className="sm:flex gap-2 bg-slate-400 rounded-full hidden">
        <div className="flex justify-center items-center px-5 py-2 gap-2">
          <PlusCircle fill="white" />
          <p className="text-white">Upload</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
