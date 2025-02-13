import OnboardingLayout from "../../components/OnboardingLayout";
import VerifyAccountForm from "../../components/forms/VerifyAccountForm";

const Verify = () => {
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

export default Verify;


const MobileView = () => {
  return (
    <OnboardingLayout className="block sm:hidden">
      <h2 className="mt-5 text-[24px] font-bold text-black">We just sent you a code</h2>
      <p className="mt-4">{localStorage.getItem("em-reach") || "Your email"} was sent a code, please enter the code to verify.</p>

      <div className="mt-5">
        <VerifyAccountForm />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  return (
    <div className="grid place-content-center w-screen">
      <div className="py-5 px-10 w-[500px]">
        <h2 className="mt-5 text-[24px] font-bold">We just sent you a code</h2>
        <p className="mt-4">{localStorage.getItem("em-reach") || "Your email"} was sent a code, please enter the code to verify.</p>

        <div className="mt-5">
          <VerifyAccountForm />
        </div>
      </div>
    </div>
  );
};
