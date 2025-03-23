import { Drawer } from "antd";

type Props = {
  id: string;
  itemId: string;
  token: string;
  open: boolean;
};

const SpotifyDrawer = ({ id, token, itemId, open }: Props) => {
  return (
    <Drawer
      title={null}
      placement="bottom"
      closable={false}
      destroyOnClose
      open={open}
      key={id}
      height={100}
      className="overflow-hidden"
    >
      <iframe
        allow="encrypted-media *; autoplay;"
        loading="lazy"
        src={`${
          import.meta.env.VITE_PLAYER
        }/spotify?token=${token}&uri=${itemId}&mediaId=${id}&access=${localStorage.getItem("access")}`}
        className="w-full flex justify-center items-center"
      />
    </Drawer>
  );
};

export default SpotifyDrawer;
