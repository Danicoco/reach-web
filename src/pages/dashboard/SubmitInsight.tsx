import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import useAppStore from "../../utils/appStore";
import { addTags, answerQuiz, getTopicQuiz } from "../../server/quiz";
import { calculatePercentage, getCustomerDetails } from "../../utils/shared";

import Logo from "../../components/Logo";
import Button from "../../library/Button";
import Progress from "../../library/Progress";
import Loading from "../../components/Loading";
import ServerError from "../../components/ServerError";
import AnswerType from "../../components/shared/AnswerType";
import OnboardingLayout from "../../components/OnboardingLayout";

const SubmitInsight = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [boardingState, setBoarding] = useState(0);
  const [completed, _setCompleted] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(true);

  const customer = getCustomerDetails();

  const { data, isLoading } = useQuery(["topic-quiz", id], () =>
    getTopicQuiz(id as string)
  );

  const mutation = useMutation(answerQuiz, {
    onSuccess: () => {
      useAppStore.setState({ onboarding: undefined, weeklyQuiz: [] });
      navigate("/vote-topic");
      //setCompleted(true);
    },
  });

  const mutationTag = useMutation(addTags, {
    onSuccess: () => {
      useAppStore.setState({ onboarding: undefined, weeklyQuiz: [] });
      navigate("/vote-topic");
    },
  });

  const setWeeklyQuiz = useAppStore((state) => state.setWeeklyQuiz);
  const weeklyQuiz = useAppStore((state) => state.weeklyQuiz, shallow);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  const onFinish = () => {
    const values = {
      quizId: data?.quiz.id,
      meta: weeklyQuiz,
      topicId: String(id),
      userId: String(customer.id),
      // tags is temporarily added. This will probably be updated after launch
      tags: [
        '{"label":"Click here if you want detailed pulse for your archetype","value":"archetype"}',
      ],
    };

    mutation.mutateAsync(values);
  };

  const handleAnswer = () => {
    const currentQuestion = weeklyQuiz[boardingState];
    const findQuestion = data?.quiz?.meta[boardingState];

    if (findQuestion?.required && !currentQuestion?.answer) {
      setError("Please fill in your answer");
      return;
    }

    const lastItem = data?.quiz.meta.length - 1;
    if (boardingState !== lastItem) {
      const nextState = boardingState + 1;
      setBoarding(nextState);
      const curentPercent = calculatePercentage(
        nextState,
        data?.quiz.meta.length
      );
      setError("");
      setProgress(Number(curentPercent));
      scrollToTop();
      return;
    }

    onFinish();
    return;
  };

  const handlePrevious = () => {
    if (boardingState > 0) {
      const nextState = boardingState - 1;
      setBoarding(nextState);
      const curentPercent = calculatePercentage(
        nextState,
        data?.quiz.meta.length
      );
      setError("");
      setProgress(Number(curentPercent));
      return;
    }
  };

  const onFinishTags = (skip = false) => {
    // if (data?.quiz?.tags?.length) {
    //   mutationTag.mutateAsync({
    //     tags: selectedTags,
    //     topicId: String(id),
    //     userId: String(customer.id),
    //   });
    //   return;
    // }

    useAppStore.setState({ onboarding: undefined, weeklyQuiz: [] });
    navigate(skip ? "/dashboard" : "/vote-topic");
  };

  useEffect(() => {
    if (
      !customer.meta ||
      customer.meta === null ||
      !Object.values(customer.meta).length
    ) {
      setIsProfileCompleted(false);
    }
  }, [customer]);

  return (
    <OnboardingLayout
      hide
      className="sm:grid sm:place-items-center"
      message={completed || data?.quizResult ? "" : "You're almost done…"}
    >
      <div className="sm:w-[517px]">
        {isLoading && <Loading />}
        {!isProfileCompleted ? (
          <div className="grid place-items-center h-screen">
            <div>
              <p className="mt-5 text-center navy-color">
                We noticed your profile is not completed, kindly complete your
                profile so we can serve you better.
              </p>

              <Button className="mt-3" onClick={() => navigate("/onboarding")}>
                Complete your profile
              </Button>
            </div>
          </div>
        ) : completed || data?.quizResult ? (
          <div className="grid place-items-center h-screen">
            <div className="grid gap-3">
              <div className="flex justify-center">
                <Logo width={100} type="colored" />
              </div>
              <p className="mt-5 text-center text-lg leading-8 navy-color">
                Thanks for joining the {name} pulse this week! You can view the
                live results at any time from your dashboard by clicking 'View
                Pulse'
              </p>

              <div className="flex gap-5">
                <Button
                  className="mt-5 w-[50%]"
                  color="orange"
                  onClick={() => onFinishTags(false)}
                  loading={mutationTag.isLoading}
                >
                  Vote for next week
                </Button>

                <Button
                  className="mt-5 w-[50%]"
                  color="primary"
                  onClick={() => onFinishTags(true)}
                  loading={mutationTag.isLoading}
                >
                  Skip
                </Button>
              </div>

              {/* {data?.quiz?.tags?.length ? (
                <div>
                  <p className="mt-10 text-[#828282]">
                    For this week, for which tags would you like to see the
                    results?
                  </p>
                  <div className="flex flex-wrap gap-2 my-5">
                    {data?.quiz?.tags?.map((tag: string) => {
                      const tags = JSON.parse(tag);
                      return (
                        <div className="">
                          <p
                            className={`py-[7px] px-[12px] border-[1px] border-[#828282] rounded-3xl ${
                              selectedTags.includes(JSON.stringify(tags))
                                ? "navy-bg text-white"
                                : "text-black"
                            }`}
                            onClick={() => {
                              setSelectedTags((prev) => {
                                const exist = prev.find((p) => {
                                  const parsedTags = JSON.parse(p);
                                  return parsedTags.value === tags.value;
                                });
                                return exist
                                  ? prev.filter(
                                      (pr) =>
                                        String(pr) !== JSON.stringify(tags)
                                    )
                                  : [...prev, JSON.stringify(tags)];
                              });
                            }}
                          >
                            {tags.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )} */}

              {mutation.error instanceof Error && (
                <ServerError message={mutation.error.message} />
              )}
            </div>
          </div>
        ) : (
          <div className="sm:w-[444px]">
            <div className="flex gap-1 mt-5">
              <div className="flex-1">
                <Progress
                  percent={progress}
                  strokeColor="#DA8E6B"
                  trailColor="#1D2D50"
                />
              </div>
              <p className="text-[#DA8E6B]">{`${progress}%`}</p>
            </div>

            {data?.quiz?.meta?.length ? (
              <div className="mt-5">
                <p className="font-[700] navy-color text-[20px] leading-[24px]">
                  {data?.quiz.meta[boardingState].question}
                </p>
                <p className="text-sm italic mt-[3px]">
                  {data?.quiz.meta[boardingState].subQuestion}
                </p>
                <div className="mt-5">
                  <AnswerType
                    onChange={setWeeklyQuiz}
                    name={data?.quiz.meta[boardingState].question}
                    type={data?.quiz.meta[boardingState].answerType}
                    options={data?.quiz.meta[boardingState].options}
                    multiple={data?.quiz.meta[boardingState].multiselect}
                    initialLabel={data?.quiz.meta[boardingState].initialLabel}
                    endLabel={data?.quiz.meta[boardingState].endLabel}
                    required={data?.quiz.meta[boardingState].required}
                  />
                </div>

                {mutation.error instanceof Error && (
                  <div className="mt-3">
                    <ServerError message={mutation.error.message} />
                  </div>
                )}

                {error && (
                  <div className="mt-2">
                    <ServerError message={error} />
                  </div>
                )}

                <div className="flex gap-4">
                  {boardingState > 0 && (
                    <Button className="mt-10" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}

                  <Button
                    className="my-10"
                    onClick={handleAnswer}
                    loading={mutation.isLoading}
                    color="orange"
                  >
                    {data?.quiz.meta.length - 1 === boardingState
                      ? "Finish"
                      : "Continue"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center h-screen">
                <p className="navy-color">
                  No Questions available for this week
                </p>
                <Button onClick={() => navigate("/dashboard")}>Go Back</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default SubmitInsight;
