/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tabs } from "antd";
import { useQuery } from "react-query";

import Layout from "../../components/Layout";
import L from "../../assets/profile-pics.png";
import { getProfileData } from "../../server/user";
import { getFavourites } from "../../server/assets";
import { getTransactions } from "../../server/wallet";
import VideoList from "../../components/shared/VideoList";
import AudioList from "../../components/shared/AudioList";
import Loading from "../../components/Loading";
import { transactionColumn } from "../../components/shared/columns";

const Profile = () => {
  const { data, isLoading } = useQuery<IProfile>(
    "user-profile",
    getProfileData
  );
  const { data: videoData, isLoading: videoLoading } = useQuery<IMedia[]>(
    "favourite-video",
    () => getFavourites(1, 10, "video")
  );
  const { data: audioData, isLoading: audioLoading } = useQuery<IMedia[]>(
    "favourite-audio",
    () => getFavourites(1, 10, "aduio")
  );
  const { data: transactionData, isLoading: transLoading } = useQuery<any[]>(
    "user-transactions",
    () => getTransactions(1, 10)
  );

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex gap-4">
            <img src={data?.profile?.profilePicture || L} className="rounded-full h-[180px] w-[180px]" />
            <div className="mt-8">
              <p className="text-2xl font-bold">{data?.profile?.name}</p>
              <div className="flex gap-3">
                <div className="flex gap-1">
                  <p className="mt-1">@{data?.profile?.userName}</p>
                  <span className="text-lg">.</span>
                </div>

                <div className="flex gap-1">
                  <p className="mt-1">
                    {data?.totalSubscribers || 0} Subscribers
                  </p>
                  <span className="text-lg">.</span>
                </div>

                <div className="flex gap-1">
                  <p className="mt-1">
                    {data?.totalSubscribed || 0} Subscribed
                  </p>
                  <span className="text-lg">.</span>
                </div>
                <p className="mt-1">{data?.totalUploads || 0} Uploads</p>
              </div>

              <p>{data?.profile?.bio}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <div className="bg-[#6601FF] px-5 py-2 text-white rounded-xl">
              <p>Reach Balance</p>
              <p>
                $
                {data?.profile?.wallet?.length
                  ? data?.profile?.wallet[0].walletBalance
                  : 0}
              </p>
            </div>

            <div className="bg-[#14C242] px-5 py-2 text-white rounded-xl">
              <p>Wallet Balance</p>
              <p>
                $
                {data?.profile?.wallet?.length
                  ? data?.profile?.wallet[1].walletBalance
                  : 0}
              </p>
            </div>
          </div>

          <Tabs
            defaultActiveKey="1"
            className="mt-5"
            items={[
              {
                label: "Videos",
                key: "1",
                children: (
                  <VideoList
                    videos={videoData || []}
                    isLoading={videoLoading}
                  />
                ),
              },
              {
                label: "Audios",
                key: "2",
                children: (
                  <AudioList
                    audios={audioData || []}
                    isLoading={audioLoading}
                  />
                ),
              },
              {
                label: "Transactions",
                key: "3",
                children: (
                  <Table
                    loading={transLoading}
                    className="mt-5"
                    columns={transactionColumn}
                    dataSource={transactionData || []}
                  />
                ),
              },
            ]}
          />
        </div>
      )}
    </Layout>
  );
};

export default Profile;
