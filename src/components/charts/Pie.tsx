import { Pie as PieChart } from "@ant-design/plots";

import { IData } from "./Column";
type Props = {
  data: IData[];
};

const Pie = ({ data }: Props) => {
  const selectedAnswer = data.find((d) => d.selected);
  const unSelectedData = data.filter(
    (d) => d.option !== selectedAnswer?.option
  );

  const config = {
    appendPadding: 10,
    data: data.map((d) => ({ option: d.option, distribution: d.distribution })),
    width: 200,
    height: 200,
    angleField: "distribution",
    colorField: "option",
    radius: 0.6,
    label: {
      type: "inner",
      content: ({ percent }: any) =>
        percent <= 0 ? null : `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 11,
        fill: "#fff",
        textAlign: "center",
      },
    },
    color: (v: { option: string }) => {
      if (selectedAnswer?.option === v.option) {
        return "#da8e6b";
      }
      const allColours = [
        "#1D2D50",
        "#E0E4E8",
        "#176D6E",
        "#AEC8D6",
        "#195364",
        "#D0BDA5",
        "#C8D0E7",
        "#F0EDEB",
      ];
      const index = unSelectedData.findIndex(
        (arr: IData) => arr.option.trim() === v.option.trim()
      );
      return allColours[index];
    },
    legend: {
      position: "right",
      maxItemWidth: 250,
      offsetX: -55,
      animate: true,
      slidable: true,
      itemHeight: 20,
      itemName: {
        spacing: 40,
        formatter: (v: string) => {
          const first16Characters = v.slice(0, 22);
          const remainingPart = v.slice(22);
          return !remainingPart
            ? `${first16Characters.trim()}`
            : `${first16Characters.trim()}\n${remainingPart.trim()}`;
        },
        style: (param: { id: string; value: string }) => {
          return {
            fill: param.value === selectedAnswer?.option ? "#da8e6b" : "black",
          };
        },
      },
    },
  };

  return (
    <div className=" flex justify-center items-center mb-28">
      <div className="h-[280px] w-full">
        {
          // @ts-ignore
          <PieChart {...config} />
        }
      </div>
    </div>
  );
};

export default Pie;
