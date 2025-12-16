declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    ALLOWED_ORIGINS: string;
  }
}
