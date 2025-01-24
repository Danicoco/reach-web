import { useNavigate } from "react-router-dom";

import { processDefaults } from "./sideEffect";
import ReachLogo from "../../assets/reach-logo.png";
import OnboardingLayout from "../../components/OnboardingLayout";
import RegisterForm from "../../components/forms/RegisterForm";

const CreateAccount = () => {
  const navigate = useNavigate();

  processDefaults(navigate);
  return (
    <>
      <div className="block sm:hidden">
        <MobileView
        />
      </div>
      <div className="hidden sm:block">
        <DesktopView />
      </div>
    </>
  );
};

export default CreateAccount;

const MobileView = () => {
  return (
    <OnboardingLayout className="block sm:hidden">
      <div className="p-2 rounded-lg">
        <h2 className="mt-5 text-[24px] font-bold navy-color">Create your account</h2>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  return (
    <div className="grid place-content-center w-screen">
      <div className="px-10 w-[500px] hidden sm:block">
        <img src={ReachLogo} className="text-center" />
        <p className="font-bold text-[24px] flex-wrap w-[250px]">
          Create your account
        </p>

        <RegisterForm />
      </div>
    </div>
  );
};
