import { Helmet } from "react-helmet";
import ProfileUsername from "../../components/forms/onboarding/Username";
import Button from "../../library/Button";
import { useState } from "react";
import SetupProfile from "../../components/forms/onboarding/Profile";
import UserInterest from "../../components/forms/onboarding/Interest";

const ProfileCreation = () => {
  const [step, setStep] = useState(1);

  console.log({ step });

  return (
    <div className="h-screen px-5 py-5">
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>

      <div className="flex justify-center items-center">
        <div className="sm:w-[550px] w-full mt-0">
          {step === 1 && (
            <div>
              <h3 className="mb-16 text-[25px] font-bold">
                Enter your Username
              </h3>
              <ProfileUsername />
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex justify-between">
                <h3 className="mb-8 text-[25px] font-bold">
                  Setup your profile
                </h3>
                <p className="primary-text mt-1 font-bold">Skip</p>
              </div>
              <SetupProfile />
            </div>
          )}

          {step === 3 && (
            <div className="">
              <div className="flex justify-between">
                <h3 className="mb-8 text-[25px] font-bold">Interest</h3>
                <p className="primary-text mt-1 font-bold">Skip</p>
              </div>
              <UserInterest />
            </div>
          )}

          <Button
            className="my-8"
            onClick={() => setStep((prev: number) => prev + 1)}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
