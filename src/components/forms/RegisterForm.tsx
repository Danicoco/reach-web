import { useMutation } from "react-query";
import { Form, Select, Space } from "antd";
import countryCodes from "country-codes-list";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { swapItems } from "../../helper";
import { createAccount } from "../../server/user";
import { isObjectDuplicate, saveCustomerDetails } from "../../utils/shared";

import Input from "../../library/Input";
import Button from "../../library/Button";

const { Option } = Select;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [allCountryCodes, setAllCountryCodes] = useState<any[]>([]);

  const mutation = useMutation(createAccount, {
    retry: false,
    onSuccess: (data) => {
      navigate("/verify-account");
      saveCustomerDetails(data.data);
    },
  });

  const onFinish = () => {
    const data = {
      phoneNumber,
      countryCode,
    };

    mutation.mutateAsync(data);
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
    <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
      {mutation.error instanceof Error && (
        <p className="text-red-600 text-sm text-center font-bold mb-1">
          {mutation.error.message}
        </p>
      )}
      <Form.Item
        name="email"
        label={<p className="navy-color">Name</p>}
        rules={[
          { required: true, message: "Enter name", type: "string" },
        ]}
      >
        <Input />
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
        name="phoneNumber"
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
          <Input
            style={{ width: "70%" }}
            inputMode="numeric"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Space.Compact>
        <p className="text-[10px] mt-3">
          Enter your mobile number to receive one time verification and other
          notifications
        </p>
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="navy-color">Password</p>}
        rules={[
          { required: true, message: "Enter password", type: "string" },
        ]}
      >
        <Input Password placeholder="***************" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<p className="navy-color">Confirm Password</p>}
        rules={[
          { required: true, message: "Enter password again", type: "string" },
        ]}
      >
        <Input Password autoComplete="no" placeholder="***************" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<p className="navy-color">Date Of Birth</p>}
        rules={[
          { required: true, message: "Enter date of birth", type: "string" },
        ]}
      >
        <Input autoComplete="no" />
      </Form.Item>

      <Button
        loading={mutation.isLoading}
        block
        onClick={() => navigate("/verify-account")}
      >
        Proceed
      </Button>
    </Form>
  );
};

export default RegisterForm;
