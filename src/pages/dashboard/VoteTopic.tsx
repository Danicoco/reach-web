import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getCustomerDetails } from "../../utils/shared";
import { fetchTopicsToVote, voteATopic } from "../../server/topic";

import Button from "../../library/Button";
import Loading from "../../components/Loading";
import ServerError from "../../components/ServerError";
import OnboardingLayout from "../../components/OnboardingLayout";

const VoteTopic = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [checked, setChecked] = useState({
    name: "",
    id: "",
    value: false,
  });

  const { data, isLoading } = useQuery("vote-topic", fetchTopicsToVote);

  const customer = getCustomerDetails();

  const mutation = useMutation(voteATopic, {
    onSuccess: () => {
      queryClient.invalidateQueries("dashboard-data");
      navigate("/dashboard?voted=true");
    },
  });

  const onFinish = () => {
    const data = {
      title: checked.name,
      userId: customer.id,
      isVotingTopic: false,
      submitVote: true,
      topicVotedId: checked.id,
    };

    mutation.mutateAsync(data);
  };

  return (
    <OnboardingLayout className="sm:grid sm:place-items-center" hide>
      <div className="sm:w-[517px] mt-10">
        <p className="text-black text-xl font-bold">
          What topic would you like to see next week?
        </p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="sm:w-[422px] mt-5">
            {" "}
            <>
              {data?.edges?.map((option: IVoteTopic) => {
                return (
                  <div
                    className={`flex justify-between ${
                      checked.name === option.title && checked.value
                        ? "bg-[#1D2D50] text-white"
                        : "bg-transparent border-[#1D2D50] text-[#1D2D50] border-[1px]"
                    } rounded-lg p-3 mt-2`}
                    onClick={() => {
                      setChecked({
                        name: option.title === checked.name ? "" : option.title,
                        id: option.id === checked.id ? "" : String(option.id),
                        value:
                          checked.name === option.title ? !checked.value : true,
                      });
                    }}
                    key={option.id}
                  >
                    <p className="text-[14px] font-[500] truncate">
                      {option.title}
                    </p>
                  </div>
                );
              })}
            </>
            {mutation.error instanceof Error && (
              <ServerError message={mutation.error.message} />
            )}
            <Button
              className="my-10"
              onClick={onFinish}
              color="orange"
              loading={mutation.isLoading}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default VoteTopic;
