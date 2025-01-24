import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";

type Props = {
  type?: "default" | "bordered" | "colored";
  width?: number | string;
};

const Logo = ({ width = 50, type = "default" }: Props) => {
  const variant = {
    default: `${import.meta.env.VITE_S3_URL}/logo.png`,
    bordered: Logo2,
    colored: Logo3,
  };
  return <img src={variant[type]} {...{ width }} />;
};

export default Logo;
