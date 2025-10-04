import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'seed')
    .default('development'),
  SERVER_PORT: Joi.number().default(3000),
  SERVER_ORIGIN: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_SSL: Joi.boolean().required(),
  DB_SYNC: Joi.boolean().required(),
  DB_USER: Joi.string().required(),
  CRYPTO_SECRET: Joi.string().required(),
  CRYPTO_HASH_SALT: Joi.string().required()
});
