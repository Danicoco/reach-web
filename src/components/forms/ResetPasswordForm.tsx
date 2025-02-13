import { Form } from "antd";
import { useMutation } from "react-query";import { useNavigate } from "react-router-dom";

import { getData } from "../../utils/shared";
import { resetPassword } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { useState } from "react";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation(resetPassword, {
    retry: false,
    onSuccess: () => {
      navigate("/login?reset=successful");
    },
  });

  const onFinish = (values: Pick<IUser, "email" | "otp" | "password">) => {
    mutation.mutate({
      password: values.password,
      code: values.otp,
      loginId: String(getData("plps-01")),
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="otp"
        label={<p className="navy-color">Code</p>}
        rules={[{ required: true, message: "Enter a valid otp", len: 6 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="navy-color">Password</p>}
        rules={[{ required: true, message: "Enter password", type: "string" }]}
      >
        <Input
          Password
          placeholder="***************"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={
          <div className="flex justify-between w-full">
            <p className="navy-color">Confirm Password</p>
          </div>
        }
        rules={[
          { required: true, message: "Enter password again", type: "string" },
        ]}
      >
        <Input
        className={password && confirmPassword && password !== confirmPassword ? "border-red-500" : ""}
          Password
          autoComplete="no"
          placeholder="***************"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Item>

      <Button htmlType="submit" loading={mutation.isLoading}>
        Submit
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
