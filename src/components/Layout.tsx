import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "react-feather";

import { appLogout } from "../utils/shared";
import { navigationData } from "./navigationData";
import MobileNavigation from "./MobileNavigation";

type Props = {
  header?: string;
  children: ReactNode;
  subHeader?: ReactNode;
};

const Layout = ({ children, header, subHeader }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex gap-5 mr-5">
      <div className="sm:w-[20%] hidden sm:block dark:bg-black bg-white px-5 pb-5 top-0 sticky overflow-y-hidden h-screen">
        <p className="dark:text-[#0DF6FE] text-[30px] font-bold mt-5 mb-10">
          Reach
        </p>
        <div className="flex flex-col h-[calc(100%-80px)] justify-between">
          <div className="grid gap-8">
            {navigationData.map((nav) => (
              <div
                key={nav.link}
                onClick={() => navigate(nav.link)}
                className={`p-3 ${
                  location.pathname.includes(nav.link)
                    ? "rounded-2xl border-[1px] dark:bg-transparent bg-slate-200 font-bold"
                    : "cursor-pointer dark:text-[#f1f1f1] text-black"
                } flex gap-8`}
              >
                {nav.icon}
                {nav.name}
              </div>
            ))}
          </div>

          <div
            className="flex gap-3 mb-5 p-3 cursor-pointer"
            onClick={appLogout}
          >
            <LogOut />
            <p>Log Out</p>
          </div>
        </div>
      </div>

      <div className="sm:w-[80%] w-full relative">
        <div className="flex justify-between mt-5">
          <p className="text-[32px] font-[400]">{header}</p>
          <div>{subHeader}</div>
        </div>
        {children}
        <div className="sm:hidden block">
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;
