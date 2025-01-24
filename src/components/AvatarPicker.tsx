import { useState } from "react";
import { avatarList } from "../utils/static";

import Button from "../library/Button";

type Props = {
  name?: string;
  current?: string;
  onChange: (e: { name: string; value: string }) => void;
  loading?: boolean;
  dashboard?: boolean;
};

const AvatarPicker = ({
  onChange,
  name = "avatar",
  current,
  dashboard = false,
  loading,
}: Props) => {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {avatarList.map((item, i) => (
          <div
            key={i}
            className={`rounded-[50%] ${
              selected === i || current === item.asset
                ? `p-[4px] bg-[#1D2D50]`
                : ``
            }`}
          >
            <img
              src={item.path}
              width={80}
              className={`cursor-pointer hover:scale-[1.05] transition-all ${
                loading ? `pointer-events-none` : ``
              }`}
              onClick={() => {
                setSelected(i);
                if (!dashboard) {
                  onChange({ name, value: item.asset });
                }
              }}
            />
          </div>
        ))}
      </div>
      {dashboard ? (
        <div className="w-1/2 mx-auto mt-5">
          <Button
            className="w-full"
            {...{ loading }}
            disabled={loading || selected === undefined}
            onClick={() =>
              onChange({ name, value: avatarList[Number(selected)]?.asset })
            }
          >
            Submit
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default AvatarPicker;
