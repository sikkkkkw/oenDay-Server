"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var appleRouter = _express["default"].Router();
appleRouter.get("/character", function (req, res) {
  return res.send({
    name: "character"
  });
});
appleRouter.get("/comics", function (req, res) {
  return res.send({
    name: "comics"
  });
});
appleRouter.get("/creators", function (req, res) {
  return res.send({
    name: "creators"
  });
});
var _default = exports["default"] = appleRouter;