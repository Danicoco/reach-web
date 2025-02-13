import { NavigateFunction, useNavigate } from "react-router-dom";

import { ProcessDefaults } from "./sideEffect";

import LoginForm from "../../components/forms/LoginForm";
import OnboardingLayout from "../../components/OnboardingLayout";

const Login = () => {
  const navigate = useNavigate();
  ProcessDefaults(navigate);

  return (
    <>
      <div className="block sm:hidden">
        <MobileView navigate={navigate} />
      </div>

      <div className="hidden sm:block">
        <DesktopView navigate={navigate} />
      </div>
    </>
  );
};

export default Login;

type Props = {
  navigate: NavigateFunction;
};

export const TermsCondition = ({
  navigate,
  isLogin = false,
}: {
  navigate: NavigateFunction;
  isLogin?: boolean;
}) => {
  return (
    <div>
      <p className={`text-xs ${!isLogin ? `text-left` : `text-center`}`}>
        {!isLogin
          ? `By checking this box and joining Cha Cha, you acknowledge that we may
        send you notifications and`
          : `By joining Cha Cha, you`}{" "}
        agree to our{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => navigate("/terms-and-condition")}
        >
          Terms
        </span>{" "}
        and{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => navigate("/privacy-policy")}
        >
          Privacy Policy
        </span>
      </p>
    </div>
  );
};

const MobileView = ({ navigate }: Props) => {
  return (
    <OnboardingLayout>
      <h2 className="my-5 text-[24px] font-bold text-[#DA8E6B]">
        Welcome <span className="">back</span>
      </h2>
      <p className="mt-3">
        Don't have an account?{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => navigate("/get-started")}
        >
          Join Reach
        </span>
      </p>

      <div className=" p-5 rounded-lg">
        <LoginForm />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = ({ navigate }: Props) => {
  return (
    <>
      <div className="grid place-content-center h-screen">
        <div className="py-5 px-10 w-[500px]">
          <p className="mt-5 font-bold text-[24px] text-[#DA8E6B]">
            Welcome <span className="">back</span>
          </p>
          <p className="mt-3">
            Don't have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/get-started")}
            >
              Join Reach
            </span>
          </p>

          <div className="mt-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};
