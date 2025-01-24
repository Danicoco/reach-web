import { Form } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../../server/user";
import { saveCustomerDetails } from "../../utils/shared";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation(login, {
    retry: false,
    onSuccess: (data) => {
      saveCustomerDetails(data);
      if (!data.password) {
        navigate("/create-password");
        return;
      }
      if (!data.meta) {
        navigate("/onboarding");
        return;
      }
      if (data.meta && !Object.values(data.meta).length) {
        navigate("/onboarding");
        return;
      }
      if (
        data.meta &&
        Object.values(data.meta).length &&
        !data.meta?.onboardingComplete
      ) {
        navigate("/onboarding");
        return;
      }
      if (data.meta && Object.values(data.meta).length && !data.meta?.avatar) {
        navigate("/add-avatar");
        return;
      }

      navigate("/chat");
    },
  });

  const onFinish = (values: Pick<IUser, "email" | "password">) => {
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="email"
        label={<p className="navy-color">Login ID</p>}
        rules={[
          { required: true, message: "Enter a login ID", type: "string" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="navy-color">Password</p>}
        rules={[{ required: true, message: "Enter password" }]}
      >
        <Input type="password" Password={true} placeholder="***************" />
      </Form.Item>

      <Form.Item>
        <Button
          block
          // htmlType="submit"
          // color="orange"
          onClick={() => navigate("/dashbaord")}
          loading={mutation.isLoading}
        >
          Log in
        </Button>
      </Form.Item>

      <p
        className="text-blue-600 cursor-pointer -mt-3"
        onClick={() => navigate("/forget-password")}
      >
        Forget Password?
      </p>
    </Form>
  );
};

export default LoginForm;
