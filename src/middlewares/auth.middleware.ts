import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../user/user.model";

const local = passport.use(new LocalStrategy(User.authenticate()));

//@ts-ignore
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
