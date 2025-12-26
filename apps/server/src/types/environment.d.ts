declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SMS_API_TOKEN: string;
    SMS_API_URL: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    ALLOWED_ORIGINS: string;
    PORT: string;
  }
}
