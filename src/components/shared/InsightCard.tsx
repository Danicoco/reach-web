import { Empty } from "antd";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import "../../Gradient.css";
import useAppStore from "../../utils/appStore";

import Button from "../../library/Button";

type Props = {
  data: ITopic[];
  gap?: string;
  basis?: string;
  className?: string;
  storyNumber?: number;
  horizontalScroll?: boolean;
};

const InsightCard = ({
  data,
  gap = "gap-5",
  className,
  basis = "0 0 90%",
  horizontalScroll,
  storyNumber,
}: Props) => {
  const navigate = useNavigate();

  const gotoDashboard = (topicId: string) => {
    if (Number(storyNumber) > 9) {
      navigate(`/live-dashboard/${topicId}`);
      return;
    }

    useAppStore.setState({ modal: { open: true, type: "pendingStory" } });
  };

  return (
    <div
      className={`${className} ${
        horizontalScroll
          ? `flex whitespace-nowrap overflow-auto w-full ${gap}`
          : "w-full"
      } rounded-lg rounded-br-[0px]`}
    >
      {data.length ? (
        data.map((dt) => (
          <div
            key={dt.id}
            className={`
           rounded-lg p-3 mt-3 bg-[#1D2D50] w-full 
           `}
            style={{ flex: basis }}
          >
            <div className={`flex items-center gap-5`}>
              <div className={`${dt.image ? "" : "block-1"}`}>
                <img
                  src={dt.image}
                  className={`rounded-lg h-[57.3px] w-[57.3px] object-cover`}
                />
              </div>
              <div className="flex justify-between flex-col w-[70%] self-baseline">
                <div className="">
                  <h3 className="text-white text-lg font-bold">{dt.title}</h3>
                  <div
                    className={`${
                      ["completed", "scheduled"].includes(dt.status)
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    {dt.status === "completed" && (
                      <p className="text-[10px] text-slate-50">
                        Completed {dt.endDate ? format(new Date(dt.endDate), "dd/MM/yyyy") : ''}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center w-full">
                  {dt.status === "published" && (
                    <>
                      {dt.hasAnswered && (
                        <Button
                          className="mt-[4px]"
                          onClick={() => gotoDashboard(String(dt.id))}
                          color="outline"
                          dashboardHeight
                        >
                          View Pulse
                        </Button>
                      )}
                      {!dt.hasAnswered && (
                        <Button
                          className="mt-[4px]"
                          onClick={() =>
                            navigate(`/insight/${dt.id}/${dt.title}`)
                          }
                          color="orange"
                          dashboardHeight
                        >
                          Join Pulse
                        </Button>
                      )}
                      {dt.hasStory && (
                        <Button
                          block={false}
                          className="mt-[4px] ml-2"
                          color="orange"
                          onClick={() =>
                            useAppStore.setState({
                              slider: { show: true, id: String(dt?.id) },
                            })
                          }
                          dashboardHeight
                        >
                          Your Wrap
                        </Button>
                      )}
                    </>
                  )}

                  {dt.status === "completed" && (
                    <div className="flex gap-4 w-full">
                      {dt.hasAnswered && (
                        <Button
                          className="mt-[4px]"
                          onClick={() => {
                            navigate(`/live-dashboard/${dt.id}`);
                          }}
                          color="outline"
                          dashboardHeight
                        >
                          View Pulse
                        </Button>
                      )}
                      {!dt.hasAnswered && (
                        <Button
                          className="mt-[4px]"
                          onClick={() =>
                            navigate(`/insight/${dt.id}/${dt.title}`)
                          }
                          color="orange"
                          dashboardHeight
                        >
                          Join Pulse
                        </Button>
                      )}

                      {dt.hasStory && (
                        <Button
                          block={false}
                          className="mt-[4px]"
                          dashboardHeight
                          color="outline"
                          onClick={() =>
                            useAppStore.setState({
                              slider: { show: true, id: String(dt?.id) },
                            })
                          }
                        >
                          View Wrap
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Empty description={false} />
      )}
    </div>
  );
};

export default InsightCard;
