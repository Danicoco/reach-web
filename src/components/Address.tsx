import { Select, Input } from "antd";
import { useEffect, useState } from "react";
import countryCodes from "country-codes-list";

import { isObjectDuplicate } from "../utils/shared";
const { Option } = Select;

type Props = {
  edit?: boolean;
  name: string;
  type: string;
  onboarding: Record<string, string>;
  currentValue: any;
  onChange: (e: { name: string; value: string }) => void;
};

const Address = ({
  type,
  onChange,
  name,
  currentValue,
  onboarding,
  edit = false,
}: Props) => {
  const [allCountry, setAllCountry] = useState<any[]>([]);

  useEffect(() => {
    const uniqueObjects = new Set();
    const uniqueArray = countryCodes.all().filter((obj) => {
      if (!isObjectDuplicate(uniqueObjects, obj, "countryCallingCode")) {
        uniqueObjects.add(obj);
        return true;
      }
      return false;
    });

    setAllCountry(uniqueArray);
  }, []);

  useEffect(() => {
    if (type === "address" && !edit) {
      if (!onboarding[name]) {
        onChange({
          name,
          value: `${"United States of America"},${"New York City"}`,
        });
      }
    }
  }, [type]);

  const addressSetter = (
    data: string,
    type: "country" | "city" | "neighbourhood"
  ) => {
    if (currentValue?.length) {
      if (type === "country") {
        const currAddr = currentValue.split(",");
        currAddr[0] = data;
        return currAddr.join(",");
      } else if (type === "city") {
        const currAddr = currentValue.split(",");
        currAddr[1] = data;
        return currAddr.join(",");
      } else {
        const currAddr = currentValue.split(",");
        currAddr[2] = data;
        return currAddr.join(",");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="navy-color my-2">Country</p>
        <div className="customSelect">
          <Select
            className="w-full rounded-lg bg-[#484848] text-white"
            defaultValue={
              currentValue?.split(",")[0] || "United States of America"
            }
            onSelect={(e) => {
              onChange({
                name,
                value: addressSetter(e, "country") as string,
              });
            }}
          >
            {allCountry.map((code, i) => (
              <Option value={`${code?.countryNameEn}`} key={i}>
                <div className="flex gap-2">{code?.countryNameEn}</div>
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <p className="navy-color my-2">City</p>
        <Input
          name={"city"}
          value={currentValue?.split(",")[1] || "New York City"}
          onChange={(e) => {
            onChange({
              name,
              value: addressSetter(e.target.value, "city"),
            });
          }}
        />
      </div>
      <div>
        <p className="navy-color my-2">Neighbourhood</p>
        <Input
          name={name}
          value={currentValue?.split(",")[2]}
          onChange={(e) => {
            onChange({
              name,
              value: addressSetter(e.target.value, "neighbourhood"),
            });
          }}
        />
      </div>
    </div>
  );
};

export default Address;
