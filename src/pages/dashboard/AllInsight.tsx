/* eslint-disable @typescript-eslint/ban-ts-comment */
import OnboardingLayout from "../../components/OnboardingLayout";
import InsightCard from "../../components/shared/InsightCard";
import Input from "../../library/Input";
import { insights } from "../../utils/static";

const AllInsight = () => {
  return (
    <OnboardingLayout message="All Insight">
      <Input placeholder="Search Insight" className="my-5" />

      {insights.map((insight) => (
        <div className="mt-3">
          <InsightCard
            // @ts-ignore
            data={insight}
          />
        </div>
      ))}
    </OnboardingLayout>
  );
};

export default AllInsight;
