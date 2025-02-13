import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import ClockImg from "../../assets/clock.png";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { resendOtp } from "../../server/user";
import ServerError from "../../components/ServerError";

const ResetPassword = () => {
  const [countdown, setCountdown] = useState("10");
  const [error, setError] = useState("");

  useEffect(() => {
    setInterval(() => {
      if (countdown !== "0") {
        setCountdown((prev) =>
          prev === "0" ? "0" : (Number(prev) - 1).toString()
        );
      }
    }, 1000);
  }, [countdown]);

  const mutation = useMutation(resendOtp, {
    onSuccess: () => {
      setCountdown("10");
    },
    onError: (e: Error) => {
      setError(e.message);
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="py-5 px-5 sm:w-[500px] w-full">
        <h2 className="my-5 text-[18px] font-bold navy-color">
          Reset your password
        </h2>

        <p className="text-clip text-gray-500">
          Don't worry! it happens. Please enter the code sent to{" "}
          <span className="truncate text-[#6601FF]">{localStorage.getItem("plps-01") || "email@gmail.com"}</span>
        </p>

        <div className="mt-5">
          <ServerError message={error} />
          <ResetPasswordForm />
        </div>

        <div className="flex justify-between mt-5">
          <p className="font-bold">
            Didn't get the code?{" "}
            {countdown === "0" && (
              <span
                className="primary-text"
                onClick={() =>
                  mutation.mutateAsync({
                    loginId: localStorage.getItem("em-reach") || "",
                  })
                }
              >
                Resend code
              </span>
            )}{" "}
          </p>
          <div className="flex gap-1">
            <img src={ClockImg} className="w-[20px] h-[20px] mt-[2px]" />
            <p>{countdown.length > 1 ? countdown : `0${countdown}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
