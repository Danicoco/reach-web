import { Form } from "antd";
import { RuleObject } from "antd/es/form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { createPassword } from "../../server/user";
import { getCustomerDetails, saveCustomerDetails } from "../../utils/shared";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";

const CreatePassword = () => {
  const navigate = useNavigate();
  const customer = getCustomerDetails();

  const validatePassword = (_: RuleObject, value: string) => {
    // Password should have at least 1 special character, 1 number, and minimum 8 characters
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject("Your password is not strong enough.");
    }
    return Promise.resolve();
  };

  const mutation = useMutation(createPassword, {
    onSuccess: (data) => {
      saveCustomerDetails(data);
      navigate("/onboarding");
    },
  });

  const onFinish = (values: Partial<IUser>) => {
    const data = {
      phoneNumber: customer.phoneNumber,
      ...values,
    };
    mutation.mutateAsync(data);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="password"
        className="mb-0"
        label={<p>Enter new password</p>}
        rules={[
          { required: true, message: "Enter password" },
          { validator: validatePassword },
        ]}
      >
        <Input Password={true} color="outline" />
      </Form.Item>
      <p className="text-black text-xs mt-2">
        At least <span className="primary-text text-[14px]">8 characters</span> containing 1 letter and a number
      </p>

      <Form.Item>
        <Button
          block
          className="mt-32"
          htmlType="submit"
          color="orange"
          loading={mutation.isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePassword;
