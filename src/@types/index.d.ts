declare namespace Express {
  interface Request {
    user: import("../models/User.model").IUser;
    token: string;
  }
}
