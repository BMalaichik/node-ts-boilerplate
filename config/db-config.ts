import { ConfigEnvs, DbConfig } from "./models";


const dbConfig: ConfigEnvs<DbConfig> = {
    development: {},
    production: {},
    staging: {},
    test: {}
};
const env = process.env.NODE_ENV || "development";

export default dbConfig[env];
