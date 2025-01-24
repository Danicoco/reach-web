import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import ChangePasswordForm from "../forms/ChangePasswordForm";

const ChangePassword = () => {
  const modalOpen = useAppStore((state) => state.modal);
  return (
    <Modal
      title="Change Password"
      open={modalOpen.open && modalOpen.type === "password"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <div className="mt-5">
        <ChangePasswordForm />
      </div>
    </Modal>
  );
};

export default ChangePassword;
