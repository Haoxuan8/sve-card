const fs = require("fs");
const child_process = require("child_process");

if (fs.existsSync("./es")) {
    fs.rmSync("./es", {recursive: true});
}
fs.mkdirSync("./es");
fs.mkdirSync("./es/asset");

fs.cpSync("./src/asset", "./es/asset", {recursive: true});

child_process.exec("npx babel src --out-dir es --env-name es");
