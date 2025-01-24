import { ReactNode } from "react";
import { LogOut } from "react-feather";
import { appLogout } from "../utils/shared";

type Props = {
  message?: string;
  hide?: boolean;
  children: ReactNode;
  className?: string;
  childClassName?: string;
};

const OnboardingLayout = ({
  children,
  message,
  className,
  hide,
  childClassName,
}: Props) => {
  return (
    <div className={`${className}`}>
      <div className="text-[#828282] mt-5 mx-5">
        <div className="grid grid-cols-3 gap-2">
          <p className="hidden sm:block"></p>
          <p className="text-right sm:text-center col-span-2 sm:col-span-1 text-[#1D2D50]">
            {message}
          </p>
          <div className="hidden sm:block justify-self-end">
            <div className="justify-self-end flex gap-4">
              {!hide && (
                <div
                  className="flex justify-self-end gap-1 cursor-pointer"
                  onClick={appLogout}
                >
                  <LogOut color="black" size={15} className="mt-[5px]" />
                  <p className="text-right navy-color">Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={childClassName}>{children}</div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
