import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";

import config from "../../config";
import User, { IUser } from "../user/user.model";
import { NextFunction, Request, Response } from "express";

const local = passport.use(new LocalStrategy(User.authenticate()));

//@ts-ignore
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const getToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, config.jwtAuthentication.secretKey, {
    expiresIn: Number(config.jwtAuthentication.expiresIn),
  });
};

let opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtAuthentication.secretKey;

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user?.superAdmin) {
    const err = new Error("Forbidden");

    next(err);
  } else next();
};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!opts.jwtFromRequest(req)) return next(new Error("Unauthorized"));
  req.token = opts.jwtFromRequest(req);
  next();
};

const isUser = passport.authenticate("jwt", { session: false });
