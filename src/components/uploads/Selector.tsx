import { useState } from "react";
import { Radio, RadioChangeEvent } from "antd";

import Vimeo from "./Vimeo";
import YouTube from "./YouTube";
import Spotify from "./Spotify";
import CompletedCheck from "../../assets/completed.png";

const videoOptions = [
  { label: "YouTube", value: "youtube" },
  { label: "Vimeo", value: "vimeo" },
];

const audioOptions = [{ label: "Spotify", value: "spotify" }];

type Props = {
  type: string;
  token: string;
};

const Selector = ({ type, token }: Props) => {
  const [completed, setCompleted] = useState(false);
  const [selection, setSelection] = useState("");

  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === "spotify" && !token) {
      window.location.href = `${
        import.meta.env.VITE_SPOTIFY_LINK
      }&redirect_uri=${import.meta.env.VITE_SPOTIFY_REDIRECT}${
        import.meta.env.VITE_SPOTIFY_SCOPE
      }`;
    }
    setSelection(e.target.value);
  };

  return (
    <div>
      {completed ? (
        <div className="grid place-items-center">
          <img src={CompletedCheck} className="h-[110px] w-[110px]" />
          <p className="font-bold text-lg mt-5">Upload Successful</p>
          <p className="text-center mt-3">
            We're currently reviewing your content to ensure it aligns with our
            community guidelines. Please allow us 24 to 48 hours for this
            process. Once complete, your content will be promptly uploaded.
            Thank you for your patience!
          </p>
        </div>
      ) : (
        <div>
          <Radio.Group
          defaultValue={selection}
            options={type === "video" ? videoOptions : audioOptions}
            optionType="button"
            buttonStyle="solid"
            onChange={onChange}
          />

          {token && type === "audio" && (
            <Spotify setCompleted={setCompleted} type={type} token={token} />
          )}

          {selection === "vimeo" && (
            <Vimeo
              setCompleted={setCompleted}
              type={type}
              selection={selection}
            />
          )}

          {selection === "youtube" && (
            <YouTube
              setCompleted={setCompleted}
              type={type}
              selection={selection}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Selector;
