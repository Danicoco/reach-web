type Props = {
  current: boolean;
  currentPreview: number;
  currentIndex: number;
  color?: string;
};

const ActivityBar = ({
  current,
  currentIndex,
  currentPreview,
  color = "bg-white",
}: Props) => {
  return (
    <div
      className={`relative ${
        currentPreview > currentIndex ? color : "bg-slate-500 "
      } h-[2px] w-full`}
    >
      {current && (
        <div
          className={`${color} h-[2px] absolute top-0 left-0`}
          style={{
            width: "100%",
            animation: "progress-animation 15s linear",
          }}
        ></div>
      )}
      <style>
        {`
          @keyframes progress-animation {
            0% {
              width: 0;
            }
            100% {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ActivityBar;
