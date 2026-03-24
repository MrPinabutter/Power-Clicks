import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  loader: { ".mp3": "dataurl" },
  outExtension({ format }) {
    return { js: format === "esm" ? ".esm.js" : ".js" };
  },
});
