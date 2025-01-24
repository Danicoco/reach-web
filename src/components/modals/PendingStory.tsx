import { Modal } from "antd";
import useAppStore from "../../utils/appStore";

const PendingStory = () => {
  const modalOpen = useAppStore((state) => state.modal);
  return (
    <Modal
      title="Dashboard"
      open={modalOpen.open && modalOpen.type === "pendingStory"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <div className="flex justify-center items-center">
       <p className="text-black my-5">Your Dashboard is not available yet</p>
      </div>
    </Modal>
  );
};

export default PendingStory;
