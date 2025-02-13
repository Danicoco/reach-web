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
      navigate("/reset-password");
    },
  });

const onFinish = (values: { loginId: string }) => {
    saveData("plps-01", values.loginId);
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="loginId"
        label={<p className="navy-color">Email</p>}
        rules={[
          { required: true, message: "Enter a valid email", type: "email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          block
          htmlType="submit"
          loading={mutation.isLoading}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgetPasswordForm;
