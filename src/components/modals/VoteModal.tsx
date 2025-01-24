import { Modal } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import TextArea from "antd/es/input/TextArea";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { voteChat } from "../../server/chat";
import useAppStore from "../../utils/appStore";

const VoteChat = () => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const modalOpen = useAppStore((state) => state.modal);
  const vote = useAppStore((state) => state.voteSelection);

  const close = () => {
    setComment("");
    setError(false);
    useAppStore.setState({ modal: { open: false, type: "" } });
  };

  const { mutate, isLoading } = useMutation(voteChat, {
    onSuccess: (_data) => {
      close();
    },
    onError: (_e) => {
      setError(true);
    },
  });

  const onSubmit = () => {
    const payload = {
      reference: vote.reference,
      comment,
    };

    mutate(payload);
  };
  return (
    <Modal
      title="Feed back"
      open={modalOpen.open && modalOpen.type === "voteChat"}
      footer={null}
      onCancel={close}
      className="bg-[#] grid gap-5"
    >
      <div className="flex flex-col gap-2">
        <p>{`Please let us know why that was ${
          vote.voteType === "upVote" ? `good` : `bad`
        }`}</p>
        {error ? <ServerError message="Something went wrong!" /> : null}
        <TextArea
          className="resize-none"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={4}
        />
      </div>
      <div className="w-[60%] mx-auto mt-4">
        <Button
          onClick={onSubmit}
          loading={isLoading}
          disabled={isLoading}
          color="orange"
          className="w-full flex justify-center items-center"
        >
          <p className="text-base text-[#ffffff] font-semibold">Submit</p>
        </Button>
      </div>
    </Modal>
  );
};

export default VoteChat;
