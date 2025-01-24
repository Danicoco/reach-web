import { Select } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { getMonthYear } from "../helper";

type Props = {
  name: string;
  type: string;
  dob: { month: number | null; year: number | null };
  setDob: Dispatch<
    SetStateAction<{ month: number | null; year: number | null }>
  >;
  onChange: (e: { name: string; value: string }) => void;
};

const Birth = ({ name, type, onChange, dob, setDob }: Props) => {
  useEffect(() => {
    if (type === "calender") {
      const date = new Date();
      if (dob.month !== null || dob.year) {
        if (dob.month !== null) {
          date.setMonth(dob.month, 1);
        }
        if (dob.year) {
          date.setFullYear(dob.year);
        }
      }
      if (!dob.year) {
        date.setFullYear(2000);
      }

      onChange({ name, value: date.toISOString() });
    }
  }, [type, dob]);

  return (
    <div className="justify-self-center">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <Select
            className="w-full rounded-lg bg-[#484848] text-white"
            onSelect={(e) => setDob((prev) => ({ ...prev, month: e }))}
            value={dob.month}
            placeholder={"Select month"}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {getMonthYear().month?.map((option) => (
              <Select.Option key={option.name} value={option.value}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="col-span-6">
          <Select
            className="w-full rounded-lg bg-[#484848] text-white"
            onSelect={(e) => setDob((prev) => ({ ...prev, year: e }))}
            value={dob.year || 2000}
            placeholder={"Select year"}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            {getMonthYear().year?.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Birth;
