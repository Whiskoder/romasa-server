import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const bcryptPlugin = {
  hash: (password: string, rounds?: number): string => {
    const salt = genSaltSync((rounds = 10));
    return hashSync(password, salt);
  },
  compare: (password: string, hash: string): boolean => {
    return compareSync(password, hash);
  },
};

export default bcryptPlugin;
