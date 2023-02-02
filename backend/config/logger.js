const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const process = require("process");

const { combine, timestamp, label, printf } = winston.format;

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `\n ${level}: ${timestamp} ${message} `;
});
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), // 색깔 넣어서 출력
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      logFormat
    ),
  })
);

logger.stream = {
  // morgan wiston 설정
  write: (message) => {
    logger.info(message);
  },
};

module.exports = { logger };
