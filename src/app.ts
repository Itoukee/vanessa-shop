import config from "../config";

import createError from "http-errors";
import express, { Request, Response } from "express";
//@ts-ignore error from types, dont't care sad
import bodyParser from "body-parser";

import logger from "morgan";
import fileUpload from "express-fileupload";
//@ts-ignore error from types, dont't care sad
import passport from "passport";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

const app = express();

//runDatabase();

// helmet
app.use(helmet()); // recommended to be done early
// rate limiting

// app.use('/routeName', limit); // Setting limiter on specific route

// data sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

if (process.env.NODE_ENV === "prod") {
  const limiter = rateLimit(config.rateLimit.prod);
  app.use(limiter); //  apply to all requests
  app.use(logger("dev"));

  app.all("*", (req, res, next) => {
    if (req.secure) {
      return next();
    } else if (req.hostname == "backend") {
      return next();
    }
    return res.redirect(
      307,
      `https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
  });
} else {
  const limiter = rateLimit(config.rateLimit.local); //config.rateLimit.local);
  app.use(limiter); //  apply to all requests
  app.use(logger("dev"));
}

/*
 * Parse application/x-www-form-urlencoded && application/json
 */

const rawBodySaver = (
  req: Request & { rawBody: string },
  res: Response,
  buf: Buffer,
  encoding: BufferEncoding
) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding);
  }
};
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.json({ verify: rawBodySaver }));
// app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    limits: { fileSize: config.app.fileSizeLimit },
    abortOnLimit: true,
  })
);
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next) => {
  next(createError(404));
});

//TODO
// error handler
app.use((err: any, req: Request, res: Response, next: Function) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

app.use(
  express.json({
    verify: (
      req: Request & { rawBody: string },
      res: Response,
      buf: Buffer
    ) => {
      req.rawBody = buf.toString(); // body as buffer. Required to verify data's intregrety for whatsapp,slack... Look for sha256:  https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    },
  })
);

export default app;
