import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import Button from "../../library/Button";
import { useNavigate } from "react-router-dom";

const PendingWeeklyAnswer = () => {
  const navigate = useNavigate();
  const modalOpen = useAppStore((state) => state.modal);
  const pendingWeeklyAnswer = useAppStore((state) => state.pendingWeeklyAnswer);

  return (
    <Modal
      title="Action Required"
      open={modalOpen.open && modalOpen.type === "pendingWeeklyAnswer"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <div className="flex justify-center items-center">
        <p className="text-black my-5">
          You're yet to answer this week topic {" "}
          <span className="font-bold">{pendingWeeklyAnswer.topicName}</span>
        </p>

      </div>
        <Button
          onClick={() => navigate(pendingWeeklyAnswer.link)}
          color="orange"
          className="w-full"
        >
          <p className="text-base text-[#1D2D50] font-semibold">Go to Topic</p>
        </Button>
    </Modal>
  );
};

export default PendingWeeklyAnswer;
