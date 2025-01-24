import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ArrowRight, StopCircle, Loader } from "react-feather";

import Button from "../library/Button";

type Props = {
  chat: string;
  loading: boolean;
  responses: number;
  disabled?: boolean;
  action: () => void;
  setChat: Dispatch<SetStateAction<string>>;
};

const ChatInput = ({
  setChat,
  action,
  responses,
  disabled = false,
  loading = false,
  chat,
}: Props) => {
  const [overflow, setOverflow] = useState<"hidden" | "auto">("hidden");
  const resizeTextarea = () => {
    const textarea = document.getElementById("chat-prompt");
    if (textarea) {
      textarea.style.height = "100%";
      textarea.style.height = `${textarea.scrollHeight}px`;
      if (textarea.style.height >= textarea.style.maxHeight) {
        setOverflow("auto");
      } else {
        setOverflow("hidden");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  };

  useEffect(() => {
    resizeTextarea();
  }, [chat]);

  useEffect(() => {
    if (loading) setOverflow("hidden");
  }, [loading]);

  const submit = (e?: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e?.key === "Enter" && e?.shiftKey === false) {
      action();
    }
  };

  return (
    <div className="w-full border rounded-[12px] border-[#E8ECEF] flex gap-3 p-3 bg-[#1D2D50] items-center">
      <textarea
        name="chat"
        id="chat-prompt"
        rows={1}
        value={chat}
        disabled={loading || disabled}
        onChange={handleChange}
        placeholder="Message"
        style={{ overflowY: overflow }}
        onKeyDown={submit}
        className={`w-full bg-transparent max-h-[60px] resize-none placeholder:text-[17px] placeholder:text-[#6C7275] font-[500] text-[16px] text-white py-[10px] outline-0 focus:outline-0 disabled:cursor-not-allowed`}
      ></textarea>
      {responses <= 1 && loading ? (
        <StopCircle color={`#DA8E6B`} size={30} className="opacity-[0.8]" />
      ) : responses > 1 && loading ? (
        <Loader
          color={`#DA8E6B`}
          size={30}
          className="opacity-[0.8] animate-spin"
        />
      ) : (
        <Button
          color="orange"
          className={`w-auto`}
          onClick={action}
          {...{ loading }}
          rounded="rounded-[6px]"
          disabled={loading || !chat.length || disabled}
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};

export default ChatInput;
