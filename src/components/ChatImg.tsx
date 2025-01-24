import Logo from "./Logo";
import { getCustomerDetails } from "../utils/shared";

type Props = {
  gap?: string;
  show?: boolean;
};

const ChatImg = ({ gap = "24px", show = true }: Props) => {
  const customer = getCustomerDetails();
  return (
    <div className="flex flex-col justify-center items-center" style={{ gap }}>
      <div className="bg-[rgba(255,255,255,0.08)] rounded-[50%] w-[120px] h-[120px] grid place-content-center">
        <div className="bg-[rgba(255,255,255,0.08)] rounded-[50%] w-[100px] h-[100px] grid place-content-center">
          <Logo width={80} />
        </div>
      </div>

      <div className="grid gap-2">
        {location.pathname === "/chat" && (
          <h3 className="text-[20px] font-[700] text-center text-white capitalize">
            Hey {customer?.meta?.name}!
          </h3>
        )}
        {show ? (
          <p className="text-white text-center font-[600] text-base">
            What&apos;s NYU got you thinking <br /> about today?
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ChatImg;
