import { useState } from "react";
import { Form, Select } from "antd";
import { useMutation } from "react-query";
import TextArea from "antd/es/input/TextArea";

import { updateProfile } from "../../server/user";
import { saveCustomerDetails } from "../../utils/shared";

import Birth from "../Birth";
import Address from "../Address";
import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";

type Props = {
  info: ConfigMeta[];
  customer: Partial<IUser>;
};

const EditPersonalInfo = ({ info, customer }: Props) => {
  const [success, setSuccess] = useState("");
  const [date, setDate] = useState("");
  const [dob, setDob] = useState<{ month: number | null; year: number | null }>(
    {
      month: customer.meta["originalDob"]
        ? new Date(customer.meta["originalDob"]).getMonth()
        : null,
      year: customer.meta["originalDob"]
        ? new Date(customer.meta["originalDob"]).getFullYear()
        : null,
    }
  );
  const [address, setAddress] = useState<string>(customer.meta["address"]);

  const mutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      saveCustomerDetails(data);
      setSuccess("Information saved");
    },
  });

  const onLocation = (payload: { name: string; value: string }) => {
    setAddress(payload.value);
  };
  const onDate = (payload: { name: string; value: string }) => {
    setDate(payload.value);
  };

  const onFinish = (values: Record<string, any>) => {
    values = {
      ...values,
      ...(date && { dob: date }),
      address,
    };

    let recomposeData: Record<string, string> = {};
    Object.keys(values).forEach((item) => {
      if (values[item]) {
        recomposeData = {
          ...recomposeData,
          [item]: Array.isArray(values[item]) ? values[item].join(',') : values[item],
        };
      }
    });

    mutation.mutateAsync({
      meta: { ...(customer.meta && { ...customer.meta }), ...recomposeData },
    });
  };

  return (
    <Form onFinish={onFinish}>
      {info?.map((record) => (
        <div className="flex flex-col gap-1" key={record.question}>
          <p className="text-black font-bold">{record.question}</p>
          <div>
            {record.answerType === "input" && (
              <Form.Item name={record.identifier} className="">
                <Input
                  color="outline"
                  className="br-b-2"
                  placeholder="Type here"
                  defaultValue={
                    customer.meta ? customer.meta[record.identifier] : ""
                  }
                />
              </Form.Item>
            )}

            {record.answerType === "calender" && (
              <div className="mt-2">
                {" "}
                <Birth
                  onChange={onDate}
                  type={"calender"}
                  name={"dob"}
                  {...{ dob }}
                  {...{ setDob }}
                />
              </div>
            )}

            {record.answerType === "address" && (
              <div className="mb-5">
                <Address
                  currentValue={address}
                  type={record.answerType}
                  name={"location"}
                  onChange={onLocation}
                  edit={true}
                  onboarding={{}}
                />
              </div>
            )}

            {["dropdown", "select", "tag-onboarding", "checkbox"].includes(
              record.answerType
            ) && (
              <Form.Item name={record.identifier} className="">
                {record.multiselect ? (
                  <Select
                    mode="multiple"
                    defaultValue={
                      customer.meta ? customer.meta[record.identifier]?.split(',') : ""
                    }
                    options={record.options.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                  />
                ) : (
                  <Select
                    defaultValue={
                      customer.meta ? customer.meta[record.identifier] : ""
                    }
                    options={record.options.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                  />
                )}
              </Form.Item>
            )}

            {["select-desc"].includes(record.answerType) && (
              <Form.Item name={record.identifier} className="">
                <Select
                  defaultValue={
                    customer.meta ? customer.meta[record.identifier] : ""
                  }
                  options={record.list.map(
                    (option: { name: string; desc: string }) => ({
                      value: option.name,
                      label: option.name,
                    })
                  )}
                />
              </Form.Item>
            )}

            {["textarea"].includes(record.answerType) && (
              <Form.Item name={record.identifier} className="">
                <TextArea
                  rows={10}
                  defaultValue={
                    customer.meta ? customer.meta[record.identifier] : ""
                  }
                />
              </Form.Item>
            )}
          </div>
        </div>
      ))}

      {success && (
        <p className="text-black text-center font-bold my-3">{success}</p>
      )}
      {mutation.error instanceof Error && (
        <div className="my-3 text-center">
          <ServerError message={mutation.error.message} />
        </div>
      )}
      <Button
        color="black"
        className="flex items-center justify-center"
        htmlType="submit"
        loading={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <p className="animate-pulse">Saving...</p>
        ) : (
          <p>Save</p>
        )}
      </Button>
    </Form>
  );
};

export default EditPersonalInfo;
