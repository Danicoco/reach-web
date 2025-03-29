/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Checkbox, Form, Select, Slider, Upload, UploadProps } from "antd";

import Input from "../../library/Input";
import Button from "../../library/Button";
import { getCategories } from "../../server/categories";
import { getProfileData } from "../../server/user";
import { formatCurrency } from "../shared/utils";
import MakePayment from "./MakePayment";
import ServerError from "../ServerError";
import { uploadAssets } from "../../server/assets";

const purposes = [
  { value: "Monetization", label: "Monetization" },
  { value: "Reach and Visibility", label: "Reach and Visibility" },
  { value: "Brand Awareness", label: "Brand Awareness" },
  { value: "Promotion and Engagement", label: "Promotion and Engagement" },
  { value: "Revenue Diversification", label: "Revenue Diversification" },
  { value: "Lead Generation", label: "Lead Generation" },
];

const viewTimes = [
  { value: "0-60", label: "0-60s" },
  { value: "1-3", label: "1-3m" },
  { value: "3-10", label: "3-10m" },
  { value: "10-30m", label: "10-30m" },
];

type Props = {
  title: string;
  itemId: string;
  duration: number;
  platform: string;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoUploadForm = ({
  title,
  itemId,
  duration,
  setCompleted,
  platform,
}: Props) => {
  const [form] = useForm();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [minTime, setMinTime] = useState(0);
  const [meta, setMeta] = useState<any>({});
  const [maxTime, setMaxTime] = useState(60);
  const [viewTime, setViewTime] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [hasAdultActivity, setHasAdultActivity] = useState(false);

  const { data, isLoading } = useQuery("categories", () =>
    getCategories(1, 10)
  );

  const { data: profile, isLoading: profileLoading } = useQuery(
    "profile",
    getProfileData
  );

  useEffect(() => {
    form.setFieldValue("title", title);
  }, [form, title]);

  const reachWallet = profile?.profile?.wallet?.find(
    (item: { walletTypeId: number }) => item.walletTypeId === 1
  );

  const mutation = useMutation(uploadAssets, {
    onSuccess: () => {
      setCompleted(true);
      queryClient.invalidateQueries("media");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const onFinish = (values: any) => {
    setError("");
    if (!coverPicture) {
      setError("Please add cover picture");
      return;
    }
    setStep((prev) => (prev !== 3 ? prev + 1 : 3));
    if (step !== 3) {
      setMeta({
        ...meta,
        ...values,
      });
    }

    if (step === 3 && !paymentType) {
      setError("Select Payment Type");
      return;
    }

    const data = {
      title,
      ...meta,
      ...values,
      ...(values.noOfStreams && { noOfStreams: Number(values.noOfStreams) }),
      ...(meta?.noOfStreams && { noOfStreams: Number(meta.noOfStreams) }),
      viewTime,
      coverPicture,
      type: "video",
      itemId:
        platform === "vimeo"
          ? itemId.split("/")[itemId.split("/").length - 1]
          : itemId,
      duration,
      platform,
      paymentType: paymentType.includes("wallet") ? "direct" : paymentType,
      noOfSubscribers: 0,
      walletId: reachWallet?.id,
      hasAdultActivity,
      mediaSubCategoryIds: values.category || meta.category,
      meta: "Meta video",
    };

    if (step === 3) {
      mutation.mutateAsync(data);
    }
  };

  const props: UploadProps = {
    data: { upload_preset: import.meta.env.VITE_CLOUDINARY_PRESET, api_key: import.meta.env.VITE_CLOUDINARY_KEY },
    name: "file",
    accept: "image/*",
    action: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_FOLDER}/image/upload`,
    onChange(info) {
      if (info.file.status === "done") {
        const image = info.file.response.secure_url;
        setCoverPicture(image);

      } else if (info.file.status === "error") {
        setError("Failed to upload image, try again");
      }
    },
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <ServerError message={error} />
      {step === 1 && (
        <div>
          <Form.Item name="title" label={<p className="font-bold">Title</p>}>
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryIds"
            label={<p className="font-bold">Category</p>}
          >
            <Select size="large" mode="multiple" loading={isLoading}>
              {data?.map((item: any) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="purpose"
            label={<p className="font-bold">Purpose</p>}
          >
            <Select size="large">
              {purposes.map((purpose) => (
                <Select.Option value={purpose.value}>
                  {purpose.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Upload {...props} className="w-full">
            <div className="p-3 rounded-full w-full text-center border-[1px] border-[#6601FF]">
              <p>Upload Cover Picture</p>
            </div>
          </Upload>

          <div className="mt-3">
            <p>Content</p>
            <div className="flex gap-2">
              <Checkbox
                value={hasAdultActivity}
                onChange={() => setHasAdultActivity((prev) => !prev)}
              />
              <p>This content contains adult activity</p>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <Form.Item label={<p>No of reach</p>} name="noOfStreams">
            <Input placeholder="Eg. 3000" />
          </Form.Item>

          <Form.Item
            label={<p className="font-bold">View Time</p>}
            name="viewTime"
          >
            <div className="flex gap-5">
              <Select
                className="w-[30%]"
                size="large"
                onChange={(v: string) => {
                  setMaxTime(Number(v.split("-")[1]) * (v !== "0-60" ? 60 : 1));
                  setMinTime(Number(v.split("-")[0]) * (v !== "0-60" ? 60 : 1));
                }}
                defaultValue="0-60"
              >
                {viewTimes.map((viewTime) => (
                  <Select.Option value={viewTime.value}>
                    {viewTime.label}
                  </Select.Option>
                ))}
              </Select>
              <Slider
                min={minTime}
                max={maxTime}
                onChange={(v) => setViewTime(v)}
                value={viewTime}
                className="w-[80%]"
              />
            </div>
          </Form.Item>

          <div className="dark:bg-[#6601FF] dark:text-white p-3 rounded-xl my-2">
            <p className="text-xs">Reach Budget</p>
            <p className="text-lg">
              {profileLoading
                ? "---"
                : formatCurrency(reachWallet?.wallet || 0, "USD")}
            </p>
          </div>

          <Form.Item
            name="country"
            label={<p className="font-bold">Country</p>}
          >
            <Select size="large">
              <Select.Option value="nigeria">Nigeria</Select.Option>
            </Select>
          </Form.Item>

          <div className="px-2">
            <p className="text-xs">
              By choosing to share your videos on Reach, you're agreeing to
              these guidelines. Non-compliance may result in content removal or
              account suspension as outlined in our policies. For a detailed
              understanding of what flies and what doesn't on Reach, please
              review our Full Content Guidelines.
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <MakePayment
          paymentType={paymentType}
          profileLoading={profileLoading}
          reachWallet={reachWallet}
          setPaymentType={setPaymentType}
        />
      )}

      <Button htmlType="submit" className="mt-2" loading={mutation.isLoading}>
        {step === 2 ? "Proceed To Pay" : "Proceed"}
      </Button>
    </Form>
  );
};

export default VideoUploadForm;
