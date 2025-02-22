import { Form } from "antd";
import Input from "../../../library/Input";
import ProfileImage from "../../../assets/profile-pics.png";
import Button from "../../../library/Button";
import { useMutation } from "react-query";
import { updateProfile } from "../../../server/user";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const SetupProfile = ({ setStep }: Props) => {

  const mutation = useMutation(updateProfile, {
      onSuccess: () => {
        setStep(3);
      },
    });
    const onFinish = (values: Partial<IUser>) => {
      mutation.mutate(values);
    };
  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      <div className="">
        <p className="font-bold">Upload your favorite picture</p>
        <div className="flex justify-center items-center mt-5">
          <img src={ProfileImage} />
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

      <Form.Item>
        <Button htmlType="submit" className="my-8" loading={mutation.isLoading}>
          Proceed
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SetupProfile;
