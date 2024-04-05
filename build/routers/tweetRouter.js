"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _tweetController = require("../controllers/tweetController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var tweetRouter = _express["default"].Router();
tweetRouter.post("/create", _tweetController.createTweet);
var _default = exports["default"] = tweetRouter;