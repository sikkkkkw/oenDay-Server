"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.post("/register", _userController.memberRegister);
userRouter.post("/login", _userController.memberLogin);
userRouter.get("/login-success", _userController.loginSuccess);
userRouter.post("/logout", _userController.logout);
userRouter.get("/socials/kakao", _userController.kakaoLogin);
var _default = exports["default"] = userRouter;