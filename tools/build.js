import * as path from "path";
import { context } from "esbuild";
import { lessLoader } from "esbuild-plugin-less";

const build = async (dirname, external = []) => {
  const ctx = await context({
    entryPoints: [path.resolve(dirname, "src", "index.ts")],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: "browser",
    format: "esm",
    external,
    outdir: path.resolve(dirname, "dist"),
    tsconfig: path.resolve(dirname, "tsconfig.json"),
    plugins: [lessLoader()],
    loader: {
      ".ts": "ts",
      ".css": "text",
    },
  });

  if (process.argv.indexOf("--watch") >= 0) {
    console.log("watching...");
    await ctx.watch();
  } else {
    console.log("building...");
    await ctx.rebuild();
    process.exit();
  }
};

export default build;
