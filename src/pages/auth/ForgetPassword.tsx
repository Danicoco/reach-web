import OnboardingLayout from "../../components/OnboardingLayout";
import ForgetPasswordForm from "../../components/forms/ForgetPasswordForm";

const ForgetPassword = () => {
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

export default ForgetPassword;

const MobileView = () => {
  return (
    <OnboardingLayout>
      <h2 className="my-5 text-[24px] font-bold text-black">Forget your password?</h2>

      <div>
        <ForgetPasswordForm />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="py-5 px-10 w-[500px]">
        <h2 className="my-5 text-[18px] font-bold">Forget your password?</h2>

        <div className="mt-5">
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
};
