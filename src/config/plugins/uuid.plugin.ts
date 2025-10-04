import { customAlphabet, nanoid } from 'nanoid';
import { v7 as uuidv7 } from 'uuid';

export const uuidPlugin = {
  v7: () => uuidv7(),
  short: () => {
    const alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const nanoid = customAlphabet(alphabet, 15);
    return nanoid();
  },
};
