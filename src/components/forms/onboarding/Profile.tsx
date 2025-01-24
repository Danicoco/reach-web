import { Form } from "antd";
import Input from "../../../library/Input";
import ProfileImage from "../../../assets/profile-pics.png";

const SetupProfile = () => {
  const onFinish = (values: Partial<IUser>) => {
    const data = {
      ...values,
    };
    console.log(data);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <div className="">
            <p className="font-bold">Upload your favorite picture</p>
            <div className="flex justify-center items-center mt-5">
            <img src={ProfileImage}  />
            </div>
        </div>
      <Form.Item
        name="bio"
        className="mt-5"
        label={<p className="text-black font-bold">Bio</p>}
        rules={[{ required: true, message: "Enter username" }]}
      >
        <Input textarea />
      </Form.Item>
    </Form>
  );
};

export default SetupProfile;
