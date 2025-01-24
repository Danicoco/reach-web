import { Progress as AntProgress } from "antd";

type Props = {
  percent: number;
  trailColor?: string;
  strokeColor?: string;
};

const Progress = ({
  percent,
  strokeColor = "#333333",
  trailColor = "#828282",
}: Props) => {
  return (
    <AntProgress
      percent={percent}
      showInfo={false}
      {...{ trailColor }}
      size="small"
      {...{ strokeColor }}
    />
  );
};

export default Progress;
