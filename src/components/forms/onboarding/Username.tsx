import { Form } from "antd";
import Input from "../../../library/Input";

const ProfileUsername = () => {

  const onFinish = (values: Partial<IUser>) => {
    const data = {
      ...values,
    };
    console.log(data);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      <Form.Item
        name="username"
        label={<p className="text-black font-bold">Username</p>}
        rules={[{ required: true, message: "Enter username" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ProfileUsername;
