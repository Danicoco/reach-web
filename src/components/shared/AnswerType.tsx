import { Select, Slider } from "antd";
import { useEffect, useState } from "react";

import { composeSliderMarks } from "./utils";
import TextArea from "antd/es/input/TextArea";
import useAppStore from "../../utils/appStore";

import Birth from "../Birth";
import Address from "../Address";
import Input from "../../library/Input";
import AvatarPicker from "../AvatarPicker";

type Props = {
  type: string;
  name: string;
  onChange: (e: { name: string; value: string }) => void;
  options?: string[];
  list?: { name: string; desc: string }[];
  multiple: boolean;
  initialLabel: string;
  endLabel: string;
  required?: boolean;
};

const AnswerType = ({
  type,
  options,
  onChange,
  name,
  required,
  list,
  multiple = false,
  initialLabel,
  endLabel,
}: Props) => {
  const onboarding = useAppStore((state) => state.onboarding);
  const weeklyQuiz = useAppStore((state) => state.weeklyQuiz);
  const [checked, setChecked] = useState({
    question: "",
    name: "",
    value: false,
    type: "",
  });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [otherInput, setOtherInput] = useState(false);
  const [multipleChecked, setMultipleChecked] = useState<
    { question: string; values: string; type: string }[]
  >([]);
  const [dob, setDob] = useState<{ month: number | null; year: number | null }>(
    { month: null, year: null }
  );
  const currentValue =
    (onboarding && onboarding[name]) ||
    (weeklyQuiz.length &&
      weeklyQuiz.find((w: Record<string, string>) => w.question === name)
        ?.answer) ||
    "";

  const currentOtherValue =
    (onboarding && onboarding[`${name}-other`]) ||
    (weeklyQuiz.length &&
      weeklyQuiz.find(
        (w: Record<string, string>) => w.question === `${name}-other`
      )?.answer) ||
    "";

  const composeSliderOptions = composeSliderMarks(options, type);

  const recomposeOptions = options;

  useEffect(() => {
    setOtherInput(false);
  }, [name]);

  useEffect(() => {
    if ((type === "tag-onboarding" || type === "select") && multiple) {
      const currentChecked = multipleChecked.find(
        (checked) =>
          checked.question === name &&
          checked.values === selectedOption &&
          checked.type === type
      );

      if (currentChecked) {
        const currentQuestionImp = multipleChecked.filter(
          (checked) => checked.question === name
        );
        const selectedValuesImp = currentQuestionImp
          .map((ques) => ques.values)
          .filter((v) => v !== selectedOption);
        setMultipleChecked((prev) => {
          const other = selectedOption.toLowerCase() === "other";

          if (other) setOtherInput(false);
          return prev.filter(
            (previousVal) => previousVal.values !== selectedOption
          );
        });
        onChange({ name, value: selectedValuesImp.join(", ") });
      } else {
        const currentQuestionImp = multipleChecked.filter(
          (checked) => checked.question === name
        );
        const selectedValuesImp = currentQuestionImp.map((ques) => ques.values);
        setMultipleChecked((prev) => {
          const other = selectedOption.toLowerCase() === "other";
          if (other) {
            setOtherInput(true);
          }

          return [
            ...prev,
            {
              question: name,
              type,
              values: selectedOption,
            },
          ];
        });
        onChange({
          name,
          value: [...selectedValuesImp, selectedOption].join(", "),
        });
      }
    }
  }, [trigger]);

  useEffect(() => {
    if (type === "slider" && required && !currentValue) {
      const val = options && options[0];
      onChange({
        name: name,
        value: String(val),
      });
    }
  }, [type]);

  return (
    <>
      {type === "input" && (
        <Input
          name={name}
          value={currentValue}
          onChange={(e) => {
            onChange({ name, value: e.target.value });
          }}
        />
      )}
      {type === "img" && (
        <AvatarPicker {...{ name }} {...{ onChange }} current={currentValue} />
      )}
      {type === "textarea" && (
        <TextArea
          rows={10}
          name={name}
          value={currentValue}
          onChange={(e) => onChange({ name, value: e.target.value })}
        />
      )}
      {type === "select" && !multiple && (
        <>
          <div className="flex flex-col gap-5">
            {recomposeOptions?.map((option) => {
              return (
                <div
                  className={`flex justify-between cursor-pointer ${
                    checked.name === option &&
                    checked.value &&
                    checked.question === name &&
                    checked.type === "select"
                      ? "bg-[#1D2D50] text-white"
                      : "bg-transparent border-[#1D2D50] text-[#1D2D50] border-[1px]"
                  } rounded-lg p-2 mt-[1px]`}
                  onClick={() => {
                    setChecked((prev) => {
                      const other =
                        prev.name.toLowerCase() !== "other" &&
                        option.toLowerCase() === "other";
                      if (other) {
                        setOtherInput(true);
                      } else {
                        setOtherInput(false);
                      }
                      return {
                        question: name,
                        name: option === checked.name ? "" : option,
                        type: "select",
                        value: checked.name === option ? !checked.value : true,
                      };
                    });
                    onChange({
                      name: name,
                      value: option === checked.name ? "" : option,
                    });
                  }}
                  key={option}
                >
                  <p className="text-[14px] font-[500]">{option}</p>
                </div>
              );
            })}
          </div>

          {otherInput && (
            <Input
              name={name}
              className="mt-3"
              placeholder={`In your own words`}
              value={currentOtherValue}
              onChange={(e) => {
                onChange({ name: `${name}-other`, value: e.target.value });
              }}
            />
          )}
        </>
      )}
      {type === "select-desc" && !multiple && (
        <>
          <div className="flex flex-col gap-5">
            {list?.map((option, i) => {
              return (
                <div className="grid gap-2" key={i}>
                  <div
                    className={`flex justify-between cursor-pointer ${
                      checked.name === option.name &&
                      checked.value &&
                      checked.question === name &&
                      checked.type === "select"
                        ? "bg-[#1D2D50] text-white"
                        : "bg-transparent border-[#1D2D50] text-[#1D2D50] border-[1px]"
                    } rounded-lg p-2 mt-[1px]`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChecked((prev) => {
                        const other =
                          prev.name.toLowerCase() !== "other" &&
                          option.name.toLowerCase() === "other";
                        if (other) {
                          setOtherInput(true);
                        } else {
                          setOtherInput(false);
                        }
                        return {
                          question: name,
                          name: option.name === checked.name ? "" : option.name,
                          type: "select",
                          value:
                            checked.name === option.name
                              ? !checked.value
                              : true,
                        };
                      });
                      onChange({
                        name: name,
                        value: option.name === checked.name ? "" : option.name,
                      });
                    }}
                  >
                    <p className="text-[14px] font-[500]">{option.name}</p>
                  </div>
                  <p className="text-[12px]">{option.desc}</p>
                </div>
              );
            })}
          </div>

          {otherInput && (
            <Input
              name={name}
              className="mt-3"
              placeholder={`In your own words`}
              value={currentOtherValue}
              onChange={(e) => {
                onChange({ name: `${name}-other`, value: e.target.value });
              }}
            />
          )}
        </>
      )}
      {type === "select" && multiple && (
        <>
          <div className="flex flex-col gap-4">
            {recomposeOptions?.map((option) => {
              const currentQuestion = multipleChecked.filter(
                (checked) =>
                  checked.question === name && checked.type === "select"
              );
              const selectedValues = currentQuestion.map((ques) => ques.values);
              return (
                <div
                  className={`flex justify-between ${
                    selectedValues.includes(option)
                      ? "bg-[#1D2D50] text-white"
                      : "bg-transparent border-[#1D2D50] text-[#1D2D50] border-[1px]"
                  } rounded-lg p-5 mt-2`}
                  onClick={() => {
                    setSelectedOption(option);
                    setTrigger((prev) => !prev);
                  }}
                  key={option}
                >
                  <p className="text-[14px] font-[500]">{option}</p>
                </div>
              );
            })}
          </div>
          {otherInput && (
            <Input
              name={name}
              placeholder={`In your own words`}
              value={currentOtherValue}
              className="mt-3"
              onChange={(e) => {
                onChange({ name: `${name}-other`, value: e.target.value });
              }}
            />
          )}
        </>
      )}
      {type === "dropdown" && (
        <Select
          className="w-full rounded-lg bg-[#484848] text-white"
          onSelect={(e) => onChange({ name, value: e })}
          value={currentValue}
        >
          {options?.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      )}
      {type === "slider" && (
        <div className="flex justify-center pr-10">
          <div className="mb-5">
            <p className="text-[#1d2d50] mb-2 text-center">{endLabel}</p>
            <div className="max-h-96 h-96 flex justify-center">
              <Slider
                vertical
                className="bg-[#1d2d50] text-white rounded-[10px]"
                onChange={(e) => {
                  const val = options ? options[Number(e)] : 0;
                  onChange({
                    name: name,
                    value: composeSliderOptions?.hasLetter
                      ? String(val)
                      : String(e),
                  });
                }}
                marks={composeSliderOptions?.marks}
                keyboard={false}
                value={Number(currentValue)}
                min={composeSliderOptions?.min}
                tooltip={{ open: false }}
                max={composeSliderOptions?.max}
              />
            </div>
            <p className="text-[#1d2d50] mt-5 text-center">{initialLabel}</p>
          </div>
        </div>
      )}
      {type === "tag-onboarding" && !multiple && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap">
            {recomposeOptions?.map((option) => (
              <div
                className={`rounded-lg ${
                  checked.name === option &&
                  checked.question === name &&
                  checked.type === "tag-onboarding" &&
                  checked.value
                    ? "bg-[#1D2D50] text-white"
                    : "bg-transparent border-[#1D2D50] text-[#1D2D50] border-[1px]"
                } p-2 mt-3 mr-2`}
                key={option}
                onClick={() => {
                  setChecked((prev) => {
                    const other =
                      prev.name.toLowerCase() !== "other" &&
                      option.toLowerCase() === "other";
                    if (other) {
                      setOtherInput(true);
                    } else {
                      setOtherInput(false);
                    }
                    return {
                      question: name,
                      name: option === checked.name ? "" : option,
                      type: "tag-onboarding",
                      value: checked.name === option ? !checked.value : true,
                    };
                  });
                  onChange({
                    name,
                    value: option === checked.name ? "" : option,
                  });
                }}
              >
                <p className="text-[12px] capitalize font-normal">{option}</p>
              </div>
            ))}
          </div>
          {otherInput && (
            <Input
              name={name}
              placeholder={`In your own words`}
              value={currentOtherValue}
              onChange={(e) => {
                onChange({ name: `${name}-other`, value: e.target.value });
              }}
            />
          )}
        </div>
      )}
      {type === "tag-onboarding" && multiple && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap">
            {recomposeOptions?.map((option, i) => {
              const currentQuestion = multipleChecked.filter(
                (checked) =>
                  checked.question === name && checked.type === "tag-onboarding"
              );
              const selectedValues = currentQuestion.map((ques) => ques.values);
              return (
                <div className="flex flex-col gap-2" key={i}>
                  <div
                    className={`rounded-lg cursor-pointer ${
                      selectedValues.includes(option)
                        ? "bg-[#1D2D50] text-white"
                        : "bg-transparent border-[#1D2D50] text-[#1D2D50] border-[1px]"
                    } p-2 mt-3 mr-2`}
                    key={option}
                    onClick={() => {
                      setSelectedOption(option);
                      setTrigger((prev) => !prev);
                    }}
                  >
                    <p className="text-[12px] capitalize font-normal">
                      {option}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {otherInput && (
            <Input
              name={name}
              value={currentOtherValue}
              placeholder={`In your own words`}
              onChange={(e) => {
                onChange({ name: `${name}-other`, value: e.target.value });
              }}
            />
          )}
        </div>
      )}
      {type === "search" && (
        <>
          <Input />
          <div className="flex flex-wrap">
            {recomposeOptions?.map((option) => (
              <div
                className={`rounded-lg ${
                  checked.name === option &&
                  checked.question === name &&
                  checked.type === "search" &&
                  checked.value
                    ? "bg-[#56CCF2]"
                    : "bg-[#484848]"
                } text-white p-3 mt-3 mr-2`}
                key={option}
                onClick={() => {
                  setChecked({
                    question: name,
                    name: option === checked.name ? "" : option,
                    type: "search",
                    value: checked.name === option ? !checked.value : true,
                  });
                  onChange({
                    name,
                    value: option === checked.name ? "" : option,
                  });
                }}
              >
                <p className="text-[12px] capitalize font-normal">{option}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {type === "calender" && (
        <Birth
          {...{ onChange }}
          {...{ type }}
          {...{ name }}
          {...{ dob }}
          {...{ setDob }}
        />
      )}
      {type === "address" && (
        <Address
          {...{ currentValue }}
          {...{ type }}
          {...{ name }}
          {...{ onChange }}
          {...{ onboarding }}
        />
      )}
    </>
  );
};

export default AnswerType;
