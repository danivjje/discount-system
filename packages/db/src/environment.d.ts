declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly ADMIN_USERNAME: string;
    readonly ADMIN_PASSWORD: string;
  }
}
