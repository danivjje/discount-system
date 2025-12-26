declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly SMS_API_TOKEN: string;
    readonly SMS_API_URL: string;
    readonly JWT_SECRET_KEY: string;
    readonly JWT_REFRESH_SECRET_KEY: string;
    readonly ADMIN_USERNAME: string;
    readonly ADMIN_PASSWORD: string;
    readonly ALLOWED_ORIGINS: string;
    readonly PORT: string;
  }
}
