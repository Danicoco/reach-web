import { Button as AntButton, ButtonProps } from "antd";
import { ReactNode } from "react";

type Props = {
  block?: boolean;
  className?: string;
  children: ReactNode;
  height?: string;
  rounded?: string;
  onClick?: (t?: any) => void;
  color?:
    | "white"
    | "primary"
    | "outline"
    | "black"
    | "danger"
    | "orange"
    | "default" | "none";
  dashboardHeight?: boolean;
} & ButtonProps;

const Button = (props: Props) => {
  const {
    children,
    block = true,
    className,
    rounded = "rounded-xl",
    height = "h-[48px]",
    color = "primary",
    dashboardHeight,
    disabled = false,
    ...rest
  } = props;
  const bgColor =
    (color === "white" && "bg-white border-black border-[1px] text-gray-900") ||
    (color === "orange" && "orange-bg text-white border-none") ||
    (color === "outline" &&
      "text-white bg-transparent border-[1px] border-white") ||
    (color === "black" && "bg-black text-white border-black") ||
    (color === "danger" && "bg-[#8C4B4F] text-white border-[#8C4B4F]") ||
    (color === "default" && "navy-bg text-white border-[1px] border-white") ||
    "bg-[#6601FF] text-white border-none";
  return (
    <AntButton
      {...rest}
      {...{ disabled }}
      block={block}
      className={`${rounded} ${
        dashboardHeight ? "h-[30px]" : height
      } ${bgColor} ${className} ${disabled ? `opacity-70` : ``}`}
    >
      {children}
    </AntButton>
  );
};

export default Button;
