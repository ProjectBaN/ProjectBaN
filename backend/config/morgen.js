const morgan = require("morgan");
const { logger } = require("./logger");

morgan.token("status", function (req, res) {
  let color;
  if (res.statusCode < 300) color = "\x1B[32m"; //green
  else if (res.statusCode < 400) color = "\x1B[36m"; //cyan
  else if (res.statusCode < 500) color = "\x1B[33m"; //yellow
  else if (res.statusCode < 600) color = "\x1B[31m"; //red
  else color = "\033[0m"; /*글자색 초기화*/

  return color + res.statusCode + "\033[35m" /*보라색*/;
});

morgan.token("makeLine", function () {
  let line =
    "-----------------------------------------------*(੭*ˊᵕˋ)੭* 응답 결과 ╰(*'v'*)╯-----------------------------------------------";
  let blank = "                                   ";
  return line + "\n" + blank;
});

morgan.token("request", function (req, res) {
  return "Request_" + JSON.stringify(req.body);
});

const morganMiddleware = morgan(
  ":makeLine 요청_:method | url_':url' | :request | Status_:status | 응답시간_:response-time ms (:res[content-length]줄)",
  { stream: logger.stream }
);

module.exports = { morganMiddleware };
