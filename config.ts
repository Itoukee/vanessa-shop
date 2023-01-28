interface IConfig {
  env: { local: "local"; prod: "prod" };
  frontUrl: { local: string; prod: string };
  backUrl: { local: string; prod: string };

  mongoUri: {
    local: string;
    prod: string;
  };
}

const config: IConfig = {
  env: { local: "local", prod: "prod" },
  frontUrl: { local: "http://localhost:4200/", prod: "" },
  backUrl: { local: "http://localhost:3000", prod: "" },
  mongoUri: {
    local: "",
    prod: "",
  },
};

export default config;
