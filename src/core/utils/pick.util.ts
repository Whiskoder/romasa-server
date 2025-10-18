import { isObject } from 'class-validator';

function pick(obj: any, keys: string[]): Record<string, any> {
  if (!isObject(obj)) return {};
  return keys.reduce(
    (acc, key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key];

      return acc;
    },
    {} as Record<string, any>,
  );
}

export default pick;
