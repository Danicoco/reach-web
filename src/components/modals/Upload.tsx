import { Modal } from "antd";
import Selector from "../uploads/Selector";
import useAppStore from "../../utils/appStore";

type Props = {
  token: string;
};

const Upload = ({ token }: Props) => {
  const { uploadType, modal } = useAppStore();

  return (
    <Modal
      title={
        <p className="capitalize text-xl font-bold">Upload {uploadType}</p>
      }
      open={modal.open && modal.type === "upload"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
    >
      <div className="mt-5">
        <Selector type={uploadType} token={token} />
      </div>
    </Modal>
  );
};

export default Upload;
