import { AppConfig, ConfigEnvs, ENV } from "./models";


const config: ConfigEnvs<AppConfig> = {
    development: {},
    production: {},
    test: {},
    staging: {}
};

const env = process.env.NODE_ENV || ENV.development;

export default config[env];

