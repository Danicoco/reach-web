/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import countryCodes from "country-codes-list";
import { useNavigate } from "react-router-dom";
import { DatePicker, Form, Select, Space } from "antd";

import Input from "../../library/Input";
import { swapItems } from "../../helper";
import Button from "../../library/Button";
import { createAccount } from "../../server/user";
import { isObjectDuplicate, saveCustomerDetails } from "../../utils/shared";

const { Option } = Select;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [, setCountryCode] = useState("+1");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allCountryCodes, setAllCountryCodes] = useState<any[]>([]);

  const mutation = useMutation(createAccount, {
    retry: false,
    onSuccess: (data) => {
      navigate("/verify-account");
      saveCustomerDetails(data.data);
    },
  });

  const onFinish = (values: Partial<IUser & { confirmPassword: string }>) => {
    setError("");
    values.dob = format(new Date(values.dob as string), "dd/MM/yyyy");
    if (values.password !== values.confirmPassword) {
      setError("Password does not match");
      return;
    }
    delete values.confirmPassword
    localStorage.setItem('em-reach', values.email || "");
    mutation.mutateAsync(values);
  };

  useEffect(() => {
    const uniqueObjects = new Set();

    const all = swapItems(countryCodes.all(), 35, 202);
    const uniqueArray = all.filter((obj) => {
      if (!isObjectDuplicate(uniqueObjects, obj, "countryCallingCode")) {
        uniqueObjects.add(obj);
        return true;
      }
      return false;
    });

    setAllCountryCodes(uniqueArray);
  }, []);

  return (
    <Form layout="vertical" requiredMark={false} onFinish={onFinish} className="mb-5">
      <div className="flex justify-center items-center text-red-900 font-bold">
      {error || mutation.error instanceof Error && (
        <p className="text-red-900 text-sm text-center font-bold my-2">
          {error || mutation.error.message}
        </p>
      )}
      </div>
      <Form.Item
        name="name"
        label={<p className="navy-color">Name</p>}
        rules={[{ required: true, message: "Enter name", type: "string" }]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>

      <Form.Item
        name="email"
        label={<p className="navy-color">Email</p>}
        rules={[
          { type: "email", message: "Enter a valid email" },
          { required: true, message: "Enter email address" },
        ]}
      >
        <Input autoComplete="no" />
      </Form.Item>

      <Form.Item
        name="phone"
        label={<p className="navy-color">Mobile Number</p>}
      >
        <Space.Compact className="w-full">
          <Select
            defaultValue="+1"
            className="bg-transparent"
            style={{ width: "30%" }}
            onSelect={(e) => setCountryCode(e)}
          >
            {allCountryCodes.map((code) => (
              <Option
                value={`+${code.countryCallingCode}`}
                key={code.countryCallingCode}
              >
                <div className="flex gap-2">
                  <p className="mt-[1px]">{code.flag}</p>+
                  {code.countryCallingCode}
                </div>
              </Option>
            ))}
          </Select>
          <Input style={{ width: "70%" }} inputMode="numeric" />
        </Space.Compact>
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

      <Form.Item
        name="dob"
        label={<p className="navy-color">Date Of Birth</p>}
        rules={[
          { required: true, message: "Enter date of birth", type: "date" },
        ]}
      >
        <DatePicker className="w-full h-12" />
      </Form.Item>

      <Button
        loading={mutation.isLoading}
        block
        htmlType="submit"
      >
        Proceed
      </Button>
    </Form>
  );
};

export default RegisterForm;
