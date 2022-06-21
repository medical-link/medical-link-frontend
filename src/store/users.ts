import { atom } from 'jotai';
import { User } from '~/service';

export const userDataAtom = atom<User>({
  name: '',
  age: 0,
  sex: '남',
  userId: '',
  kakaoId: '',
});
