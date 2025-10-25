import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptPlugin = {
  hash: (password: string, rounds?: number): string => {
    const salt = genSaltSync((rounds = 10));
    return hashSync(password, salt);
  },
  compare: (password: string, hash: string): boolean => {
    return compareSync(password, hash);
  },
};
