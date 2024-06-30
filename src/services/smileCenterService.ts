import { SmileCenter } from "../interfaces/SmileCenter";

const API_URL = process.env.REACT_APP_API_URL || null;
const APP_ID_BA4 = process.env.REACT_APP_ID_B4A || null;
const API_KEY_BA4 = process.env.REACT_APP_API_KEY_B4A || null;

export const fetchSmileCenters = async (): Promise<SmileCenter[]> => {
  if (!API_URL || !APP_ID_BA4 || !API_KEY_BA4) {
    throw new Error("Environment variables are not properly set");
  }

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "X-Parse-Application-Id": APP_ID_BA4,
      "X-Parse-REST-API-Key": API_KEY_BA4,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.results || [];
};
