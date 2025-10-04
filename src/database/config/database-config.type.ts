export type DatabaseConfig = {
  type?: string;
  host?: string;
  name?: string;
  pass?: string;
  port?: number;
  ssl?: boolean;
  sync?: boolean;
  user?: string;
};
