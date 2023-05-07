declare namespace NodeJS {
  export interface ProcessEnv {
    readonly MONGO_URL: string;
    readonly SESSION_ID: string;
  }
}
