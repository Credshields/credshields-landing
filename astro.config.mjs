import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://credshields.github.io",
  base: process.env.BASE_PATH ?? "/credshields-landing",
});
