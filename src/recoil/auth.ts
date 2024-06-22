import { RecoilState, atom } from 'recoil';

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false,
});

export const userState = atom<User | null>({
    key: 'userState',
    default: null,
});
