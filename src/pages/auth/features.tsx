import { featureData } from "../../utils/static";
import FeatureCard from "../../components/shared/FeatureCard";

const Features = () => {
  return (
    <div className="max-w-[500px] mx-auto relative">
      <div className="hidden sm:block">
        <div className="grid place-items-center rounded-lg shadow-md">
          <FeatureCard data={featureData} />
        </div>
      </div>

      <div className="block sm:hidden">
        <FeatureCard data={featureData} />
      </div>
    </div>
  );
};

export default Features;
