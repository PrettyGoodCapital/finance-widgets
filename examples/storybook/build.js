import * as path from "path";
import { fileURLToPath } from "url";
import { context } from "esbuild";

const dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const ctx = await context({
    entryPoints: [path.resolve(dirname, "src", "index.js")],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: "browser",
    format: "esm",
    outdir: path.resolve(dirname, "dist"),
    loader: {
      ".svg": "file",
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
})();
