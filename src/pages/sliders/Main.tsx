import { Empty } from "antd";
import { X } from "react-feather";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

import useAppStore from "../../utils/appStore";
import { getUserStories } from "../../server/stories";
import { getCustomerDetails } from "../../utils/shared";

import Button from "../../library/Button";
import Loading from "../../components/Loading";
import ServerError from "../../components/ServerError";
import ActivityIndicator from "../../components/ActivityIndicator";

const timeoutNumber = 15000;

const MainSlider = () => {
  const slider = useAppStore((state) => state.slider, shallow);
  const [currentPreview, setCurrentPreview] = useState(0);

  const customer = getCustomerDetails();

  const {
    data: storyData,
    isLoading,
    error,
  } = useQuery(["MainSlider-user", customer.id, slider.id], () =>
    getUserStories(slider.id as string, customer.id as string)
  );

  const data = storyData?.sort((a: IStories, b: IStories) => {
    const positionA = parseInt(a.position, 10);
    const positionB = parseInt(b.position, 10);

    return positionA - positionB;
  }) as IStories[];

  const shouldPrev = currentPreview === 0;
  const shouldNext = currentPreview === Number(data?.length) - 1;

  const onNext = () => {
    if (shouldNext) {
      return;
    }
    setCurrentPreview((prev) => prev + 1);
  };

  const onPrev = () => {
    if (shouldPrev) {
      return;
    }
    setCurrentPreview((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreview((prevIndex) => {
        if (data?.length) {
          if (prevIndex === data.length - 1) {
            useAppStore.setState({ slider: { show: false, id: "" } });
            return prevIndex;
          }
          return (prevIndex + 1) % data.length;
        }

        return prevIndex;
      });
    }, timeoutNumber);

    return () => {
      clearInterval(interval);
    };
  }, [data, currentPreview]);

  useEffect(() => {
    if (data?.length) {
      document.body.style.backgroundImage = `url(${data[currentPreview].image})`;
    }
  }, [data, currentPreview]);

  useEffect(() => {
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <>
      <Helmet>
        <body className="text-center bg-cover bg-no-repeat sm:bg-none" />
      </Helmet>
      {!isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          {data?.length ? (
            <>
              <div className="hidden sm:block">
                <ContentDesktop
                  data={data}
                  currentPreview={currentPreview}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              </div>
              <div className="sm:hidden block">
                <ContentMobile
                  data={data}
                  currentPreview={currentPreview}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              </div>
            </>
          ) : (
            <>
              <Empty />
              <p>No stories available at the moment</p>
              <Button
                className="mt-2"
                onClick={() =>
                  useAppStore.setState({ slider: { show: false, id: "" } })
                }
              >
                Go Back
              </Button>
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}

      {error instanceof Error && (
        <div className="flex justify-center items-center">
          <ServerError message={error.message} />
          <Button
            className="mt-2"
            onClick={() =>
              useAppStore.setState({ slider: { show: false, id: "" } })
            }
          >
            Go Back
          </Button>
        </div>
      )}
    </>
  );
};

export default MainSlider;

const ContentDesktop = ({ data, currentPreview, onPrev, onNext }: any) => {
  return (
    <div
      className="sm:grid sm:place-items-center sm:h-screen bg-cover bg-no-repeat rounded-xl relative"
      style={{ backgroundImage: `url(${data[currentPreview].image})` }}
    >
      <div className="sm:w-[500px]">
        <div className="top-0 absolute sm:w-[500px] w-full">
          <div className="flex gap-3 mx-3 mt-2">
            {data.map((_: any, index: number) => (
              <ActivityIndicator
                key={index}
                color="#1D2D50"
                current={currentPreview === index}
                currentIndex={index}
                currentPreview={currentPreview}
              />
            ))}
          </div>
          <div className="mt-[1px] flex justify-between mx-3">
            <div>
              <p className="text-white">Cha Cha</p>
            </div>
            <div className="flex gap-1">
              <div
                onClick={() => {
                  useAppStore.setState({
                    slider: { show: false, id: "" },
                  });
                }}
                className="cursor-pointer"
              >
                <X
                  color="white"
                  onClick={() => {
                    useAppStore.setState({
                      slider: { show: false, id: "" },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content in middle */}
        <div className="mx-3">
          <div className="flex -ml-1">
            <div
              className="absolute left-0 top-[50px] w-[150px] h-[85%]"
              onClick={onPrev}
            >
              <p className="invisible">Prev</p>
            </div>

            <div>
              <h2
                className={`font-extrabold text-3xl mt-3 text-center text-[#1D2D50]`}
              >
                {data[currentPreview].header}
              </h2>
              <p className="mt-3 text-clip text-xl text-[#1D2D50]">
                {data[currentPreview]?.contents[0]}
              </p>
              <p className="mt-3 text-clip text-xl text-[#1D2D50]">
                {data[currentPreview]?.contents[1]}
              </p>
            </div>
            <div
              className="absolute right-0 top-[50px] w-[150px] h-[85%]"
              onClick={onNext}
            >
              <p className="invisible">Next</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentMobile = ({ data, currentPreview, onPrev, onNext }: any) => {
  return (
    <div>
      <div className="sm:w-[500px]">
        <div className="top-0 absolute sm:w-[500px] w-full">
          <div className="flex gap-3 mx-3 mt-2">
            {data.map((_: any, index: number) => (
              <ActivityIndicator
                key={index}
                current={currentPreview === index}
                currentIndex={index}
                currentPreview={currentPreview}
              />
            ))}
          </div>
          <div className="mt-[1px] flex justify-between mx-3">
            <div>
              <p className="text-white">Cha Cha</p>
            </div>
            <div className="flex gap-1">
              <div
                onClick={() => {
                  useAppStore.setState({
                    slider: { show: false, id: "" },
                  });
                }}
                className="cursor-pointer"
              >
                <X
                  color="white"
                  onClick={() => {
                    useAppStore.setState({
                      slider: { show: false, id: "" },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content in middle */}
        <div className="mx-3">
          <div className="flex -ml-1">
            <div
              className="fixed left-0 top-[50px] h-full w-[120px]"
              onClick={onPrev}
            >
              <p className="invisible">Prev</p>
            </div>

            <div>
              <h2
                className={`font-extrabold text-3xl mt-3 sm:mt-56 text-center text-[#1D2D50]`}
              >
                {data[currentPreview].header}
              </h2>
              <p className="mt-3 text-clip text-xl text-[#1D2D50]">
                {data[currentPreview]?.contents[0]}
              </p>
              <p className="mt-3 text-clip text-xl text-[#1D2D50]">
                {data[currentPreview]?.contents[1]}
              </p>
            </div>
            <div
              className="fixed right-0 h-full top-[50px] w-[120px]"
              onClick={onNext}
            >
              <p className="invisible">Next</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
