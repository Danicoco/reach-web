import { useEffect, useState } from "react";
import Divider from "../../Divider";

const UserInterest = () => {
  const categories = [
    "Lifestyle",
    "Fashion",
    "Food",
    "Finance",
    "Art & Culture",
    "Gaming",
    "Travel",
    "Entertaiment",
  ];
  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Ping Pong",
    "Soccer",
    "Darts",
    "Racing",
    "Swimming",
  ];
  const music = [
    "Afro Pop",
    "K Pop",
    "Jazz",
    "Afro Beat",
    "R & B",
    "Rock",
    "Hip Hop Music",
  ];
  const gaming = [
    "Let's Play",
    "Game Reviews",
    "Ésport",
    "Gaming Challenges",
    "Football",
    "Fifa",
    "Game Play",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const [selectedGaming, setSelectedGaming] = useState<string[]>([]);

  useEffect(() => {
    const data = {
      selectedCategory,
      selectedSports,
      selectedMusic,
      selectedGaming
    }
    console.log(data);
  }, [selectedCategory, selectedSports, selectedMusic, selectedGaming])

  return (
    <div>
      <h5 className="font-extrabold text-[18px]">Categories</h5>
      <div className="flex gap-3 overflow-x-scroll w-full mt-5">
        {categories.map((category) => (
          <div
            onClick={() =>
              setSelectedCategory((prev: string[]) => {
                const hasCategory = prev.includes(category);
                if (hasCategory) {
                  const l = prev.filter((p: string) => p !== category);
                  return l;
                } else {
                  return [...prev, category]
                }
              })
            }
            key={category}
            className="rounded-md border-[1px] h-[50px] text-[16px] border-[#6601FF] bg-[#6601FF] text-white p-2 w-full"
          >
            {category}
          </div>
        ))}
      </div>

      <Divider />

      <h5 className="font-extrabold text-[18px]">Sports</h5>
      <div className="flex flex-wrap gap-3 mt-5">
        {sports.map((sport) => (
          <div
            onClick={() =>
              setSelectedSports((prev: string[]) => {
                const hasCategory = prev.includes(sport);
                if (hasCategory) {
                  return prev.filter((p: string) => p !== sport);
                } else {
                  return [...prev, sport]
                }
              })
            }
            key={sport}
            className={`text-[16px] ${
              selectedSports?.includes(sport)
                ? "border-[#6601FF] bg-[#6601FF] text-white"
                : "border-[#F3EBFF] bg-[#F3EBFF] text-black"
            } p-2 rounded-full`}
          >
            {sport}
          </div>
        ))}
      </div>

      <Divider />

      <h5 className="font-extrabold text-[18px]">Music</h5>
      <div className="flex flex-wrap gap-3 mt-5">
        {music.map((mus) => (
          <div
          onClick={() =>
            setSelectedMusic((prev: string[]) => {
              const hasCategory = prev.includes(mus);
              if (hasCategory) {
                return prev.filter((p: string) => p !== mus);
              } else {
                return [...prev, mus]
              }
            })
          }
            key={mus}
            className={`text-[16px] ${
              selectedMusic?.includes(mus)
                ? "border-[#6601FF] bg-[#6601FF] text-white"
                : "border-[#F3EBFF] bg-[#F3EBFF] text-black"
            } p-2 rounded-full`}
          >
            {mus}
          </div>
        ))}
      </div>
      <Divider />

      <h5 className="font-extrabold text-[18px]">Gaming</h5>
      <div className="flex flex-wrap gap-3 mt-5">
        {gaming.map((game) => (
          <div
          onClick={() =>
            setSelectedGaming((prev: string[]) => {
              const hasCategory = prev.includes(game);
              if (hasCategory) {
                return prev.filter((p: string) => p !== game);
              } else {
                return [...prev, game]
              }
            })
          }
            key={game}
            className={`text-[16px] ${
              selectedGaming?.includes(game)
                ? "border-[#6601FF] bg-[#6601FF] text-white"
                : "border-[#F3EBFF] bg-[#F3EBFF] text-black"
            } p-2 rounded-full`}
          >
            {game}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInterest;
