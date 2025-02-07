import { useMutation, useQuery } from "react-query";
import { getCategories } from "../../server/categories";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { searchAssets } from "../../server/assets";
import { Tabs } from "antd";
import VideoList from "../../components/shared/VideoList";
import AudioList from "../../components/shared/AudioList";
import { useQueryParams } from "../../components/shared/QuerySearch";

const Explore = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [defaultMediaType, setDefaultMediaType] = useState("video");
  const [defaultSearchText, setDefaultSearchText] = useState("");

  const query = useQueryParams();

  const { data, isLoading } = useQuery("user-category", () =>
    getCategories(1, 10)
  );

  const mutation = useMutation(searchAssets, {
    onSuccess: (data: IMedia[]) => {
      const hasVideo = data?.find((media) => media.type === "video");
      const hasAudio = data?.find((media) => media.type === "audio");
      if (hasVideo && !hasAudio) {
        setDefaultMediaType("video");
        return;
      }
      if (!hasVideo && hasAudio) {
        setDefaultMediaType("audio");
        return;
      }
      if (!hasAudio && !hasVideo) {
        setDefaultMediaType("video");
        return;
      }
    },
  });

  useEffect(() => {
    const search = query[0]?.search;
    if (search) {
      setDefaultSearchText(search);
      mutation.mutateAsync({ title: search, limit: 20, mediaCategoriesIds: currentCategory !== 0 ? [currentCategory] : [] })
    }
  }, []);

  return (
    <Layout>
      <Navbar mutation={mutation} defaultSearchText={defaultSearchText} />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data?.length && (
            <div>
              <div className="flex gap-2">
                {[{ name: "All", id: 0 }, ...data].map(
                  (category: { name: string; id: number }) => (
                    <div
                      className={`px-2 py-[5px] ${
                        category.id === currentCategory
                          ? "bg-[#6601FF] text-white"
                          : "bg-[#E0E0E0] text-black"
                      } rounded-md w-[60px] cursor-pointer`}
                      key={category.name}
                      onClick={() => setCurrentCategory(category.id)}
                    >
                      <p className="capitalize text-center">{category.name}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {mutation.isLoading ? (
            <Loading />
          ) : (
            <Tabs
              defaultActiveKey={defaultMediaType}
              className="mt-5"
              items={[
                {
                  label: "Videos",
                  key: "video",
                  children: (
                    <VideoList
                      videos={
                        mutation?.data?.filter(
                          (media) => media.type === "video"
                        ) || []
                      }
                      isLoading={mutation.isLoading}
                    />
                  ),
                },
                {
                  label: "Audios",
                  key: "audio",
                  children: (
                    <AudioList
                      audios={
                        mutation?.data?.filter(
                          (media) => media.type === "audio"
                        ) || []
                      }
                      isLoading={mutation.isLoading}
                    />
                  ),
                },
              ]}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Explore;
