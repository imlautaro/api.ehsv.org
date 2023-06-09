import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  runtimeConfig: {
    bunny: {
      accessKey: process.env.BUNNY_ACCESS_KEY,
      zone: process.env.BUNNY_ZONE,
      hostname: process.env.BUNNY_HOSTNAME,
    },
  },
});
