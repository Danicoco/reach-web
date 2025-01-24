import { Form } from "antd";
import { useState } from "react";
import { RuleObject } from "antd/es/form";
import { useMutation } from "react-query";

import { changePassword } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";

const ChangePasswordForm = () => {
  const validatePassword = (_: RuleObject, value: string) => {
    // Password should have at least 1 special character, 1 number, and minimum 8 characters
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject("Your password is not strong enough.");
    }
    return Promise.resolve();
  };

  const [success, setSuccess] = useState(false);

  const mutation = useMutation(changePassword, {
    onSuccess: () => {
      setSuccess(true);
    },
    onMutate: () => {
      setSuccess(false);
    },
  });

  const onFinish = (values: Partial<IUser>) => {
    const data = {
      ...values,
    };
    mutation.mutateAsync(data);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      {success && (
        <p className="text-black font-bold text-center">
          Password successfully changed
        </p>
      )}
      <Form.Item
        name="oldPassword"
        label={<p className="text-black">Old Password</p>}
        rules={[{ required: true, message: "Enter password" }]}
      >
        <Input type="password" color="outline" />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="text-black">New Password</p>}
        rules={[
          { required: true, message: "Enter password" },
          { validator: validatePassword },
        ]}
      >
        <Input type="password" color="outline" />
      </Form.Item>
      <p className="text-black text-xs">
        Use at least 8 characters with 1 number and one special character
      </p>

      <Form.Item>
        <Button
          block
          className="mt-8"
          htmlType="submit"
          loading={mutation.isLoading}
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
