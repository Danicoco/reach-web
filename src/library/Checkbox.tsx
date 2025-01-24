import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

type Props = {
  variant?: "primary" | "secondary";
  onSelect: (e: boolean) => void;
} & CheckboxProps;

const CheckBox = ({
  variant = "primary",
  className,
  onSelect,
  ...rest
}: Props) => {
  return (
    <Checkbox
      {...rest}
      className={`${className} ${variant}`}
      onChange={(e) => onSelect(e.target.checked)}
    />
  );
};

export default CheckBox;
