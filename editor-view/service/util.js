const fs = require("fs");
const path = require("path");
const nodeCmd = require("node-cmd");

const saveFile = (fileName, content, url = "./") => {
  try {
    fs.writeFileSync(path.join(__dirname, `${url}/${fileName}`), content);
  } catch (e) {
    console.log(e);
  }
};

const runCmd = async (cmd) => {
  return nodeCmd.runSync(cmd);
};

module.exports = {
  saveFile,
  runCmd,
};
