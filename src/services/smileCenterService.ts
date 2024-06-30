import { SmileCenter } from "../interfaces/SmileCenter";

const API_URL = "https://parseapi.back4app.com/classes/SmileCenters";
const APP_ID = "iQEMmYgOkkC2AvNteq0RPxxy5F1UBDXkWMG8cn2p";
const API_KEY = "ivpcDJPQf0OOle3eQdssULJDnsKKZLWpFMZfCk0a";

export const fetchSmileCenters = async (): Promise<SmileCenter[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "X-Parse-Application-Id": APP_ID,
      "X-Parse-REST-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.results || [];
};
