import { Form } from "antd";
import { useNavigate } from "react-router-dom";

import Input from "../../library/Input";
import Button from "../../library/Button";
import { useMutation } from "react-query";
import { login } from "../../server/user";
import { addDays } from "date-fns";

const LoginForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("access", data);
      localStorage.setItem("access-endTime", addDays(new Date(), 1).toISOString())
      navigate("/dashboard")
    },
    onError: (e: Error) => {
      console.log({ has: e.message.includes("not verified") })
      if (e.message.includes("not verified")) {
        navigate("/verify-account")
      }
    }
  });

  const onFinish = (values: Partial<IUser>) => {
    localStorage.setItem('em-reach', values.email || "");
    mutation.mutateAsync(values);
  };

  return (
    <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
      {mutation.error instanceof Error && (
        <p className="text-red-600 font-bold text-center capitalize">{mutation.error.message}</p>
      )}
      <Form.Item
        name="loginId"
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
        <Button block htmlType="submit" loading={mutation.isLoading}>
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
