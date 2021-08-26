const express = require("express");
const app = express();
const port = 9998;
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
const { saveFile, runCmd } = require("./service/util.js");

let router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.all("/api/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

router.post("/runfile", jsonParser, async (req, res, next) => {
  console.log(req.body);
  console.log("===========");
  const result = saveFile("../OnlineView.vue", req.body.fileContent);
  const buildResult = await runCmd("npm run build");
  res.json({
    code: 0,
    msg: "运行成功",
  });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`);
});
