
type Props = {
  id: string;
  itemId: string;
  token: string;
  open: boolean;
};

const SpotifyDrawer = ({ id, token, itemId, open }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 w-full text-center shadow-md">
      {open && (
        <div className="">
          <iframe
            allow="encrypted-media *; autoplay;"
            loading="lazy"
            src={`${
              import.meta.env.VITE_PLAYER
            }/spotify?token=${token}&uri=${itemId}&mediaId=${id}&access=${localStorage.getItem(
              "access"
            )}`}
            className="w-full flex justify-center items-center"
          />
        </div>
      )}
    </div>
  );
};

export default SpotifyDrawer;
