import { Form } from "antd";
import Input from "../../../library/Input";
import Button from "../../../library/Button";
import { useMutation } from "react-query";
import { updateProfile } from "../../../server/user";
import ServerError from "../../ServerError";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const ProfileUsername = ({ setStep }: Props) => {
  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      setStep(2);
    },
  });
  const onFinish = (values: Partial<IUser>) => {
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      <ServerError
        message={mutation.error instanceof Error ? mutation.error.message : ""}
      />
      <Form.Item
        name="username"
        label={<p className="text-black font-bold">Username</p>}
        rules={[{ required: true, message: "Enter username" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="my-8" loading={mutation.isLoading}>
          Proceed
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileUsername;
