import { AES, enc } from "crypto-js";
import { differenceInYears } from "date-fns";

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
