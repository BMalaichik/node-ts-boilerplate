
export type ENV_TYPE = "development" | "production" | "test" | "staging";

type T1 = { a: string; };
type T2 = { b: string; };
type T_COMBINED = T1 & T2;

export const t: T_COMBINED = { a: "a", b: "b" };

type env = { [env: string]: ENV_TYPE };

export const ENV = Object.freeze<env>({
    development: "development",
    staging: "staging",
    test: "test",
    production: "production"
});


export interface ConfigEnvs<T> {
    development: T;
    test: T;
    production: T;
    staging: T;
}

export interface DbConfig {
    username?: string;
    password?: string;
}

export interface AppConfig {

}
