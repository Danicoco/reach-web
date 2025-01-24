import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { invitationContent } from "../../utils/static";

const InviteFriend = () => {
  const modalOpen = useAppStore((state) => state.modal);
  return (
    <Modal
      title="Invite Friend"
      open={modalOpen.open && modalOpen.type === "inviteFriend"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
    >
      <div className="flex justify-center items-center">
        <div className="mt-5 flex gap-5">
          <EmailShareButton {...invitationContent["email"]}>
            <EmailIcon round size={50} />
          </EmailShareButton>

          <FacebookShareButton {...invitationContent["facebook"]}>
            <FacebookIcon round size={50} />
          </FacebookShareButton>

          <LinkedinShareButton {...invitationContent["linkedin"]}>
            <LinkedinIcon round size={50} />
          </LinkedinShareButton>

          <TwitterShareButton {...invitationContent["twitter"]}>
            <TwitterIcon round size={50} />
          </TwitterShareButton>

          <WhatsappShareButton {...invitationContent["whatsapp"]}>
            <WhatsappIcon round size={50} />
          </WhatsappShareButton>
        </div>
      </div>
    </Modal>
  );
};

export default InviteFriend;
