import * as path from "path";
import { fileURLToPath } from "url";
import build from "@finance-widgets/tools/build.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

build(__dirname, [
  "@finance-widgets/core",
  "@finance-widgets/core-ui",
  "@finance-widgets/provider",
]);
