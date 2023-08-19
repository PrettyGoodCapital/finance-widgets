import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { compileFromFile } from "json-schema-to-typescript";
import build from "@finance-widgets/tools/build.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* types */
const types = fs.readdirSync("./src/schemas").map((fn) => fn.replace(".json", ""));
let output = "";
types.forEach((src) => {
  compileFromFile(`src/schemas/${src}.json`).then((ts) => fs.writeFileSync(`src/types/${src}.ts`, ts));
  output += `export * from "./${src}";\n`;
});
fs.writeFileSync("src/types/index.ts", output);

build(__dirname);
