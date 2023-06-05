import { ofetch } from "ofetch";

export const useBunny = () => {
  const {
    bunny: { accessKey, zone, hostname },
  } = useRuntimeConfig();

  const bunny = ofetch.create({
    baseURL: `https://${hostname}/${zone}/podcast`,
    headers: {
      Accept: "application/json",
      AccessKey: accessKey,
    },
  });

  return bunny;
};
