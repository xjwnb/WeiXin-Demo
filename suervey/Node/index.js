const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// 处理post 请求
app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// 测试数据
var data = {
  sno: "07180742",
  name: "肖佳炜",
  gender: 1,
  skills: [
    { name: "HTML", value: "html", checked: true },
    { name: "CSS", value: "css", checked: true },
    { name: "JavaScript", value: "js", checked: false },
    { name: "PhotoShop", value: "ps", checked: false },
    { name: "Java", value: "java", checked: false },
    { name: "PHP", value: "php", checked: false },
  ],
  opinion: "测试",
};

// 处理get 请求
app.get("/", (req, res) => {
  res.json(data);
});

// 监听3000端口
app.listen(3000, () => {
  console.log("server running at http://127.0.0.1:3000");
});
