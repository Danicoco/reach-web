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

export const saveData = (key: string, data: string) => {
  let result;
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    result = "";
  }

  return result;
};

export const getData = (key: string) => {
  let result;
  try {
    result = localStorage.getItem(key);
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

export const truncateText = (text: string, length: number) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const generateSession = () => {
  return new Date().getTime();
};
