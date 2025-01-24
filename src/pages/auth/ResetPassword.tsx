import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import ClockImg from "../../assets/clock.png";

const ResetPassword = () => {
  return (
    <>
      <div className="block sm:hidden">
        <MobileView />
      </div>

      <div className="hidden sm:block">
        <DesktopView />
      </div>
    </>
  );
};

export default ResetPassword;

const MobileView = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="mx-3">
        <h2 className="my-5 text-[24px] font-bold navy-color">
          Reset your password
        </h2>

        <p>
          Don't worry! it happens. Please enter the code sent to{" "}
          {localStorage.getItem("email")}
        </p>

        <div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

const DesktopView = () => {
  return (
    <div className="">
      <div className="grid place-content-center w-screen">
        <div className="py-5 px-10 w-[500px]">
          <h2 className="my-5 text-[18px] font-bold navy-color">
            Reset your password
          </h2>

          <p>
            Don't worry! it happens. Please enter the code sent to{" "}
            {localStorage.getItem("email") || "email@gmail.com"}
          </p>

          <div className="mt-5">
            <ResetPasswordForm />
          </div>

          <div className="flex justify-between">
            <p className="font-bold">Didn't get the code? <span className="primary-text">Resend code</span></p>
            <div className="flex gap-1">
              <img src={ClockImg} className="w-[20px] h-[20px] mt-[2px]" />
              <p>00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
