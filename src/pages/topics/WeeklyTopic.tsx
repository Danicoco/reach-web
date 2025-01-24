import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getData } from "../../utils/shared";
import { voteTopic } from "../../server/quiz";

import Button from "../../library/Button";
import ServerError from "../../components/ServerError";
import AnswerType from "../../components/shared/AnswerType";
import OnboardingLayout from "../../components/OnboardingLayout";

const WeeklyTopic = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const topics = getData<NextTopic[]>("weekly-topic");
  const [answer, setAnswer] = useState("");

  const setWeeklyAnswer = (event: { name: string; value: string }) => {
    const { value } = event;

    setAnswer(value);
  };

  const mutation = useMutation(voteTopic, {
    onSuccess: () => {
      navigate("/live-dashboard");
    },
  });

  const onFinish = () => {
    const values = {
      topic: answer,
      quizId: String(quizId),
    };

    mutation.mutateAsync(values);
  };

  return (
    <OnboardingLayout message="Vote Topic">
      <div className="sm:grid sm:place-items-center sm:w-screen">
        <div className="sm:w-[422px]">
          <p className="my-5 text-white font-bold text-xl">
            What topic would you like to see next week?
          </p>

          {topics ? (
            <>
              <AnswerType
                type="select"
                name="weekly-topic"
                onChange={setWeeklyAnswer}
                options={topics?.map((topic) => topic.name)}
                multiple={false}
                initialLabel=""
                endLabel=""
              />

              <div className="my-2">
                {mutation.error instanceof Error && (
                  <ServerError message={mutation.error.message} />
                )}
              </div>

              <Button className="mt-8" onClick={onFinish}>
                Continue
              </Button>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-screen">
              <p className="text-white text-center my-5">
                No data for this week
              </p>
              <Button className="mt-8" onClick={() => navigate("/dashboard")}>
                Go Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default WeeklyTopic;
