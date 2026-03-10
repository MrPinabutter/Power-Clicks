import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  loader: { ".mp3": "copy" },
  esbuildOptions(options) {
    options.assetNames = "sounds/[name]";
  },
  outExtension({ format }) {
    return { js: format === "esm" ? ".esm.js" : ".js" };
  },
});
