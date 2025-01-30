import { useNavigate } from "react-router-dom";

import { ProcessDefaults } from "./sideEffect";
import ReachLogo from "../../assets/reach-logo.png";

import OnboardingLayout from "../../components/OnboardingLayout";
import Button from "../../library/Button";
import GoogleLogo from "../../assets/google.png";
import AppleLogo from "../../assets/apple.png";
import Divider from "../../components/Divider";

const Register = () => {
  const navigate = useNavigate();

  ProcessDefaults(navigate);
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

export default Register;

const MobileView = () => {
  const navigate = useNavigate();
  return (
    <OnboardingLayout>
      {/* <div className="grid place-content-center h-screen"> */}
      <div className="py-2 w-full">
        <img src={ReachLogo} className="text-center" />
        <p className="mt-5 font-bold text-[24px] flex-wrap w-[250px]">
          Let's get you started on the platform
        </p>

        <div className="mt-6 flex flex-col gap-5">
          <Button>
            <div className="flex gap-3 justify-center items-center">
              <img src={GoogleLogo} />
              <p>Continue with Google</p>
            </div>
          </Button>
          <Button color="black">
            <div className="flex gap-3 justify-center items-center">
              <img src={AppleLogo} />
              <p>Continue with Apple</p>
            </div>
          </Button>
        </div>

        <Divider message="or" />

        <div className="mt-8">
          <Button onClick={() => navigate("/create-account")}>Create account</Button>
        </div>

        <p className="text-[12px] mt-5">
          By signing up, you agree to our{" "}
          <span className="primary-text">Terms</span>,{" "}
          <span className="primary-text cursor-pointer">Privacy Policy</span>{" "}
          and <span className="primary-text cursor-pointer">Cookie Use</span>.
        </p>
        <p className="text-[14px] mt-3">
          Have an account already?{" "}
          <span
            className="primary-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log in
          </span>
          .
        </p>
      </div>
    {/* </div> */}
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  const navigate = useNavigate();
  return (
    <div className="grid place-content-center h-screen">
      <div className="py-2 px-10 w-full hidden sm:block">
        <img src={ReachLogo} className="text-center" />
        <p className="mt-5 font-bold text-[24px] flex-wrap w-[250px]">
          Let's get you started on the platform
        </p>

        <div className="mt-6 flex flex-col gap-5">
          <Button>
            <div className="flex gap-3 justify-center items-center">
              <img src={GoogleLogo} />
              <p>Continue with Google</p>
            </div>
          </Button>
          <Button color="black">
            <div className="flex gap-3 justify-center items-center">
              <img src={AppleLogo} />
              <p>Continue with Apple</p>
            </div>
          </Button>
        </div>

        <Divider message="or" />

        <div className="mt-8">
          <Button onClick={() => navigate("/create-account")}>Create account</Button>
        </div>

        <p className="text-[12px] mt-5">
          By signing up, you agree to our{" "}
          <span className="primary-text">Terms</span>,{" "}
          <span className="primary-text cursor-pointer">Privacy Policy</span>{" "}
          and <span className="primary-text cursor-pointer">Cookie Use</span>.
        </p>
        <p className="text-[14px] mt-3">
          Have an account already?{" "}
          <span
            className="primary-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log in
          </span>
          .
        </p>
      </div>
    </div>
  );
};
