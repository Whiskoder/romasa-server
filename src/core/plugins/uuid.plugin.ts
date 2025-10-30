import { customAlphabet, nanoid } from 'nanoid';
import { v7 as uuidv7 } from 'uuid';

export const uuidPlugin = {
  v7: () => uuidv7(),
  short: () => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const nanoid = customAlphabet(alphabet, 6);
    return nanoid();
  },
};
