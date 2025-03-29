import PinField from "react-pin-field";
import ClockImg from "../../assets/clock.png";
import Button from "../../library/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { resendOtp, verifyAccount } from "../../server/user";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";

const VerifyAccountForm = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState("10");
  const navigate = useNavigate();

  const mutation = useMutation(resendOtp, {
    onSuccess: () => {
      setCountdown("10");
    },
    onError: (e: Error) => {
      setError(e.message);
    },
  });

  const mutationVerify = useMutation(verifyAccount, {
    onSuccess: (data) => {
      localStorage.setItem("access", data);
      localStorage.setItem(
        "access-endTime",
        addDays(new Date(), 1).toISOString()
      );
      navigate("/onboarding");
    },
    onError: (e: Error) => {
      setError(e.message);
    },
  });

  const onFinish = () => {
    setError("");
    if (!pin) {
      setError("Enter OTP");
      return;
    }

    if (pin.length < 6) {
      setError("Enter a valid pin");
      return;
    }

    mutationVerify.mutateAsync({
      code: pin,
      loginId: localStorage.getItem("em-reach") || "",
    });
  };

  useEffect(() => {
    setInterval(() => {
      if (countdown !== "0") {
        setCountdown((prev) =>
          prev === "0" ? "0" : (Number(prev) - 1).toString()
        );
      }
    }, 1000);
  }, [countdown]);

  return (
    <div className="mt-5">
      <p className="font-bold text-center dark:text-red-700">{error}</p>
      <div className="flex justify-center items-center gap-8 mt-5">
        <PinField
          onChange={(e) => setPin(e)}
          length={6}
          inputMode="numeric"
          className="h-[40px] bg-transparent w-[40px] dark:border-[#1D2D50] border-2 dark:text-black rounded-xl text-center ml-2"
        />
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
          )}
        </p>
        <div className="flex gap-1">
          <img src={ClockImg} className="w-[20px] h-[20px] mt-[2px]" />
          <p>{countdown.length > 1 ? countdown : `0${countdown}`}</p>
        </div>
      </div>

      <Button
        block
        className="mt-16"
        onClick={onFinish}
        loading={mutationVerify.isLoading || mutation.isLoading}
      >
        Proceed
      </Button>
    </div>
  );
};

export default VerifyAccountForm;
