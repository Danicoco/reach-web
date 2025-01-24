import { Modal } from "antd";
import useAppStore from "../../utils/appStore";

import CreateFeedback from "../forms/CreateFeedback";

const Feedback = () => {
  const modalOpen = useAppStore((state) => state.modal);
  return (
    <Modal
      title="Give Feedback"
      open={modalOpen.open && modalOpen.type === "feedback"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <div className="mt-5">
        <CreateFeedback />
      </div>
    </Modal>
  );
};

export default Feedback;
