export interface DatabaseEnvVar {
  host: string;
  name: string;
  pass: string;
  port: number;
  ssl: boolean;
  sync: boolean;
  user: string;
}

export interface ServerEnvVar {
  port: number;
  mode: 'development' | 'production' | 'test' | 'seed';
  origin: string;
}

export interface EnvVar {
  database: DatabaseEnvVar;
  server: ServerEnvVar;
}

export default () => ({
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    pass: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    ssl: process.env.DB_SSL === 'true',
    sync: process.env.DB_SYNC === 'true',
    user: process.env.DB_USER,
  },
  server: {
    port: parseInt(process.env.SERVER_PORT || '3000', 10),
    mode: process.env.NODE_ENV,
    origin: process.env.SERVER_ORIGIN,
  },
});
