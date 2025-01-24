import { useState } from "react";
import { Edit2, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import useAppStore from "../../utils/appStore";
import { appLogout, getCustomerDetails } from "../../utils/shared";
import { deactivateAccount, getProfileData } from "../../server/user";

import Button from "../../library/Button";
import Loading from "../../components/Loading";
import OnboardingLayout from "../../components/OnboardingLayout";
import ChangePassword from "../../components/modals/ChangePassword";
import EditPersonalInfo from "../../components/forms/EditPersonalInfo";
import DeleteAccount from "../../components/modals/DeleteAccount";

const Profile = () => {
  const navigate = useNavigate();
  const customer = getCustomerDetails();
  const [editSection, setEditSection] = useState("");
  const { data: serverData, isLoading } = useQuery(
    "user-profile-data",
    getProfileData
  );

  const mutation = useMutation(deactivateAccount, {
    onSuccess: () => {
      appLogout();
      navigate("/");
    },
  });

  const data = {
    ...(serverData && { additionalInformation: serverData?.serverData || [] }),
    ...(serverData && {
      record:
        serverData?.record.filter(
          (rec: { identifier: string }) => rec.identifier !== "avatar"
        ) || [],
    }),
  };

  return (
    <OnboardingLayout className="sm:grid sm:place-items-center" hide>
      <div className="sm:w-[517px]">
        <div className="flex gap-3 my-5">
          <div
            className="mt-[2px] cursor-pointer"
            onClick={() => navigate("/chat")}
          >
            <X color="black" />
          </div>
          <p className="font-bold text-xl text-black">Profile</p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex justify-between">
              <p className="text-black">Personal Information</p>
              <div
                className="flex gap-2 mr-2 cursor-pointer"
                onClick={() => {
                  if (editSection === "personalInformation") {
                    setEditSection("");
                    return;
                  }
                  setEditSection("personalInformation");
                }}
              >
                {editSection === "personalInformation" ? (
                  <X size={15} className="mt-1" />
                ) : (
                  <Edit2 size={15} className="mt-1" />
                )}
                <p>
                  {editSection === "personalInformation" ? "Cancel" : "Edit"}
                </p>
              </div>
            </div>
            <div className="p-3 mt-3 bg-transparent border-[1px] border-[#1d2d50] rounded-lg">
              {editSection === "personalInformation" ? (
                <EditPersonalInfo info={data?.record} customer={customer} />
              ) : (
                <>
                  {data?.record?.map((record: ConfigMeta, index: number) => {
                    return (
                      <div
                        key={record.identifier}
                        className={index === 0 ? "" : "mt-2"}
                      >
                        <p className="truncate">{record.question}</p>
                        <p className="navy-color capitalize">
                          {customer.meta && customer.meta[record.identifier]
                            ? customer.meta[record.identifier]
                            : "NA"}
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {data?.additionalInformation?.length ? (
              <>
                <div className="flex justify-between mt-5">
                  <p className="text-black">Additional Information</p>
                  <div
                    className="flex gap-2 mr-2 cursor-pointer"
                    onClick={() => {
                      if (editSection === "additionalInformation") {
                        setEditSection("");
                        return;
                      }
                      setEditSection("additionalInformation");
                    }}
                  >
                    {editSection === "additionalInformation" ? (
                      <X size={15} className="mt-1" />
                    ) : (
                      <Edit2 size={15} className="mt-1" />
                    )}
                    <p>
                      {editSection === "additionalInformation"
                        ? "Cancel"
                        : "Edit"}
                    </p>
                  </div>
                </div>

                <div className="p-3 mt-3 bg-transparent border-[1px] border-[#1d2d50] rounded-lg">
                  {editSection === "additionalInformation" ? (
                    <EditPersonalInfo
                      info={data?.additionalInformation?.map(
                        (info: { meta: ConfigMeta }) => ({ ...info.meta })
                      )}
                      customer={customer}
                    />
                  ) : (
                    <>
                      {data?.additionalInformation?.map(
                        (record: { meta: ConfigMeta }, index: number) => {
                          return (
                            <div
                              key={record.meta.identifier}
                              className={index === 0 ? "" : "mt-2"}
                            >
                              <p className="truncate">{record.meta.question}</p>
                              <p className="navy-color capitalize">
                                {customer.meta
                                  ? customer.meta[record.meta.identifier]
                                  : ""}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}

            <p className="mt-5 navy-color">Security</p>
            <div className="p-3 my-3 bg-transparent border-[1px] border-[#1d2d50] rounded-lg">
              <p className="">
                Email: <span className="navy-color">{customer.email}</span>
              </p>
              <Button
                onClick={() => {
                  if (customer.accountType === "email") {
                    useAppStore.setState({
                      modal: { open: true, type: "password" },
                    });
                    return;
                  }
                  mutation.mutateAsync();
                }}
                color="black"
                className="mt-3"
                loading={
                  customer.accountType === "email" ? false : mutation.isLoading
                }
              >
                {customer.accountType === "email"
                  ? "Change Password"
                  : "Disconnect Account"}
              </Button>
            </div>

            <Button
              onClick={() =>
                useAppStore.setState({
                  modal: { open: true, type: "deleteAccount" },
                })
              }
              loading={mutation.isLoading}
              color="danger"
              className="my-5"
            >
              Delete Account
            </Button>
          </div>
        )}
      </div>

      <DeleteAccount />
      <ChangePassword />
    </OnboardingLayout>
  );
};

export default Profile;
