const morgan = require("morgan");
const { logger } = require("./logger");

morgan.token("status", function (req, res) {
  let color;
  let emoge = "🤪 ";
  if (res.statusCode < 300) {
    color = "\x1B[32m";
    emoge = "👍 ";
  } //green
  else if (res.statusCode < 400) {
    color = "\x1B[36m";
    emoge = "💥 ";
  } //cyan
  else if (res.statusCode < 500) {
    color = "\x1B[33m";
    emoge = "✋ ";
  } //yellow
  else if (res.statusCode < 600) {
    color = "\x1B[31m";
    emoge = "🚫 ";
  } //red
  else {
    color = "\033[0m";
    emoge = "🤪 ";
  } /*글자색 초기화*/

  return emoge + color + res.statusCode + "\033[35m" /*보라색*/;
});

morgan.token("makeLine", function () {
  let line =
    "-----------------------------------------------🙂 응답 결과야!! ╰(*'v'*)╯-----------------------------------------------";
  return line + "\n";
});

morgan.token("request", function (req, res) {
  return "Request_" + JSON.stringify(req.body);
});

const morganMiddleware = morgan(
  ":makeLine 🔍 요청 -> [:method] | 🔗 url  -> ':url' \n 🧺 보낸값 -> :request   \n 💚 Status ->[:status] | ⏰ 응답시간 -> [:response-time ms] (:res[content-length]줄)",
  { stream: logger.stream }
);

module.exports = { morganMiddleware };
