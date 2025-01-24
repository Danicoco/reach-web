import { Form } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { saveData } from "../../utils/shared";
import { forgetPassword } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation(forgetPassword, {
    retry: false,
    onSuccess: () => {
      navigate("/reset-password?code=true");
    },
  });

  const onFinish = (values: Pick<IUser, "email">) => {
    saveData("plps-01", values.email);
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="email"
        label={<p className="navy-color">Email</p>}
        rules={[
          { required: true, message: "Enter a valid email" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          block
          // htmlType="submit"
          onClick={() => navigate("/reset-password?code=true")}
          loading={mutation.isLoading}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgetPasswordForm;
