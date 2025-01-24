import { format, getHours, isDate } from "date-fns";
import { decryptData, encryptData } from "../helper";

export const calculatePercentage = (value: number, total: number) => {
  return ((Number(value) / Number(total)) * 100).toFixed();
};

export const getCurrentTimeOfDay = () => {
  const currentDate = new Date();

  const currentHour = getHours(currentDate);

  const morningStart = 5; // 5 AM
  const afternoonStart = 12; // 12 PM (noon)
  const eveningStart = 18; // 6 PM

  let timeOfDay;

  if (currentHour >= morningStart && currentHour < afternoonStart) {
    timeOfDay = "Good Morning";
  } else if (currentHour >= afternoonStart && currentHour < eveningStart) {
    timeOfDay = "Good Afternoon";
  } else {
    timeOfDay = "Good Evening";
  }

  return timeOfDay;
};

export const getCustomerDetails = (): Partial<IUser> => {
  let result;
  try {
    const user = localStorage.getItem("nulop");
    const data = decryptData(String(user));

    result = parseJson(data as string) as IUser;
  } catch (error) {
    result = {} as Partial<IUser>;
  }
  if (result.meta && result.meta?.dob) {
    try {
      // do not change the order
      result.meta.originalDob = result.meta?.dob || null;
      result.meta.dob = isDate(new Date(result.meta?.dob))
        ? format(new Date(result.meta.dob), "MMM yyyy")
        : null;
    } catch (error) {
      result.meta.dob = null;
    }
  }
  return result;
};

export const saveCustomerDetails = (data: Partial<IUser>) => {
  let result;
  try {
    result = encryptData(stringifyJson(data));
    localStorage.setItem("nulop", result);
  } catch (error) {
    result = "";
  }

  return result;
};

export const saveData = <T>(key: string, data: T) => {
  let result;
  try {
    result = encryptData(stringifyJson(data));
    localStorage.setItem(key, result);
  } catch (error) {
    result = "";
  }

  return result;
};

export const getData = <T>(key: string): T | null => {
  let result;
  try {
    const data = localStorage.getItem(key);
    const ls = decryptData(String(data));
    result = parseJson(ls as string) as T;
  } catch (error) {
    result = null;
  }

  return result;
};

export const stringifyJson = <T>(data: T) => {
  let result;
  try {
    result = JSON.stringify(data);
  } catch (error) {
    result = "";
  }

  return result;
};

export const parseJson = <T>(data: string): T => {
  let result;
  try {
    result = JSON.parse(data);
  } catch (error) {
    result = {};
  }

  return result;
};

export const appLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export function pickRandomItem(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const pickChartType = (indexNumber: number) => {
  if (indexNumber < 4) {
    return "bar";
  }

  return "pie";
};

export const isObjectDuplicate = (
  uniqueObjects: any,
  obj: Record<string, string>,
  key: string
) => {
  for (const item of uniqueObjects) {
    if (item[key] === obj[key]) {
      return true;
    }
  }
  return false;
};

export const stripOffUrl = (url: string): Array<Record<string, string>> => {
  if (!url) return [];
  const urlSplit = url?.split("?");
  if (!urlSplit) return [];
  const urlParams = urlSplit[1].split("&");
  const composeKeys = urlParams.map((param) => {
    const splitKeys = param.split("=");
    return {
      [splitKeys[0]]: splitKeys[1],
    };
  });
  return composeKeys;
};

export const composeChartObj = (
  obj: Record<string, string>
): Record<string, string> => {
  let newObj;

  if (obj) {
    const entries = Object.entries(obj);

    // Determine the number of properties to keep
    const numPropertiesToKeep = Math.max(0, entries.length - 2);

    // Create a new object with the desired properties
    newObj = Object.fromEntries(entries.slice(0, numPropertiesToKeep));
  }

  // @ts-ignore
  return newObj;
};

export const composeQuestionData = (
  obj: Record<string, string>
): Record<string, any> => {
  const mergedObj = Object.keys(obj).reduce(
    (result: Record<string, string>, key) => {
      if (key.endsWith("-other")) {
        const baseKey = key.replace("-other", "");
        if (result[baseKey]) {
          result[baseKey] += `, ${obj[key]}`;
        }
      } else {
        result[key] = obj[key];
      }
      return result;
    },
    {}
  );

  return mergedObj;
};

export const composeSliderObj = (arr: Array<Record<string | number, any>>) =>
  arr.reduce((acc, obj) => {
    // Get the first property name in the object (assuming there's only one property per object)
    const key = Object.keys(obj)[0];
    // Assign the nested object to the corresponding key in the accumulator
    acc[key] = obj[key];
    return acc;
  }, {});

export const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const generateSession = () => {
  return new Date().getTime();
};
