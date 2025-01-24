import { Modal } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../utils/appStore";
import { appLogout } from "../../utils/shared";
import { deactivateAccount } from "../../server/user";

import Button from "../../library/Button";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const modalOpen = useAppStore((state) => state.modal);

  const mutation = useMutation(deactivateAccount, {
    onSuccess: () => {
      appLogout();
      navigate("/");
    },
  });

  return (
    <Modal
      title="Delete Account"
      open={modalOpen.open && modalOpen.type === "deleteAccount"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
    >
      <div className="flex flex-col justify-center items-center">
        <p>Are you sure you want to delete your account?</p>
        <div className="flex gap-5 mt-5">
          <Button
            block
            dashboardHeight
            color="danger"
            className="w-[128px]"
            onClick={() =>
              useAppStore.setState({ modal: { open: false, type: "" } })
            }
          >
            Cancel
          </Button>
          <Button
            loading={mutation.isLoading}
            block
            dashboardHeight
            className="w-[128px]"
            onClick={() => mutation.mutateAsync()}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccount;
