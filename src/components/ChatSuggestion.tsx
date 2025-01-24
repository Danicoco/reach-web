type Props = {
  width?: string;
  size?: string;
  label: string;
  showArrow?: boolean;
  sendChat: (chat: string) => void;
};

const ChatSuggestion = ({
  label,
  size = "text-base",
  showArrow = true,
  width = "80%",
  sendChat,
}: Props) => {
  const onSelect = () => {
    sendChat(label);
  };
  return (
    <div
      className="cursor-pointer w-full bg-[#1D2D50] border border-[#4C4D56] rounded-[12px] px-[16px] py-[12px] flex items-center justify-between h-full"
      onClick={onSelect}
    >
      <p
        className={`text-white font-[500] ${size}`}
        style={{ maxWidth: width }}
      >
        {label}
      </p>
      {showArrow && (
        <img
          src={`${import.meta.env.VITE_S3_URL}/right-icon.svg`}
          alt="arrow right"
        />
      )}
    </div>
  );
};

export default ChatSuggestion;
