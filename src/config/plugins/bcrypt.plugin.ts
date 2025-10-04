import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptPlugin = {
  hash: (password: string): string => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },
  compare: (password: string, hash: string): boolean => {
    return compareSync(password, hash);
  },
};
