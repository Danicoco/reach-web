import { X } from "react-feather";
import { ReactNode, useEffect, useState } from "react";

import ActivityBar from "../ActivityIndicator";

type Props = {
  data: {
    alt?: string;
    bgColor: string;
    message?: ReactNode;
    header?: string;
  }[];
};

const timeoutNumber = 15000;

const FeatureCard = ({ data }: Props) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const shouldPrev = currentFeature === 0;
  const shouldNext = currentFeature === data.length - 1;

  const onNext = () => {
    if (shouldNext) {
      window.location.href = "/create-account";
      return;
    }
    setCurrentFeature((prev) => prev + 1);
  };

  const onPrev = () => {
    if (shouldPrev) {
      return;
    }
    setCurrentFeature((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prevIndex) => {
        if (prevIndex === 4) {
          window.location.href = "/create-account";
          return prevIndex;
        }
        return (prevIndex + 1) % data.length;
      });
    }, timeoutNumber);

    return () => {
      clearInterval(interval);
    };
  }, [data, currentFeature]);

  useEffect(() => {
    document.body.style.backgroundColor = data[currentFeature].bgColor;
  }, [document, currentFeature, data]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen sm:relative">
        <div className="top-0 absolute mt-2 w-full">
          <div className="flex flex-row gap-2 justify-center items-center w-full mx-3">
            {data.map((_, index) => (
              <ActivityBar
                key={index}
                current={index === currentFeature}
                currentIndex={index}
                currentPreview={currentFeature}
              />
            ))}
          </div>
          <div className="mt-[1px] flex justify-between mx-3">
            <div>
              <p className={"text-white"}>Cha Cha</p>
            </div>
            <div
              onClick={() => (window.location.href = "/create-account")}
              className="cursor-pointer"
            >
              <X color={"white"} />
            </div>
          </div>
        </div>

        {/* Main content in middle */}
        <div className="mx-3 flex">
          <div
            className="fixed left-0 top-[50px] h-full w-[120px] sm:absolute sm:top-[50px] sm:w-[150px] sm:h-[85%]"
            onClick={onPrev}
          >
            <p className="invisible text-white">Prev</p>
          </div>
          <div className="">
            <div>
              <h2
                className={`font-bold text-[28px] md:text-[33px] break-words my-3 text-center text-[#DA8E6B] whitespace-pre-line`}
              >
                {data[currentFeature].header}
              </h2>
              <div className={`text-lg text-white`}>
                {data[currentFeature].message}
              </div>
            </div>
          </div>

          <div
            className="fixed right-0 top-[50px] h-full w-[120px] sm:absolute sm:top-[50px] sm:w-[150px] sm:h-[85%]"
            onClick={onNext}
          >
            <p className="invisible text-white">Next</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
