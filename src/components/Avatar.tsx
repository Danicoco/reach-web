import { avatarList } from "../utils/static";

type Props = {
  width?: number;
  name: string;
};

const Avatar = ({ width = 50, name }: Props) => {
  return (
    <img src={avatarList.find((a) => a.asset === name)?.path} {...{ width }} />
  );
};

export default Avatar;
