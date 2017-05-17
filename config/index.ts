import dbConfig from "./db-config";
import appConfig from "./app-config";
import { DbConfig, AppConfig } from "./models";

export interface RootConfig {
    db: DbConfig;
    app: AppConfig;
}


const config: RootConfig = {
    db: dbConfig,
    app: appConfig
};

export default config;
