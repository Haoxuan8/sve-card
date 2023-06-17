const fs = require("fs");
const child_process = require("child_process");

fs.rmSync("./es", {recursive: true});

if (!fs.existsSync("./es")) fs.mkdirSync("./es");
if (!fs.existsSync("./es/asset")) fs.mkdirSync("./es/asset");

fs.cpSync("./src/asset", "./es/asset", {recursive: true});

child_process.exec("npx babel src --out-dir es --env-name es");