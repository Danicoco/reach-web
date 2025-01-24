import { AES, enc } from "crypto-js";
import { differenceInYears } from "date-fns";
import { suggestedTopics } from "./utils/static";

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const isPositive = (n: number) => 1 / (n * 0) === 1 / 0;

export const decryptData = <T>(message: string) => {
  const enMessage = AES.decrypt(
    message,
    String(import.meta.env.VITE_PUBLIC_ENCRYPTIONKEY)
  );
  return enMessage.toString(enc.Utf8) as T;
};

export const encryptData = (message: string) => {
  const bytes = AES.encrypt(
    message,
    String(import.meta.env.VITE_PUBLIC_ENCRYPTIONKEY)
  );
  return bytes.toString();
};

export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getAge = (date: Date) => {
  return differenceInYears(new Date(), date);
};

export const getRandomItem = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const getGif = (arr: string[]) => {
  return getRandomItem(arr);
};

export const getSuggestions = ({
  hobby,
  interest,
  all,
  archetype,
  challenges,
}: {
  hobby: string;
  interest: string;
  all: string;
  challenges: string;
  archetype: string;
}) => {
  const count = 4;
  let hobbies = "";
  let currChallenges = "";
  let priority = "";

  hobbies = hobby?.includes(",") ? shuffleArray(hobby.split(","))[0] : hobby;
  priority = interest?.includes(",")
    ? shuffleArray(interest.split(","))[0]
    : interest;

  currChallenges = challenges?.includes(",")
    ? shuffleArray(challenges.split(","))[0]
    : challenges;

  const randomSelections = shuffleArray([
    hobbies,
    priority,
    currChallenges,
  ]).slice(0, 2);

  const pickedArr = [all, archetype, ...randomSelections];

  const data = [];
  const values = Object.values(suggestedTopics);

  for (let x = 0; x < count; x++) {
    const topic: Record<string, string[]> | undefined = values.find((item) =>
      item.hasOwnProperty(pickedArr[x]?.toLowerCase()?.trim())
    );
    if (topic) {
      data.push(shuffleArray(topic[pickedArr[x]?.toLowerCase()?.trim()])[0]);
    }
  }

  return data;
};

export const formatResponse = (text: string) => {
  const boldText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  const textWithLinks = boldText.replace(
    /\((https?:\/\/[^\s)]+)\)/g,
    '<a class="link" href="$1" target="_blank">$1</a>'
  );
  return textWithLinks;
};

export const swapItems = (array: any[], i: number, j: number) => {
  const temp = array[i];
  if (temp?.currencyCode !== "USD") {
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const getMonthYear = () => {
  const month = [
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    { name: "March", value: 2 },
    { name: "April", value: 3 },
    { name: "May", value: 4 },
    { name: "June", value: 5 },
    { name: "July", value: 6 },
    { name: "August", value: 7 },
    { name: "September", value: 8 },
    { name: "October", value: 9 },
    { name: "November", value: 10 },
    { name: "December", value: 11 },
  ];
  let startYear = 1960;
  const endYear = new Date().getFullYear();
  const year: number[] = [];
  while (startYear <= endYear) {
    year.push(startYear);
    startYear++;
  }
  return { month, year };
};
