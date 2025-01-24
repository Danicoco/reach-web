import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { retrieveDashboard } from "../../server/quiz";
import { getCustomerDetails, truncateText } from "../../utils/shared";
import Loading from "../../components/Loading";
import Pie from "../../components/charts/Pie";
import BarColumn from "../../components/charts/Bar";
import Column from "../../components/charts/Column";
import Button from "../../library/Button";

const LiveDashboard = () => {
  const navigate = useNavigate();
  const customer = getCustomerDetails();
  const { id } = useParams();
  const [graphSection, setGraphSection] = useState("distributeGeneral");

  const { data, isLoading } = useQuery(
    ["live-dashboard", id],
    () => retrieveDashboard(id as string),
    {
      retry: false,
    }
  );

  return (
    <div className="grid place-items-center">
      <div className="sm:w-[751px]">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-5 mb-10">
            <div className="text-center mb-5">
              {graphSection === "distributeGeneral" ? (
                <div>
                  <p className="capitalize text-[18px] leading-[28px] font-bold navy-color">
                    {data?.topic} Pulse
                  </p>
                  <p className="capitalize text-[#DA8E6B] text-base font-semibold">
                    All Cha Cha users
                  </p>
                </div>
              ) : (
                <div>
                  <p className="capitalize text-[18px] leading-[28px] font-bold navy-color">
                    {data?.topic} Pulse
                  </p>
                  <p className="capitalize text-[#DA8E6B] text-base font-semibold">
                    {customer?.meta?.archetype}
                    <span className="lowercase">s</span>
                  </p>
                </div>
              )}
            </div>
            {data?.chartResult?.isTag && (
              <div className="flex justify-between mb-2">
                <div />
                <div
                  className="flex gap-1"
                  onClick={() =>
                    setGraphSection((prev) =>
                      prev === "distributeGeneral"
                        ? "distributeByTag"
                        : "distributeGeneral"
                    )
                  }
                >
                  {graphSection === "distributeGeneral" ? (
                    <>
                      <div className="navy-bg rounded-full cursor-pointer py-[8px] px-[12px] grid place-content-center w-fit">
                        <p className="text-xs text-white">
                          View {customer?.meta?.archetype}s
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="navy-bg rounded-full cursor-pointer py-[8px] px-[12px] grid place-content-center w-fit">
                        <p className="text-xs text-white">View all users</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="sm:grid sm:grid-cols-2 sm:gap-10 flex flex-col gap-2">
              {data?.chartResult[graphSection] &&
                Object.keys(data?.chartResult[graphSection]).map(
                  (chart: string, index) => {
                    const record =
                      data?.chartResult[graphSection][chart].record;
                    const usePie = record?.find(
                      (rec: { option: string }) => rec.option.length > 15
                    );
                    const isMultiselect = record?.find(
                      (rec: { multiselect: boolean }) => rec.multiselect
                    );
                    const useBar = record?.every((item: { option: string }) => item.option.length <= 5);

                    // pie chart = 15 - 22 characters
                    // column = multiselect
                    // bar chart = < 5

                    return (
                      <div
                        key={index}
                        className="bg-transparent border-[1px] border-[#1d2d50] p-2 rounded-xl w-[350px] h-[320px]"
                      >
                        <p className="text-sm navy-color mb-3">
                          {truncateText(`${chart}`, 90)}
                        </p>
                        {!!isMultiselect ? (
                          <>
                            {usePie ? (
                              <Pie
                                data={
                                  data?.chartResult[graphSection][chart].record
                                }
                              />
                            ) : (
                              <BarColumn
                                data={
                                  data?.chartResult[graphSection][chart].record
                                }
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {useBar ? (
                              <Column
                                data={
                                  data?.chartResult[graphSection][chart].record
                                }
                              />
                            ) : (
                              <>
                                <BarColumn
                                  data={
                                    data?.chartResult[graphSection][chart]
                                      .record
                                  }
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                    );
                  }
                )}
              {graphSection === "distributeGeneral" ? (
                <p className="font-bold text-sm italic mt-2">
                  {100 + 3 * data?.totalUsers} answers
                </p>
              ) : (
                <p className="font-bold text-sm italic mt-2">
                  {33 + 3 * data?.totalUsers} answers
                </p>
              )}
            </div>

            <Button
              className="my-10"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Go to home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveDashboard;
