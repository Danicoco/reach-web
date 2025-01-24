import { useNavigate } from "react-router-dom";
import { appLogout, getCustomerDetails } from "../utils/shared";
import Avatar from "./Avatar";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LogOut, Activity, User, Menu, Mail, Share } from "react-feather";
import useAppStore from "../utils/appStore";

type Props = {
  classes?: string;
  title: string;
  isHome?: boolean;
  path?: string | number;
  loading?: boolean;
  isCapitalized?: boolean;
};

const ChatHeader = ({
  title,
  classes,
  isCapitalized = true,
  path = -1,
  isHome = false,
  loading = false,
}: Props) => {
  const navigate = useNavigate();
  const popUpRef = useRef<HTMLDivElement>(null);
  const customer = getCustomerDetails();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOutside = (event: ChangeEvent<HTMLElement>) => {
    if (
      popUpRef.current &&
      // @ts-ignore
      !popUpRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("click", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`grid grid-cols-12 items-center w-full ${classes || ""}`}>
      {!isHome && (
        <div
          className="col-span-4 cursor-pointer"
          onClick={() => {
            //@ts-ignore
            navigate(path);
          }}
        >
          <img
            src={`${import.meta.env.VITE_S3_URL}/back-arrow.svg`}
            alt="back arrow icon"
          />
        </div>
      )}
      {isHome && !loading && (
        <div className="fixed top-[20px] left-[15px]">
          <div className="relative" ref={popUpRef}>
            <div
              className="cursor-pointer flex gap-[3px] items-center"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Avatar name={customer.meta?.avatar} width={40} />
              <Menu color="#ffffff" className="opacity-80" />
            </div>
            {open ? (
              <div className="flyover-menu right-auto top-[50px] rounded-lg w-[250px]">
                <ul>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Activity color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">View Pulses</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() => navigate("/profile")}
                  >
                    <User color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">Profile</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() =>
                      useAppStore.setState({
                        modal: { open: true, type: "feedback" },
                      })
                    }
                  >
                    <Mail color="#1D2D50" size={15} className="mt-[5px]" />
                    <p className="text-[#1D2D50]">Give Feedback</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() =>
                      useAppStore.setState({
                        modal: { open: true, type: "inviteFriend" },
                      })
                    }
                  >
                    <Share color="#1D2D50" size={15} className="mt-[5px]" />
                    <p className="text-[#1D2D50]">Invite Friends</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={appLogout}
                  >
                    <LogOut color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">Logout</p>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div className="col-span-4 justify-self-center">
        <p
          className={`font-bold text-base text-white whitespace-nowrap ${
            isCapitalized ? `capitalize` : ``
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
