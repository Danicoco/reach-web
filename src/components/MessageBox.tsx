import remarkGfm from "remark-gfm";
import { useMutation } from "react-query";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";

import Logo from "./Logo";
import Avatar from "./Avatar";
import { voteChat } from "../server/chat";
import ThumbsUp from "../assets/upLine.svg";
import useAppStore from "../utils/appStore";
import ThumbsUpFill from "../assets/upFill.svg";
import ThumbsDown from "../assets/downLine.svg";
import ThumbsDownFill from "../assets/downFill.svg";
import { getCustomerDetails } from "../utils/shared";

type Props = {
  reference?: string;
  content: string;
  loading: boolean;
  disabled: boolean;
  type: "user" | "ai";
  voteType?: "upVote" | "downVote";
};

const MessageBox = ({
  type,
  content,
  reference = "",
  disabled,
  voteType,
}: Props) => {
  const customer = getCustomerDetails();
  const textRef = useRef<HTMLDivElement>(null);
  const [upVote, setUpVote] = useState<boolean>(voteType === "upVote" || false);
  const [downVote, setDownVote] = useState<boolean>(
    voteType === "downVote" || false
  );
  const [copyText, setCopyText] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(voteChat, {
    onSuccess: (data) => {
      if (data.voteType === "upVote") {
        setUpVote(true);
        setDownVote(false);
      } else {
        setUpVote(false);
        setDownVote(true);
      }
      useAppStore.setState({
        voteSelection: {
          reference: reference as string,
          voteType: data.voteType,
        },
        modal: { open: true, type: "voteChat" },
      });
    },
    onError: (_e) => {},
  });

  const onCopy = () => {
    if (!disabled) {
      const toCopy = textRef.current?.innerText;
      navigator.clipboard
        .writeText(String(toCopy))
        .then(() => {
          setCopyText(true);
          setTimeout(function () {
            setCopyText(false);
          }, 2000);
        })
        .catch((_err) => {});
    }
  };
  const onVote = (type: "upVote" | "downVote") => {
    if ((type === "upVote" && upVote) || (type === "downVote" && downVote)) {
      return;
    }

    mutate({ reference: reference as string, voteType: type });
  };

  const classes: Record<string, string> = {
    user: "bg-[#1D2D50] border-[#4C4D56] rounded-tl-[12px] rounded-b-[12px]",
    ai: "bg-[#F5F1E6] border-[#4C4D56] rounded-tr-[12px] rounded-b-[12px]",
  };
  return (
    <>
      <div
        className={`w-full flex gap-3 items-start ${
          type === "ai" ? `flex-row` : `flex-row-reverse`
        } `}
      >
        {type === "ai" ? (
          <Logo width={34} type="bordered" />
        ) : (
          <Avatar name={customer.meta?.avatar} width={34} />
        )}
        <div {...(type === "ai" && { style: { flexGrow: 1 } })}>
          <div className={`py-3 px-4 border h-fit w-auto ${classes[type]}`}>
            {type === "user" ? (
              <p className="text-sm leading-[22px] text-white break-words">
                {content}
              </p>
            ) : (
              <div
                className="text-sm leading-[22px] text-[#1D2D50] md"
                ref={textRef}
              >
                <ReactMarkdown
                  className="prose text-[14px]"
                  rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
                  remarkPlugins={[remarkGfm]}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          {type === "ai" ? (
            <div className="mt-4 flex justify-between items-center px-1">
              <div className="grid gap-1">
                {copyText ? <p className="text-white">copied!</p> : null}
                <div className="flex justify-between">
                  <img
                    src={`${import.meta.env.VITE_S3_URL}/copy-icon.svg`}
                    alt="copy icon"
                    onClick={() => onCopy()}
                    className={`${
                      disabled
                        ? `disabled:pointer-events-none`
                        : `cursor-pointer`
                    }`}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  className={`${
                    isLoading ? `pointer-events-none` : `cursor-pointer`
                  }`}
                  src={`${upVote ? ThumbsUpFill : ThumbsUp}`}
                  alt={"thumbs up"}
                  width={24}
                  onClick={() => onVote("upVote")}
                />
                <img
                  className={`${
                    isLoading ? `pointer-events-none` : `cursor-pointer`
                  }`}
                  src={`${downVote ? ThumbsDownFill : ThumbsDown}`}
                  alt={"thumbs down"}
                  width={24}
                  onClick={() => onVote("downVote")}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
