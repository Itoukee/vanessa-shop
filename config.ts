interface IConfig {
  env: { local: "local"; prod: "prod" };
  frontUrl: { local: string; prod: string };
  backUrl: { local: string; prod: string };

  mongoUri: {
    local: string;
    prod: string;
  };

  /**
   * incoming https request limits to avoid overflooding the server and protect its performances
   */
  rateLimit: {
    local: {
      windowMs: number;
      max: number;
    };
    prod: {
      windowMs: number;
      max: number;
    };
  };

  /**
   * Config for the app
   */
  app: {
    /**
     * max file size limit accepted when uploading to the server
     */
    fileSizeLimit?: number;
  };

  jwtAuthentication: {
    secretKey: string;
    expiresIn: number | string;
  };
}

const config: IConfig = {
  env: { local: "local", prod: "prod" },
  frontUrl: { local: "http://localhost:4200/", prod: "TODO MAN" },
  backUrl: { local: "http://localhost:3000/", prod: "TODO BUDDY" },
  mongoUri: {
    local: process.env.MONGO_URI || "",
    prod: process.env.MONGO_URI || "",
  },
  // jwtoken authentication configuration
  jwtAuthentication: {
    secretKey: process.env.JWT_SECRET_KEY || "TODO MAN",
    expiresIn: process.env.JWT_EXPIRES_IN || 86400,
  },

  rateLimit: {
    local: {
      windowMs: 1 * 60 * 1000,
      max: 1000, // limit each IP to 1000 requests per windowMs
    },
    prod: {
      windowMs: 1 * 60 * 1000,
      max: 240, // limit each IP to 240 requests per windowMs
    },
  },
  app: {
    fileSizeLimit: Number(process.env.FILE_SIZE_LIMIT) || 7 * 1024 * 1024, //7MB max file(s) size
  },
};

export default config;
