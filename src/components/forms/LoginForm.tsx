import { Form } from "antd";
import { useNavigate } from "react-router-dom";

import Input from "../../library/Input";
import Button from "../../library/Button";

const LoginForm = () => {
  const navigate = useNavigate();

  
  return (
    <Form layout="vertical" requiredMark={false}>
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
          onClick={() => navigate("/dashboard")}
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
