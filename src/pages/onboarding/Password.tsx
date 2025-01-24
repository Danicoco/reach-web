import OnboardingLayout from "../../components/OnboardingLayout";
import CreatePassword from "../../components/forms/CreatePassword";

const Password = () => {
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

export default Password;

const MobileView = () => {
  return (
    <OnboardingLayout className="block sm:hidden">
      <h2 className="mt-5 text-[24px] font-bold text-black">
        Create new password
      </h2>

      <div className="mt-10">
        <CreatePassword />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  return (
    <div className="grid place-content-center w-screen">
      <div className="py-5 px-10 w-[500px]">
        <h2 className="mt-5 text-[24px] font-bold">Create new password</h2>

        <div className="mt-10">
          <CreatePassword />
        </div>
      </div>
    </div>
  );
};
