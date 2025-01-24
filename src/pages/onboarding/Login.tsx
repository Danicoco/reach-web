import { Dispatch, SetStateAction, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

import { stripOffUrl } from "../../utils/shared";
import { processDefaults } from "./sideEffect";

import LoginForm from "../../components/forms/LoginForm";
import OnboardingLayout from "../../components/OnboardingLayout";

export function useQueryParams() {
  const { search } = useLocation();

  const urlParams = stripOffUrl(search);
  return urlParams;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const query = useQueryParams();

  processDefaults(navigate);


  return (
    <>
      <div className="block sm:hidden">
        <MobileView
          query={query}
          error={error}
          setError={setError}
          navigate={navigate}
        />
      </div>

      <div className="hidden sm:block">
        <DesktopView
          query={query}
          error={error}
          setError={setError}
          navigate={navigate}
        />
      </div>
    </>
  );
};

export default Login;

type Props = {
  error: string;
  navigate: NavigateFunction;
  query: Record<string, string>[];
  setError: Dispatch<SetStateAction<string>>;
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

const MobileView = ({
  //mutation, error, setError,
  query,
  navigate,
}: Props) => {
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
        {query[0]?.reset && (
          <p className="text-white text-center my-2">
            You've reset your password. Kindly login
          </p>
        )}
        <LoginForm />
      </div>

      <div className="mt-10">
        <TermsCondition isLogin={true} navigate={navigate} />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = ({
  //mutation,
  //error,
  //setError,
  query,
  navigate,
}: Props) => {
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
            {query[0]?.reset && (
              <p className="text-white text-center my-2">
                You've reset your password. Kindly login
              </p>
            )}
            <LoginForm />
          </div>
        
        </div>
      </div>
    </>
  );
};
