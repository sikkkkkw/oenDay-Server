"use strict";

require("dotenv/config");
require("./db");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _appleRouter = _interopRequireDefault(require("./routers/appleRouter"));
var _noticeRouter = _interopRequireDefault(require("./routers/noticeRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var corsOptions = {
  origin: ["http://localhost:5172", "http://localhost:5173", "http://localhost:3000", "https://lustrous-rugelach-c251a7.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true
};
var PORT = process.env.PORT;
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])(corsOptions));
app.use((0, _expressSession["default"])({
  name: "Session ID",
  secret: "secret",
  resave: false,
  // 세션이 변경되지 않아도 항상 저장하도록 설정
  saveUninitialized: false,
  // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    // javascript에서 사용이 안되게 하는 옵션
    secure: false // https를 통해서만 세션 쿠키를 전송하도록 설정
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL + "/oneday"
  })
}));

// 라우터
app.get("/", function (req, res) {
  return res.send({
    name: "kenJo"
  });
});
app.use("/notice", _noticeRouter["default"]);
app.use("/apple", _appleRouter["default"]);
app.use("/users", _userRouter["default"]);
// app.use("/tweets", upload.single("file"),tweetRouter);

app.listen(PORT, function () {
  return console.log("http://localhost:".concat(PORT));
});