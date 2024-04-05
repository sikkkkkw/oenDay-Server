"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTweet = void 0;
var createTweet = exports.createTweet = function createTweet(req, res) {
  var file = req.file,
    formData = req.body.formData;
  console.log(formData);
  console.log(file);
};