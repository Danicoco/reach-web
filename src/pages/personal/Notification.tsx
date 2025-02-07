import Layout from "../../components/Layout";
import { useQuery } from "react-query";
import { getNotifications } from "../../server/notification";
import Loading from "../../components/Loading";

const Notification = () => {
  const { data, isLoading } = useQuery("user-notification", getNotifications);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : data?.length ? (
        <div></div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>No Notification</p>
        </div>
      )}
    </Layout>
  );
};

export default Notification;
