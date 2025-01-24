import PinField from "react-pin-field";
import ClockImg from "../../assets/clock.png";
import Button from "../../library/Button";
import { useNavigate } from "react-router-dom";

const VerifyAccountForm = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <div className="flex justify-center items-center gap-8">
        <PinField
          // onComplete={(e) => setOtp(e)}
          length={4}
          inputMode="numeric"
          className="h-[40px] bg-transparent w-[40px] border-[#1D2D50] border-2 text-black rounded-xl text-center ml-2"
        />
      </div>

      <div className="flex justify-between mt-5">
        <p className="font-bold">
          Didn't get the code? <span className="primary-text">Resend code</span>
        </p>
        <div className="flex gap-1">
          <img src={ClockImg} className="w-[20px] h-[20px] mt-[2px]" />
          <p>00</p>
        </div>
      </div>

      <Button block className="mt-16" onClick={() => navigate("/onboarding")}>
        Proceed
      </Button>
    </div>
  );
};

export default VerifyAccountForm;
