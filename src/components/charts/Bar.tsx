import { Bar } from "@ant-design/plots";

export type IData = {
  option: string;
  distribution: number;
  selected: boolean;
};

type Props = {
  data: IData[];
};

const BarColumn = ({ data }: Props) => {
  const config = {
    width: 100,
    height: 180,
    data,
    yField: "option",
    xField: "distribution",
    columnWidthRatio: 0.9,
    label: {
      position: "middle",
      style: {
        fill: "#fff",
        opacity: 1.0,
      },
      formatter: ({ distribution }: any) => {
        return distribution <=0 ? null : `${distribution}%`;
      },
    },
    tooltip: false,
    yAxis: {
      grid: {
        line: {
          style: {
            lineWidth: 0,
            color: "#f5f1e6",
          },
        },
      },
      label: {
        formatter: (h: string) => {
          return h;
        },
      },
    },
    xAxis: {
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
    },
    color: ({ option }: any) => {
      const selectedAnswer = data.find((d) => d.option === option);
      if (selectedAnswer?.selected) {
        return "#da8e6b";
      }
      return "#1d2d50";
    },
    meta: {
      answer: {
        alias: "Answer",
      },
      question: {
        alias: "Question",
      },
    },
  };
  return (
    <div className=" flex justify-center items-center">
      <div className="h-[220px] w-full p-3">
        {
          // @ts-ignore
          <Bar {...config} />
        }
      </div>
    </div>
  );
};

export default BarColumn;
