import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../server/user";
import AvatarPicker from "../../components/AvatarPicker";
import { getCustomerDetails, saveCustomerDetails } from "../../utils/shared";

const AddAvatar = () => {
  const navigate = useNavigate();
  const customer = getCustomerDetails();
  const [err, setErr] = useState<string>("");
  const { mutate, isLoading: updateLoading } = useMutation(updateProfile, {
    onSuccess: (data) => {
      saveCustomerDetails(data);
      navigate("/dashboard");
    },
    onError: () => {
      setErr("Something went wrong, try again!");
    },
  });

  const submit = (payload: { name: string; value: string }) => {
    const meta = { ...customer?.meta, [payload.name]: payload.value };
    mutate({ meta });
  };

  useEffect(() => {
    if (customer?.meta?.avatar) navigate("/dashboard");
  }, [customer]);

  return (
    <div className="min-h-screen max-w-[350px] grid place-content-center mx-auto">
      <div className="text-center mb-5">
        {err?.length ? <p className="font-bold text-red-500">{err}</p> : null}
        <p className="font-[700] text-[24px] navy-color leading-[24px]">
          Add your Avatar
        </p>
        <p className="text-sm italic mt-[3px]">What's your vibe?</p>
      </div>
      <AvatarPicker
        loading={updateLoading}
        onChange={submit}
        dashboard={true}
      />
    </div>
  );
};

export default AddAvatar;
