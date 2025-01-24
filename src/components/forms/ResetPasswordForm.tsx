import { Form } from "antd";
import { useMutation } from "react-query";import { useNavigate } from "react-router-dom";

import { getData } from "../../utils/shared";
import { resetPassword } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation(resetPassword, {
    retry: false,
    onSuccess: () => {
      navigate("/login?reset=successful");
    },
  });

  const onFinish = (values: Pick<IUser, "email" | "otp" | "password">) => {
    mutation.mutate({
      ...values,
      email: String(getData("plps-01")),
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="otp"
        rules={[{ required: true, message: "Enter a valid otp" }]}
      >
        <Input />
      </Form.Item>

    </Form>
  );
};

export default ResetPasswordForm;
